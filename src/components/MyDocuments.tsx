"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FolderLock,
  FileText,
  Download,
  Eye,
  Lock,
  Unlock,
  Upload,
  Trash2,
  CheckCircle2,
  Search,
  Filter,
  X,
  FileCheck,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Plus,
  Pencil,
  RefreshCw,
} from "lucide-react";

export interface VaultDocument {
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

const CATEGORIES = [
  "All",
  "Education",
  "Certifications",
  "Experience",
  "Other",
];

export default function MyDocuments() {
  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Owner Access State
  const [isOwner, setIsOwner] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [storedPin, setStoredPin] = useState("");

  // Upload Modal State (New Document)
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Education");
  const [uploadIssuer, setUploadIssuer] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Edit Modal State (Edit Document & Replace File)
  const [editingDoc, setEditingDoc] = useState<VaultDocument | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Education");
  const [editIssuer, setEditIssuer] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  // Preview Modal State
  const [previewDoc, setPreviewDoc] = useState<VaultDocument | null>(null);

  // Delete Confirmation State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const VALID_KEYS = ["2026", "1234", "eswaran", "admin", "eswar"];

  // Keyboard shortcut listener for Owner (Ctrl + Shift + O or Ctrl + Shift + E)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "O" || e.key === "o" || e.key === "E" || e.key === "e")
      ) {
        e.preventDefault();
        setShowPinModal(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Check persistent storage and URL parameters on mount
  useEffect(() => {
    const savedPin =
      localStorage.getItem("eswaran_owner_pin") ||
      sessionStorage.getItem("eswaran_owner_pin");
    if (savedPin) {
      setIsOwner(true);
      setStoredPin(savedPin);
    }

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash.toLowerCase();
      if (
        urlParams.get("owner") === "true" ||
        urlParams.get("admin") === "true" ||
        hash === "#owner" ||
        hash === "#admin"
      ) {
        setShowPinModal(true);
      }
    }

    const handleOwnerChange = () => {
      const pin =
        localStorage.getItem("eswaran_owner_pin") ||
        sessionStorage.getItem("eswaran_owner_pin");
      setIsOwner(!!(pin && VALID_KEYS.includes(pin.toLowerCase())));
      if (pin) setStoredPin(pin);
    };

    window.addEventListener("owner-mode-changed", handleOwnerChange);
    loadDocuments();

    return () => window.removeEventListener("owner-mode-changed", handleOwnerChange);
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      let docs: VaultDocument[] = [];
      if (data.success && Array.isArray(data.documents)) {
        docs = data.documents;
      }

      // Merge client local storage overrides if any exist (helps preserve edits across deployments/browser sessions)
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("eswaran_vault_documents_override");
        if (cached) {
          try {
            const localDocs = JSON.parse(cached) as VaultDocument[];
            if (Array.isArray(localDocs) && localDocs.length > 0) {
              const docMap = new Map<string, VaultDocument>();
              docs.forEach((d) => docMap.set(d.id, d));
              localDocs.forEach((d) => docMap.set(d.id, d));
              docs = Array.from(docMap.values());
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }

      setDocuments(docs);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    } finally {
      setLoading(false);
    }
  };

  const syncLocalOverride = (updatedList: VaultDocument[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "eswaran_vault_documents_override",
          JSON.stringify(updatedList)
        );
      } catch (e) {}
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");

    const normalized = enteredPin.trim().toLowerCase();
    if (VALID_KEYS.includes(normalized)) {
      const canonical = normalized === "1234" ? "1234" : "2026";
      setIsOwner(true);
      setStoredPin(canonical);
      // Persist in localStorage so Eswaran stays logged in on his own device
      localStorage.setItem("eswaran_owner_pin", canonical);
      sessionStorage.setItem("eswaran_owner_pin", canonical);
      window.dispatchEvent(new Event("owner-mode-changed"));
      setShowPinModal(false);
      setEnteredPin("");
    } else {
      setPinError("Invalid Key! Please enter 2026 or eswaran.");
    }
  };

  const handleLogoutOwner = () => {
    setIsOwner(false);
    setStoredPin("");
    localStorage.removeItem("eswaran_owner_pin");
    sessionStorage.removeItem("eswaran_owner_pin");
    window.dispatchEvent(new Event("owner-mode-changed"));
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadError("Please select a document file to upload.");
      return;
    }
    if (!uploadTitle.trim()) {
      setUploadError("Please provide a title for the document.");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const activePin = storedPin || "2026";
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("title", uploadTitle.trim());
      formData.append("category", uploadCategory);
      formData.append("issuer", uploadIssuer.trim() || "Verified Authority");
      formData.append("description", uploadDescription.trim());
      formData.append("pin", activePin);

      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
        headers: {
          "x-admin-pin": activePin,
        },
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to upload document");
      }

      setUploadSuccess(true);
      setUploadFile(null);
      setUploadTitle("");
      setUploadIssuer("");
      setUploadDescription("");
      if (fileInputRef.current) fileInputRef.current.value = "";

      if (result.document) {
        const nextList = [result.document, ...documents];
        setDocuments(nextList);
        syncLocalOverride(nextList);
      } else {
        await loadDocuments();
      }

      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
      }, 1200);
    } catch (err: any) {
      setUploadError(err.message || "An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  // Open Edit Modal for a Document
  const handleOpenEditModal = (doc: VaultDocument) => {
    setEditingDoc(doc);
    setEditTitle(doc.title);
    setEditCategory(doc.category || "Education");
    setEditIssuer(doc.issuer || "");
    setEditDescription(doc.description || "");
    setEditFile(null);
    setEditError("");
    setEditSuccess(false);
  };

  // Handle Document Update with optional file replacement
  const handleUpdateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc) return;
    if (!editTitle.trim()) {
      setEditError("Please enter a title for the document.");
      return;
    }

    setIsUpdating(true);
    setEditError("");

    try {
      const activePin =
        storedPin ||
        localStorage.getItem("eswaran_owner_pin") ||
        sessionStorage.getItem("eswaran_owner_pin") ||
        "2026";

      const formData = new FormData();
      formData.append("id", editingDoc.id);
      formData.append("pin", activePin);
      formData.append("title", editTitle.trim());
      formData.append("category", editCategory);
      formData.append("issuer", editIssuer.trim() || "Verified Issuer");
      formData.append("description", editDescription.trim());

      if (editFile) {
        formData.append("file", editFile);
      }

      const res = await fetch("/api/documents", {
        method: "PUT",
        body: formData,
        headers: {
          "x-admin-pin": activePin,
        },
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to update document");
      }

      setEditSuccess(true);

      const updatedDocument: VaultDocument = result.document || {
        ...editingDoc,
        title: editTitle.trim(),
        category: editCategory,
        issuer: editIssuer.trim() || "Verified Issuer",
        description: editDescription.trim(),
      };

      const nextList = documents.map((d) =>
        d.id === editingDoc.id ? updatedDocument : d
      );
      setDocuments(nextList);
      syncLocalOverride(nextList);

      setTimeout(() => {
        setEditSuccess(false);
        setEditingDoc(null);
        setEditFile(null);
      }, 1000);
    } catch (err: any) {
      setEditError(err.message || "Failed to update document.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteDocument = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}" from the vault?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const activePin = storedPin || "2026";
      const res = await fetch(`/api/documents?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          "x-admin-pin": activePin,
        },
      });

      const result = await res.json();
      if (result.success) {
        const nextList = documents.filter((d) => d.id !== id);
        setDocuments(nextList);
        syncLocalOverride(nextList);
      } else {
        alert(result.error || "Failed to delete document.");
      }
    } catch (err) {
      alert("Error deleting document. Please verify connection.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory =
      activeCategory === "All" ||
      doc.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="documents" className="relative py-20 overflow-hidden border-t border-slate-900/80">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
              <FolderLock className="w-3.5 h-3.5" />
              <button
                onClick={() => setShowPinModal(true)}
                className="hover:underline focus:outline-none"
                title="Click to Unlock Owner Security Mode"
              >
                Official Credentials &amp; Certifications
              </button>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              My <span className="gradient-text">Documents Vault</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
              Verified repository of my academic diplomas, professional surveillance certifications, and engineering work credentials.
            </p>
          </div>

          {/* Owner Access Control: ONLY visible when authenticated as Owner on your device */}
          {isOwner && (
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-3 bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-1.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-fade-in">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-300 font-mono">
                  Owner Mode (ESWARAN K)
                </span>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Upload
                </button>
                <button
                  onClick={handleLogoutOwner}
                  title="Lock Owner Mode"
                  className="text-slate-400 hover:text-white transition-colors p-1"
                >
                  <Unlock className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents or certificates..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Document Cards Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-400 text-xs font-mono">Accessing secure documents vault...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="py-16 text-center glass-panel rounded-2xl border border-white/5 p-8 max-w-lg mx-auto">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">No Documents Found</h4>
            <p className="text-xs text-slate-400">
              {searchQuery
                ? `No results matching "${searchQuery}". Try a different keyword.`
                : "No documents have been uploaded to this category yet."}
            </p>
            {isOwner && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow"
              >
                <Plus className="w-4 h-4" />
                Upload First Document
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="glass-panel group relative rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(0,240,255,0.12)]"
              >
                <div>
                  {/* Top Bar: Category badge & Verified status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                        doc.category.toLowerCase().includes("education")
                          ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                          : doc.category.toLowerCase().includes("cert")
                          ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                          : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                      }`}
                    >
                      {doc.category}
                    </span>

                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-cyan-500/40 transition-colors">
                      <FileCheck className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {doc.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300/80 leading-relaxed mb-4 line-clamp-2">
                    {doc.description}
                  </p>
                </div>

                {/* Footer Metadata & Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="text-[11px] font-mono text-slate-400">
                    <span>{doc.fileSize}</span>
                    <span className="mx-1.5">•</span>
                    <span>{doc.uploadDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Visitor Preview Button */}
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      title="Preview Document"
                      className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Download Button */}
                    <a
                      href={doc.fileUrl}
                      download={doc.fileName}
                      title="Download Official Document"
                      className="p-2 rounded-lg bg-slate-900 hover:bg-purple-500/20 text-slate-300 hover:text-purple-300 border border-slate-800 hover:border-purple-500/30 transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </a>

                    {/* Edit button (Owner only) */}
                    {isOwner && (
                      <button
                        onClick={() => handleOpenEditModal(doc)}
                        title="Edit Document & Replace File (Owner Only)"
                        className="p-2 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 text-amber-400 border border-amber-800/50 hover:border-amber-500/60 transition-all shadow-[0_0_10px_rgba(245,158,11,0.15)]"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}

                    {/* Delete button (Owner only) */}
                    {isOwner && (
                      <button
                        onClick={() => handleDeleteDocument(doc.id, doc.title)}
                        disabled={deletingId === doc.id}
                        title="Delete Document (Owner Only)"
                        className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/50 hover:border-red-500/60 transition-all disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Verification Notice */}
        <div className="mt-8 text-center">
          <p className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              Official Academic &amp; Technical Credentials Repository of ESWARAN K
            </span>
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* OWNER PIN AUTHENTICATION MODAL */}
      {/* ============================================================ */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl relative">
            <button
              onClick={() => {
                setShowPinModal(false);
                setPinError("");
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-cyan-400" />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Owner Security Access</h3>
            <p className="text-xs text-slate-300 mb-6">
              Only <strong className="text-cyan-300">ESWARAN K</strong> can upload, edit, or delete documents. Enter your security PIN to unlock editor mode.
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Owner Security Key / PIN
                </label>
                <input
                  type="text"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  placeholder="Enter 2026 or eswaran"
                  maxLength={15}
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700 text-white font-mono text-center tracking-widest text-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
                <p className="text-[11px] text-slate-400 font-mono mt-1.5 text-center">
                  Secret Key: <span className="text-cyan-400 font-semibold">2026</span> or <span className="text-cyan-400 font-semibold">eswaran</span>
                </p>
              </div>

              {pinError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  Unlock Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* OWNER UPLOAD DOCUMENT MODAL (NEW) */}
      {/* ============================================================ */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-5 sm:p-8 border border-white/15 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowUploadModal(false);
                setUploadError("");
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Upload className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Upload New Document</h3>
                <p className="text-xs text-slate-400 font-mono">Owner Portal • ESWARAN K</p>
              </div>
            </div>

            {uploadSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Document Uploaded Successfully!</h4>
                <p className="text-xs text-slate-400 font-mono">
                  Your new credential is now permanently stored in the vault.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFileUpload} className="space-y-4">
                {/* File picker */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Select Document File (PDF, Image) *
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setUploadFile(file);
                      if (file && !uploadTitle) {
                        const cleanTitle = file.name
                          .replace(/\.[^/.]+$/, "")
                          .replace(/[-_]/g, " ");
                        setUploadTitle(cleanTitle);
                      }
                    }}
                    className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 file:cursor-pointer bg-slate-950/80 p-2 rounded-xl border border-slate-800"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Diploma State Board Marksheet / CCTV Certification"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-medium"
                  />
                </div>

                {/* Category & Issuer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Category
                    </label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    >
                      <option value="Education">Education</option>
                      <option value="Certifications">Certifications</option>
                      <option value="Experience">Experience</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Issuer / Authority
                    </label>
                    <input
                      type="text"
                      value={uploadIssuer}
                      onChange={(e) => setUploadIssuer(e.target.value)}
                      placeholder="e.g. Government Polytechnic"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Notes / Description (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    placeholder="Add brief details about this credential..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                {uploadError && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50"
                  >
                    {isUploading ? "Uploading Document..." : "Save to Vault"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* OWNER EDIT DOCUMENT MODAL (EDIT INFO & REPLACE FILE) */}
      {/* ============================================================ */}
      {editingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-5 sm:p-8 border border-white/15 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setEditingDoc(null);
                setEditFile(null);
                setEditError("");
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Pencil className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Edit Document &amp; File</h3>
                <p className="text-xs text-slate-400 font-mono">Owner Portal • Modify Credential</p>
              </div>
            </div>

            {editSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Document Updated Successfully!</h4>
                <p className="text-xs text-slate-400 font-mono">
                  Your edits and uploaded file changes are now updated in the vault.
                </p>
              </div>
            ) : (
              <form onSubmit={handleUpdateDocument} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Document Title"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>

                {/* Category & Issuer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Category
                    </label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                    >
                      <option value="Education">Education</option>
                      <option value="Certifications">Certifications</option>
                      <option value="Experience">Experience</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Issuer / Authority
                    </label>
                    <input
                      type="text"
                      value={editIssuer}
                      onChange={(e) => setEditIssuer(e.target.value)}
                      placeholder="e.g. Government Polytechnic"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Notes / Description
                  </label>
                  <textarea
                    rows={2}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Details about this credential..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                {/* File Replacement Section */}
                <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                      Replace Document File (Optional)
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {editingDoc.fileSize}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 overflow-hidden">
                    <span className="text-slate-500">Current file:</span>
                    <span className="text-cyan-300 truncate">{editingDoc.fileName}</span>
                  </div>

                  <div className="pt-1">
                    <input
                      ref={editFileInputRef}
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setEditFile(file);
                      }}
                      className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/20 file:cursor-pointer bg-slate-900/80 p-2 rounded-lg border border-slate-800"
                    />
                    {editFile && (
                      <div className="mt-2 flex items-center justify-between text-xs text-emerald-400 font-mono bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40">
                        <span className="truncate">New File: {editFile.name} ({(editFile.size / 1024).toFixed(1)} KB)</span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditFile(null);
                            if (editFileInputRef.current) editFileInputRef.current.value = "";
                          }}
                          className="text-slate-400 hover:text-white shrink-0 ml-2"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {editError && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{editError}</span>
                  </div>
                )}

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingDoc(null);
                      setEditFile(null);
                      setEditError("");
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] disabled:opacity-50"
                  >
                    {isUpdating ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DOCUMENT PREVIEW MODAL */}
      {/* ============================================================ */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="glass-panel w-full max-w-4xl max-h-[92vh] rounded-2xl border border-white/15 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800/90 flex items-center justify-between gap-4 bg-slate-950/80">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {previewDoc.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono truncate">
                    {previewDoc.issuer} • {previewDoc.fileSize}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={previewDoc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-mono transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>
                <a
                  href={previewDoc.fileUrl}
                  download={previewDoc.fileName}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Viewer Frame */}
            <div className="flex-1 bg-slate-900/60 p-2 sm:p-4 overflow-hidden flex items-center justify-center">
              {previewDoc.fileUrl.toLowerCase().endsWith(".pdf") ||
              previewDoc.fileUrl.includes("application/pdf") ||
              previewDoc.fileType === "application/pdf" ||
              previewDoc.fileUrl.startsWith("data:application/pdf") ? (
                <iframe
                  src={
                    previewDoc.fileUrl.startsWith("data:")
                      ? previewDoc.fileUrl
                      : `${previewDoc.fileUrl}#view=FitH`
                  }
                  className="w-full h-[52vh] sm:h-[65vh] rounded-xl border border-slate-800 bg-white/5"
                  title={previewDoc.title}
                />
              ) : (
                <div className="max-h-[52vh] sm:max-h-[65vh] overflow-auto flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={previewDoc.fileUrl}
                    alt={previewDoc.title}
                    className="max-h-[48vh] sm:max-h-[60vh] max-w-full rounded-xl object-contain border border-slate-800 shadow-xl"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="truncate">{previewDoc.description}</span>
              <span className="shrink-0 text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
