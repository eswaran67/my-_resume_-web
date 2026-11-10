import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

// Default Owner Security PIN (Can also be set in .env.local via ADMIN_PIN)
const OWNER_PIN = process.env.ADMIN_PIN || "2026";

interface DocumentItem {
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
  await fs.mkdir(DOCUMENTS_DIR, { recursive: true });
  await fs.writeFile(REGISTRY_FILE, JSON.stringify(items, null, 2), "utf-8");
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

    if (pin !== OWNER_PIN) {
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

    await fs.mkdir(DOCUMENTS_DIR, { recursive: true });

    // Sanitize filename and make unique
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const uniqueFileName = `${Date.now()}-${originalName}`;
    const destinationPath = path.join(DOCUMENTS_DIR, uniqueFileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(destinationPath, buffer);

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      category,
      issuer,
      fileUrl: `/documents/${uniqueFileName}`,
      fileName: uniqueFileName,
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

// DELETE: Strictly protected - only the owner with correct PIN can delete
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const pin = req.headers.get("x-admin-pin") || searchParams.get("pin") || "";

    if (pin !== OWNER_PIN) {
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
