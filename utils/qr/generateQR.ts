import type { QRSettings } from "@/app/types/qr";

export function buildQRData(settings: QRSettings): string {
  switch (settings.inputType) {
    case "url": {
      const url = settings.url.trim();
      if (!url) return "https://www.techmind.click";
      return /^https?:\/\//i.test(url) ? url : `https://${url}`;
    }
    case "text":
      return settings.text || " ";
    case "phone":
      return settings.phone ? `tel:${settings.phone}` : "tel:";
    case "email":
      return settings.email ? `mailto:${settings.email}` : "mailto:";
    case "wifi": {
      const { ssid, password, encryption, hidden } = settings.wifi;
      return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden ? "true" : "false"};;`;
    }
    default:
      return settings.url || "https://www.techmind.click";
  }
}
