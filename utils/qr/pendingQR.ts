import type { QRSettings } from "@/app/types/qr";

const KEY = "qr-pending-save";

export function savePendingQR(settings: QRSettings): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {}
}

export function loadPendingQR(): QRSettings | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as QRSettings) : null;
  } catch {
    return null;
  }
}

export function clearPendingQR(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
