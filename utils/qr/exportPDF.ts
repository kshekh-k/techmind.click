import type QRCodeStyling from "qr-code-styling";
import { buildCompositeCanvasForPDF, LABEL_HEIGHT } from "./compositeLabel";

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function exportQRToPDF(
  qrInstance: QRCodeStyling,
  fileName: string,
  size: number,
  label?: string,
  labelColor?: string,
  bgColor?: string,
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const trimmedLabel = label?.trim() ?? "";

  if (trimmedLabel) {
    const canvas = await buildCompositeCanvasForPDF(
      qrInstance,
      trimmedLabel,
      labelColor || "#000000",
      bgColor || "#ffffff",
      size,
    );
    const base64 = canvas.toDataURL("image/png", 0.95);

    // The composite canvas is size × (size + LABEL_HEIGHT) pixels.
    // Scale the width to fit A4 (max 160mm) and derive height from aspect ratio.
    const totalPx = size + LABEL_HEIGHT;
    const widthMM = Math.min(160, size * 0.2646);
    const heightMM = widthMM * (totalPx / size);
    const x = (210 - widthMM) / 2;
    const y = (297 - heightMM) / 2;

    pdf.addImage(base64, "PNG", x, y, widthMM, heightMM);
  } else {
    const raw = await qrInstance.getRawData("png");
    if (!raw || !(raw instanceof Blob)) throw new Error("Failed to render QR code");

    const base64 = await blobToBase64(raw);
    const imgMM = Math.min(160, size * 0.2646);
    const x = (210 - imgMM) / 2;
    const y = (297 - imgMM) / 2;

    pdf.addImage(base64, "PNG", x, y, imgMM, imgMM);
  }

  pdf.save(`${fileName || "qr-code"}.pdf`);
}
