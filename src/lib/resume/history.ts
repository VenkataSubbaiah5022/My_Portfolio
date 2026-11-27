import type { ResumeModel } from "@/lib/resume/engine";

/**
 * Saved resumes live only in this browser (IndexedDB). A JSON backup moves
 * them between browsers; nothing is stored on a server.
 */
export type SavedResume = {
  id: string;
  role: string;
  company: string;
  jdText: string;
  model: ResumeModel;
  createdAt: string;
  updatedAt: string;
};

const DB_NAME = "resume-studio";
const STORE = "resumes";
const BACKUP_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await openDb();
  try {
    return await new Promise<T>((resolve, reject) => {
      const request = run(db.transaction(STORE, mode).objectStore(STORE));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

export async function listResumes(): Promise<SavedResume[]> {
  const all = await withStore<SavedResume[]>("readonly", (store) => store.getAll());
  return all.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function saveResume(
  entry: Omit<SavedResume, "id" | "createdAt" | "updatedAt"> & { id?: string; createdAt?: string },
): Promise<SavedResume> {
  const now = new Date().toISOString();
  const record: SavedResume = {
    ...entry,
    id: entry.id ?? crypto.randomUUID(),
    createdAt: entry.createdAt ?? now,
    updatedAt: now,
  };
  await withStore("readwrite", (store) => store.put(record));
  return record;
}

export function deleteResume(id: string): Promise<undefined> {
  return withStore("readwrite", (store) => store.delete(id));
}

export async function exportBackup(): Promise<Blob> {
  const resumes = await listResumes();
  return new Blob([JSON.stringify({ version: BACKUP_VERSION, resumes }, null, 2)], {
    type: "application/json",
  });
}

function isSavedResume(value: unknown): value is SavedResume {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.jdText === "string" &&
    typeof v.updatedAt === "string" &&
    typeof v.model === "object" &&
    v.model !== null
  );
}

/** Adds or replaces resumes from a backup file; returns how many were imported. */
export async function importBackup(file: File): Promise<number> {
  const parsed: unknown = JSON.parse(await file.text());
  const resumes =
    parsed && typeof parsed === "object" && Array.isArray((parsed as { resumes?: unknown }).resumes)
      ? (parsed as { resumes: unknown[] }).resumes.filter(isSavedResume)
      : [];
  for (const resume of resumes) await withStore("readwrite", (store) => store.put(resume));
  return resumes.length;
}
