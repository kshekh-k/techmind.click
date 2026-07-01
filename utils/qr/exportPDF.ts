import type QRCodeStyling from "qr-code-styling";
import type { LabelStyle } from "@/app/types/qr";
import { buildCompositeCanvasForPDF, getLabelHeight, renderQRToPNGBlob } from "./compositeLabel";

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
  labelStyle?: LabelStyle,
  bgColor?: string,
  logo?: string | null,
  logoSize?: number,
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const trimmedLabel = label?.trim() ?? "";
  const bg = bgColor || "#ffffff";

  if (trimmedLabel) {
    const style: LabelStyle = labelStyle ?? { color: "#000000", fontSize: 14, bold: false, italic: false };
    const canvas = await buildCompositeCanvasForPDF(qrInstance, trimmedLabel, style, bg, size, logo, logoSize);
    const base64 = canvas.toDataURL("image/png", 0.95);

    const labelHeight = getLabelHeight(style.fontSize);
    const totalPx = size + labelHeight;
    const widthMM = Math.min(160, size * 0.2646);
    const heightMM = widthMM * (totalPx / size);
    const x = (210 - widthMM) / 2;
    const y = (297 - heightMM) / 2;

    pdf.addImage(base64, "PNG", x, y, widthMM, heightMM);
  } else {
    // Use safe canvas path to avoid tainting issues when a logo is present
    const blob = await renderQRToPNGBlob(qrInstance, size, bg, logo, logoSize);
    const base64 = await blobToBase64(blob);

    const imgMM = Math.min(160, size * 0.2646);
    const x = (210 - imgMM) / 2;
    const y = (297 - imgMM) / 2;

    pdf.addImage(base64, "PNG", x, y, imgMM, imgMM);
  }

  pdf.save(`${fileName || "qr-code"}.pdf`);
}
