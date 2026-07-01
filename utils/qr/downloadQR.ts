import type QRCodeStyling from "qr-code-styling";
import type { LabelStyle } from "@/app/types/qr";
import { downloadPNGWithLabel, downloadSVGWithLabel, renderQRToPNGBlob } from "./compositeLabel";

type DownloadFormat = "png" | "svg";

export async function downloadQR(
  qrInstance: QRCodeStyling,
  format: DownloadFormat,
  fileName: string,
  label?: string,
  labelStyle?: LabelStyle,
  bgColor?: string,
  qrSize?: number,
  svgElement?: SVGSVGElement | null,
  logo?: string | null,
  logoSize?: number,
): Promise<void> {
  const name = fileName || "qr-code";
  const trimmedLabel = label?.trim() ?? "";
  const style: LabelStyle = labelStyle ?? { color: "#000000", fontSize: 14, bold: false, italic: false };
  const bg = bgColor || "#ffffff";
  const size = qrSize || 300;

  if (!trimmedLabel) {
    if (format === "svg") {
      // SVG download: the raw SVG file (with embedded <image>) is fine — no canvas involved
      await qrInstance.download({ name, extension: "svg" });
    } else {
      // PNG download: use our safe canvas path to avoid canvas tainting with logos
      const blob = await renderQRToPNGBlob(qrInstance, size, bg, logo, logoSize);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }
    return;
  }

  if (format === "svg" && svgElement) {
    downloadSVGWithLabel(svgElement, trimmedLabel, style, size, name);
  } else {
    await downloadPNGWithLabel(qrInstance, trimmedLabel, style, bg, size, name, logo, logoSize);
  }
}
