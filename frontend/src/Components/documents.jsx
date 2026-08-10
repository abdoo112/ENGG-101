// Documents.jsx
import React from "react";
import DocumentCard from "./DocumentCard";

/* =====================================================================
 * MOCK_DOCUMENTS
 * ⚠ PLACEHOLDER DATA — delete this once a real fetch exists.
 *
 * This is the shape the backend response should match:
 * { id, name, type, uploadedAt, status }
 *
 * status is one of: "ready" | "processing" | "error"
 * =================================================================== */
const MOCK_DOCUMENTS = [
  {
    id: "1",
    name: "ENGG101_Lecture04_Thermodynamics.pdf",
    type: "PDF",
    uploadedAt: "Aug 9, 2026",
    status: "ready",
  },
  {
    id: "2",
    name: "Statics_ProblemSet_03.docx",
    type: "DOCX",
    uploadedAt: "Aug 8, 2026",
    status: "processing",
  },
  {
    id: "3",
    name: "CircuitAnalysis_Notes.pdf",
    type: "PDF",
    uploadedAt: "Aug 6, 2026",
    status: "error",
  },
];

/* =====================================================================
 * Documents
 *
 * Props:
 *  - documents   (array)     Document objects. Defaults to mock data
 *                            for now — swap the default (or the value
 *                            passed in from Workspace.jsx) for real
 *                            data later, nothing else changes.
 *  - onUploadClick (func)    Called when the upload area is clicked.
 *                            No file logic here — parent decides.
 * =================================================================== */
export default function Documents({
  documents = MOCK_DOCUMENTS,
  onUploadClick = () => {},
}) {
  const hasDocuments = documents.length > 0;

  return (
    <div className="flex-1 flex flex-col min-h-0 py-6">

      {/* ---------- Upload target ----------
          This is a placeholder drop zone / button. No drag-and-drop
          or file-input logic lives here — onUploadClick is where
          you'll eventually open a file picker or wire up drag-drop. */}
      <button
        type="button"
        onClick={onUploadClick}
        className="w-full border border-dashed border-amber-300/30 rounded-lg py-8 mb-6 flex flex-col items-center justify-center gap-2 text-white/40 hover:border-amber-300/60 hover:text-amber-300 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6"
        >
          <path d="M12 3v12" />
          <path d="M7 8l5-5 5 5" />
          <path d="M5 21h14" />
        </svg>
        <span className="text-xs uppercase tracking-[0.15em]">
          Click to upload, or drag a file here
        </span>
      </button>

      {/* ---------- Document list / empty state ---------- */}
      {hasDocuments ? (
        <div className="flex-1 overflow-y-auto space-y-2">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/40 text-sm">
            <span className="text-amber-300/60 mr-2">&gt;</span>
            No documents uploaded yet.
          </p>
        </div>
      )}
    </div>
  );
}