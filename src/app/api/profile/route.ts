import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const FILE_PATH = path.join(process.cwd(), "src", "data", "personalInfo.json");

// Accept multiple convenient variants for Eswaran
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

async function getPersonalInfo() {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return {
      name: "ESWARAN K",
      title: "System Engineer",
      email: "eswaran.techdev@gmail.com",
      location: "Coimbatore, Tamil Nadu, India",
      phone: "+91 98765 43210",
      whatsapp: "https://wa.me/919876543210",
      github: "https://github.com/eswaran-dev",
      linkedin: "https://linkedin.com/in/eswaran-dev",
      twitter: "https://twitter.com/eswaran_dev",
    };
  }
}

export async function GET() {
  try {
    const info = await getPersonalInfo();
    return NextResponse.json({ success: true, personal: info });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load profile info" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pin = req.headers.get("x-admin-pin") || body.pin || "";

    if (!isValidPin(pin)) {
      return NextResponse.json(
        {
          success: false,
          error: "Access Denied: Invalid Owner PIN. Only Eswaran can edit contact details.",
        },
        { status: 401 }
      );
    }

    const current = await getPersonalInfo();
    const updated = {
      ...current,
      email: body.email !== undefined ? body.email.trim() : current.email,
      location: body.location !== undefined ? body.location.trim() : current.location,
      phone: body.phone !== undefined ? body.phone.trim() : current.phone,
      whatsapp: body.whatsapp !== undefined ? body.whatsapp.trim() : current.whatsapp,
      github: body.github !== undefined ? body.github.trim() : current.github,
      linkedin: body.linkedin !== undefined ? body.linkedin.trim() : current.linkedin,
      twitter: body.twitter !== undefined ? body.twitter.trim() : current.twitter,
    };

    await fs.writeFile(FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Contact information updated successfully.",
      personal: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update contact info" },
      { status: 500 }
    );
  }
}
