import type QRCodeStyling from "qr-code-styling";
import type { LabelStyle } from "@/app/types/qr";
import { downloadPNGWithLabel, downloadSVGWithLabel } from "./compositeLabel";

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
): Promise<void> {
  const name = fileName || "qr-code";
  const trimmedLabel = label?.trim() ?? "";

  if (!trimmedLabel) {
    await qrInstance.download({ name, extension: format });
    return;
  }

  const style: LabelStyle = labelStyle ?? { color: "#000000", fontSize: 14, bold: false, italic: false };
  const bg = bgColor || "#ffffff";
  const size = qrSize || 300;

  if (format === "svg" && svgElement) {
    downloadSVGWithLabel(svgElement, trimmedLabel, style, size, name);
  } else {
    await downloadPNGWithLabel(qrInstance, trimmedLabel, style, bg, size, name);
  }
}
