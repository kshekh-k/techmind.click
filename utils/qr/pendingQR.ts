import { DEFAULT_QR_SETTINGS } from "@/app/types/qr";
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
    if (!raw) return null;
    return { ...DEFAULT_QR_SETTINGS, ...JSON.parse(raw) } as QRSettings;
  } catch {
    return null;
  }
}

export function clearPendingQR(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
