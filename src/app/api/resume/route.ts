import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const VALID_PINS = [
  (process.env.ADMIN_PIN || "2026").toLowerCase().trim(),
  "2026",
  "1234",
  "eswaran",
  "admin",
  "eswar",
];

function isValidPin(pin: string): boolean {
  if (!pin) return false;
  return VALID_PINS.includes(pin.toLowerCase().trim());
}

const RESUME_PATH = path.join(process.cwd(), "public", "documents", "eswaran-resume.pdf");
const PROFILE_JSON = path.join(process.cwd(), "src", "data", "personalInfo.json");
const REGISTRY_JSON = path.join(process.cwd(), "public", "documents", "documents.json");

export async function GET() {
  try {
    const stat = await fs.stat(RESUME_PATH);
    return NextResponse.json({
      success: true,
      exists: true,
      url: "/documents/eswaran-resume.pdf",
      size: stat.size,
      updatedAt: stat.mtime.toISOString(),
    });
  } catch {
    return NextResponse.json({
      success: true,
      exists: false,
      url: "/documents/eswaran-resume.pdf",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const pin = (formData.get("pin") as string) || req.headers.get("x-admin-pin") || "";

    if (!isValidPin(pin)) {
      return NextResponse.json(
        {
          success: false,
          error: "Access Denied: Invalid Owner PIN. Only Eswaran can upload and update the Resume PDF.",
        },
        { status: 401 }
      );
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json(
        { success: false, error: "Please select a valid PDF file to upload." },
        { status: 400 }
      );
    }

    // Ensure documents dir exists
    await fs.mkdir(path.join(process.cwd(), "public", "documents"), { recursive: true });

    // Save uploaded file as the official resume PDF
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(RESUME_PATH, buffer);

    // Update personalInfo.json
    try {
      const rawProfile = await fs.readFile(PROFILE_JSON, "utf-8");
      const profile = JSON.parse(rawProfile);
      profile.resumeUrl = "/documents/eswaran-resume.pdf";
      await fs.writeFile(PROFILE_JSON, JSON.stringify(profile, null, 2), "utf-8");
    } catch (ignore) {}

    // Update or add to documents.json registry
    try {
      const rawDocs = await fs.readFile(REGISTRY_JSON, "utf-8");
      const docs = JSON.parse(rawDocs);
      const existingIdx = docs.findIndex((d: any) => d.id === "doc-eswaran-resume");

      const resumeDoc = {
        id: "doc-eswaran-resume",
        title: "ESWARAN K — Official System Engineer Resume (CV)",
        category: "Resume",
        issuer: "ESWARAN K | System Engineer",
        fileUrl: "/documents/eswaran-resume.pdf",
        fileName: "eswaran-resume.pdf",
        fileSize: `${(file.size / 1024).toFixed(1)} KB`,
        fileType: "application/pdf",
        uploadDate: new Date().toISOString().split("T")[0],
        verified: true,
        description: "Official Curriculum Vitae detailing System Engineering, Hardware Diagnostics, All-Brand CCTV Surveillance, and T568B Networking experience.",
      };

      if (existingIdx >= 0) {
        docs[existingIdx] = resumeDoc;
      } else {
        docs.unshift(resumeDoc);
      }
      await fs.writeFile(REGISTRY_JSON, JSON.stringify(docs, null, 2), "utf-8");
    } catch (ignore) {}

    return NextResponse.json({
      success: true,
      message: "Official Resume PDF uploaded and registered successfully.",
      url: "/documents/eswaran-resume.pdf",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process resume upload." },
      { status: 500 }
    );
  }
}
