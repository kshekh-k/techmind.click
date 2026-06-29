import type { QRSettings } from "@/app/types/qr";

export function buildQRData(settings: QRSettings): string {
  switch (settings.inputType) {
    case "url":
      return settings.url || "https://www.techmind.click";
    case "text":
      return settings.text || " ";
    case "phone":
      return settings.phone ? `tel:${settings.phone}` : "tel:";
    case "wifi": {
      const { ssid, encryption, hidden } = settings.wifi;
      return `WIFI:T:${encryption};S:${ssid};H:${hidden ? "true" : "false"};;`;
    }
    default:
      return settings.url || "https://www.techmind.click";
  }
}
