import type QRCodeStyling from "qr-code-styling";
import type { LabelStyle } from "@/app/types/qr";

export const LABEL_PADDING = 14;

export function getLabelHeight(fontSize: number): number {
  return LABEL_PADDING * 2 + fontSize;
}

function buildFont(style: LabelStyle): string {
  const weight = style.bold ? "700" : "400";
  const slant = style.italic ? "italic " : "";
  return `${slant}${weight} ${style.fontSize}px Inter, system-ui, sans-serif`;
}

async function buildCompositeCanvas(
  qrInstance: QRCodeStyling,
  label: string,
  style: LabelStyle,
  bgColor: string,
  qrSize: number,
): Promise<HTMLCanvasElement> {
  const raw = await qrInstance.getRawData("png");
  if (!raw || !(raw instanceof Blob)) throw new Error("Failed to render QR code as PNG");

  const imgUrl = URL.createObjectURL(raw);
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = imgUrl;
  });
  URL.revokeObjectURL(imgUrl);

  const labelHeight = getLabelHeight(style.fontSize);
  const canvas = document.createElement("canvas");
  canvas.width = qrSize;
  canvas.height = qrSize + labelHeight;

  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, qrSize, qrSize);

  ctx.fillStyle = style.color;
  ctx.font = buildFont(style);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, qrSize / 2, qrSize + LABEL_PADDING + style.fontSize / 2, qrSize - 24);

  return canvas;
}

function buildCompositeSVG(
  svgString: string,
  label: string,
  style: LabelStyle,
  qrSize: number,
): string {
  const escaped = label
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const labelHeight = getLabelHeight(style.fontSize);
  const textY = qrSize + LABEL_PADDING + style.fontSize / 2;
  const newHeight = qrSize + labelHeight;
  const fontStyle = style.italic ? "italic" : "normal";
  const fontWeight = style.bold ? "700" : "400";

  return svgString
    .replace(/(<svg[^>]*\s)height="[^"]*"/, `$1height="${newHeight}"`)
    .replace(
      /<\/svg>\s*$/,
      `<text x="${qrSize / 2}" y="${textY}" text-anchor="middle" dominant-baseline="middle" ` +
        `font-family="Inter, system-ui, sans-serif" font-size="${style.fontSize}" ` +
        `font-weight="${fontWeight}" font-style="${fontStyle}" fill="${style.color}">${escaped}</text></svg>`,
    );
}

export async function downloadPNGWithLabel(
  qrInstance: QRCodeStyling,
  label: string,
  style: LabelStyle,
  bgColor: string,
  qrSize: number,
  fileName: string,
): Promise<void> {
  const canvas = await buildCompositeCanvas(qrInstance, label, style, bgColor, qrSize);
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png"),
  );
  triggerDownload(URL.createObjectURL(blob), `${fileName || "qr-code"}.png`);
}

export function downloadSVGWithLabel(
  svgElement: SVGSVGElement,
  label: string,
  style: LabelStyle,
  qrSize: number,
  fileName: string,
): void {
  const raw = new XMLSerializer().serializeToString(svgElement);
  const composite = buildCompositeSVG(raw, label, style, qrSize);
  const blob = new Blob([composite], { type: "image/svg+xml" });
  triggerDownload(URL.createObjectURL(blob), `${fileName || "qr-code"}.svg`);
}

export async function buildCompositeCanvasForPDF(
  qrInstance: QRCodeStyling,
  label: string,
  style: LabelStyle,
  bgColor: string,
  qrSize: number,
): Promise<HTMLCanvasElement> {
  return buildCompositeCanvas(qrInstance, label, style, bgColor, qrSize);
}

function triggerDownload(url: string, name: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
