import type QRCodeStyling from "qr-code-styling";

export async function downloadQR(
  qrInstance: QRCodeStyling,
  format: "png" | "svg",
  fileName: string,
): Promise<void> {
  await qrInstance.download({ name: fileName || "qr-code", extension: format });
}
