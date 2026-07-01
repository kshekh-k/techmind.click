import type QRCodeStyling from "qr-code-styling";
import type { LabelStyle } from "@/app/types/qr";

export const LABEL_PADDING = 14;

export function getLabelHeight(fontSize: number): number {
  return LABEL_PADDING * 2 + (fontSize || 14);
}

function buildFont(style: LabelStyle): string {
  const weight = style.bold ? "700" : "400";
  const slant = style.italic ? "italic " : "";
  return `${slant}${weight} ${style.fontSize}px Inter, system-ui, sans-serif`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Image load failed"));
    el.src = src;
  });
}

// Parses the <image> element from a qr-code-styling SVG to get the logo rect.
// Coordinates are scaled to match our target canvas size.
function extractLogoRect(
  svgText: string,
  canvasSize: number,
): { x: number; y: number; width: number; height: number } | null {
  const tagMatch = svgText.match(/<image\b([^>]*)(?:\/>|>[\s\S]*?<\/image>)/);
  if (!tagMatch) return null;
  const attrs = tagMatch[1];
  const attr = (name: string) => {
    const m = attrs.match(new RegExp(`\\b${name}="([^"]*)"`));
    return m ? parseFloat(m[1]) : 0;
  };
  const svgWidthMatch = svgText.match(/<svg\b[^>]+\bwidth="([^"]*)"/);
  const svgNativeWidth = svgWidthMatch ? parseFloat(svgWidthMatch[1]) : canvasSize;
  const scale = canvasSize / svgNativeWidth;
  return {
    x: attr("x") * scale,
    y: attr("y") * scale,
    width: attr("width") * scale,
    height: attr("height") * scale,
  };
}

// Renders the QR to an untainted canvas.
//
// Chrome taints any canvas that has an SVG containing <image> elements drawn
// onto it via new Image(), even with data: URL sources. A tainted canvas returns
// null from toBlob() and an empty string from toDataURL().
//
// Fix: get the raw SVG, extract the logo's exact position from the <image> tag,
// strip <image> elements, render the clean SVG (no taint), then draw the logo
// from its data URL at the coordinates qr-code-styling used — so PNG/PDF output
// is pixel-accurate to the SVG live preview.
async function renderQRToCanvas(
  qrInstance: QRCodeStyling,
  qrSize: number,
  bgColor: string,
  logo?: string | null,
  logoSize?: number,
): Promise<HTMLCanvasElement> {
  const svgBlob = await qrInstance.getRawData("svg");
  if (!svgBlob || !(svgBlob instanceof Blob)) throw new Error("Failed to get QR SVG");

  const svgText = await (svgBlob as Blob).text();

  // Extract exact logo rect before stripping so canvas placement matches SVG exactly
  const logoRect = logo ? extractLogoRect(svgText, qrSize) : null;

  // Strip <image> elements before drawing to canvas to prevent tainting
  const cleanSvg = logo
    ? svgText.replace(/<image[^>]*(?:\s*\/>|>[\s\S]*?<\/image>)/g, "")
    : svgText;

  const cleanBlob = new Blob([cleanSvg], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(cleanBlob);
  const qrImg = await loadImage(svgUrl);
  URL.revokeObjectURL(svgUrl);

  const canvas = document.createElement("canvas");
  canvas.width = qrSize;
  canvas.height = qrSize;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, qrSize, qrSize);
  ctx.drawImage(qrImg, 0, 0, qrSize, qrSize);

  // Draw logo separately — data: URLs are same-origin and never taint canvas
  if (logo) {
    const logoImg = await loadImage(logo);
    if (logoRect) {
      // Use coordinates extracted from the SVG for pixel-perfect match with live preview
      ctx.drawImage(logoImg, logoRect.x, logoRect.y, logoRect.width, logoRect.height);
    } else if (logoSize) {
      // Fallback when SVG parsing fails: manual center calculation
      const LOGO_MARGIN = 8;
      const drawSize = Math.max(qrSize * logoSize - 2 * LOGO_MARGIN, 1);
      const offset = (qrSize - drawSize) / 2;
      ctx.drawImage(logoImg, offset, offset, drawSize, drawSize);
    }
  }

  return canvas;
}

// For no-label PNG downloads and PDF no-label path
export async function renderQRToPNGBlob(
  qrInstance: QRCodeStyling,
  qrSize: number,
  bgColor: string,
  logo?: string | null,
  logoSize?: number,
): Promise<Blob> {
  const canvas = await renderQRToCanvas(qrInstance, qrSize, bgColor, logo, logoSize);
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png"),
  );
}

async function buildCompositeCanvas(
  qrInstance: QRCodeStyling,
  label: string,
  style: LabelStyle,
  bgColor: string,
  qrSize: number,
  logo?: string | null,
  logoSize?: number,
): Promise<HTMLCanvasElement> {
  const qrCanvas = await renderQRToCanvas(qrInstance, qrSize, bgColor, logo, logoSize);

  const labelHeight = getLabelHeight(style.fontSize);
  const canvas = document.createElement("canvas");
  canvas.width = qrSize;
  canvas.height = qrSize + labelHeight;

  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(qrCanvas, 0, 0, qrSize, qrSize);

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
  logo?: string | null,
  logoSize?: number,
): Promise<void> {
  const canvas = await buildCompositeCanvas(qrInstance, label, style, bgColor, qrSize, logo, logoSize);
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
  logo?: string | null,
  logoSize?: number,
): Promise<HTMLCanvasElement> {
  return buildCompositeCanvas(qrInstance, label, style, bgColor, qrSize, logo, logoSize);
}

function triggerDownload(url: string, name: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
