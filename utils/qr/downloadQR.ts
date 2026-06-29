import type QRCodeStyling from "qr-code-styling";
import { downloadPNGWithLabel, downloadSVGWithLabel } from "./compositeLabel";

type DownloadFormat = "png" | "svg";

export async function downloadQR(
  qrInstance: QRCodeStyling,
  format: DownloadFormat,
  fileName: string,
  label?: string,
  labelColor?: string,
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

  const color = labelColor || "#000000";
  const bg = bgColor || "#ffffff";
  const size = qrSize || 300;

  if (format === "svg" && svgElement) {
    downloadSVGWithLabel(svgElement, trimmedLabel, color, size, name);
  } else {
    await downloadPNGWithLabel(qrInstance, trimmedLabel, color, bg, size, name);
  }
}
