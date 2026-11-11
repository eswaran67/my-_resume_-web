import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

// Valid Owner Security Keys (Supports 2026, 1234, eswaran, admin, or custom env)
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

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  issuer: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  verified: boolean;
  description: string;
}

const DOCUMENTS_DIR = path.join(process.cwd(), "public", "documents");
const REGISTRY_FILE = path.join(DOCUMENTS_DIR, "documents.json");

async function getDocumentRegistry(): Promise<DocumentItem[]> {
  try {
    const data = await fs.readFile(REGISTRY_FILE, "utf-8");
    return JSON.parse(data) as DocumentItem[];
  } catch (error) {
    return [];
  }
}

async function saveDocumentRegistry(items: DocumentItem[]): Promise<void> {
  try {
    await fs.mkdir(DOCUMENTS_DIR, { recursive: true });
    await fs.writeFile(REGISTRY_FILE, JSON.stringify(items, null, 2), "utf-8");
  } catch (err: any) {
    console.warn("Could not save to disk (e.g. read-only serverless environment):", err.message);
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 KB";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// GET: Publicly viewable list of all uploaded documents
export async function GET() {
  try {
    const documents = await getDocumentRegistry();
    return NextResponse.json({ success: true, documents });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load documents" },
      { status: 500 }
    );
  }
}

// POST: Strictly protected - only the owner with correct PIN can upload
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const pin = (formData.get("pin") as string) || req.headers.get("x-admin-pin") || "";

    if (!isValidPin(pin)) {
      return NextResponse.json(
        {
          success: false,
          error: "Access Denied: Invalid Owner PIN. Only Eswaran can upload documents to this portal.",
        },
        { status: 401 }
      );
    }

    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string)?.trim();
    const category = (formData.get("category") as string)?.trim() || "Certifications";
    const issuer = (formData.get("issuer") as string)?.trim() || "Verified Issuer";
    const description = (formData.get("description") as string)?.trim() || "";

    if (!file || !title) {
      return NextResponse.json(
        { success: false, error: "Document title and a file are required." },
        { status: 400 }
      );
    }

    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const uniqueFileName = `${Date.now()}-${originalName}`;
    let fileUrl = `/documents/${uniqueFileName}`;

    try {
      await fs.mkdir(DOCUMENTS_DIR, { recursive: true });
      const destinationPath = path.join(DOCUMENTS_DIR, uniqueFileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(destinationPath, buffer);
    } catch (fsErr) {
      // Serverless fallback (e.g. Vercel read-only filesystem)
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Data = buffer.toString("base64");
      const mime = file.type || "application/pdf";
      fileUrl = `data:${mime};base64,${base64Data}`;
    }

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      category,
      issuer,
      fileUrl,
      fileName: file.name,
      fileSize: formatBytes(file.size),
      fileType: file.type || "application/octet-stream",
      uploadDate: new Date().toISOString().split("T")[0],
      verified: true,
      description: description || `Uploaded on ${new Date().toLocaleDateString()}`,
    };

    const currentDocs = await getDocumentRegistry();
    currentDocs.unshift(newDoc);
    await saveDocumentRegistry(currentDocs);

    return NextResponse.json({
      success: true,
      message: "Document uploaded successfully to the vault.",
      document: newDoc,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process document upload" },
      { status: 500 }
    );
  }
}

// PUT: Strictly protected - only the owner with correct PIN can edit documents or replace files
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const pin = (formData.get("pin") as string) || req.headers.get("x-admin-pin") || "";

    if (!isValidPin(pin)) {
      return NextResponse.json(
        {
          success: false,
          error: "Access Denied: Invalid Owner PIN. Only Eswaran can edit documents in this portal.",
        },
        { status: 401 }
      );
    }

    const id = (formData.get("id") as string)?.trim();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Document ID is required." },
        { status: 400 }
      );
    }

    const title = (formData.get("title") as string)?.trim();
    const category = (formData.get("category") as string)?.trim();
    const issuer = (formData.get("issuer") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const file = formData.get("file") as File | null;

    const currentDocs = await getDocumentRegistry();
    const docIndex = currentDocs.findIndex((d) => d.id === id);

    if (docIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Document not found in registry." },
        { status: 404 }
      );
    }

    const existingDoc = currentDocs[docIndex];
    const updatedDoc: DocumentItem = { ...existingDoc };

    if (title) updatedDoc.title = title;
    if (category) updatedDoc.category = category;
    if (issuer) updatedDoc.issuer = issuer;
    if (description !== undefined && description !== null) {
      updatedDoc.description = description;
    }

    // If a replacement file was provided
    if (file && typeof file === "object" && file.size > 0 && file.name) {
      const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const uniqueFileName = `${Date.now()}-${originalName}`;
      let fileUrl = `/documents/${uniqueFileName}`;

      try {
        await fs.mkdir(DOCUMENTS_DIR, { recursive: true });
        const destinationPath = path.join(DOCUMENTS_DIR, uniqueFileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(destinationPath, buffer);

        // Clean up previous uploaded file if safe
        if (
          existingDoc.fileName &&
          existingDoc.fileName !== uniqueFileName &&
          !existingDoc.fileName.includes("sample")
        ) {
          try {
            await fs.unlink(path.join(DOCUMENTS_DIR, existingDoc.fileName));
          } catch (ignore) {}
        }
      } catch (fsErr) {
        // Serverless fallback for Vercel read-only filesystem
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64Data = buffer.toString("base64");
        const mime = file.type || "application/pdf";
        fileUrl = `data:${mime};base64,${base64Data}`;
      }

      updatedDoc.fileUrl = fileUrl;
      updatedDoc.fileName = file.name;
      updatedDoc.fileSize = formatBytes(file.size);
      updatedDoc.fileType = file.type || "application/octet-stream";
      updatedDoc.uploadDate = new Date().toISOString().split("T")[0];
    }

    currentDocs[docIndex] = updatedDoc;
    await saveDocumentRegistry(currentDocs);

    return NextResponse.json({
      success: true,
      message: "Document updated successfully in vault.",
      document: updatedDoc,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update document" },
      { status: 500 }
    );
  }
}

// DELETE: Strictly protected - only the owner with correct PIN can delete
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const pin = req.headers.get("x-admin-pin") || searchParams.get("pin") || "";

    if (!isValidPin(pin)) {
      return NextResponse.json(
        { success: false, error: "Access Denied: Invalid Owner PIN." },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Document ID is required." },
        { status: 400 }
      );
    }

    const currentDocs = await getDocumentRegistry();
    const docToDelete = currentDocs.find((d) => d.id === id);

    if (!docToDelete) {
      return NextResponse.json(
        { success: false, error: "Document not found in registry." },
        { status: 404 }
      );
    }

    // Try deleting physical file (if not a sample seed file or if exists)
    try {
      const filePath = path.join(DOCUMENTS_DIR, docToDelete.fileName);
      await fs.unlink(filePath);
    } catch (ignoreErr) {
      // Ignore if already deleted or permission restricted
    }

    const updatedDocs = currentDocs.filter((d) => d.id !== id);
    await saveDocumentRegistry(updatedDocs);

    return NextResponse.json({
      success: true,
      message: "Document removed from vault.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete document" },
      { status: 500 }
    );
  }
}
