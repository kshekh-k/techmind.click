import type QRCodeStyling from "qr-code-styling";

export const LABEL_PADDING = 14; // px above and below the label text
export const LABEL_FONT_SIZE = 16; // px
export const LABEL_HEIGHT = LABEL_PADDING * 2 + LABEL_FONT_SIZE; // 44 px total

/** Renders QR to canvas, then draws label text centered below it. */
async function buildCompositeCanvas(
  qrInstance: QRCodeStyling,
  label: string,
  labelColor: string,
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

  const canvas = document.createElement("canvas");
  canvas.width = qrSize;
  canvas.height = qrSize + LABEL_HEIGHT;

  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, qrSize, qrSize);

  ctx.fillStyle = labelColor;
  ctx.font = `600 ${LABEL_FONT_SIZE}px Inter, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, qrSize / 2, qrSize + LABEL_PADDING + LABEL_FONT_SIZE / 2, qrSize - 24);

  return canvas;
}

/** Injects a <text> element into the SVG string so the label is part of the vector file. */
function buildCompositeSVG(
  svgString: string,
  label: string,
  labelColor: string,
  qrSize: number,
): string {
  const escaped = label
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const textY = qrSize + LABEL_PADDING + LABEL_FONT_SIZE / 2;
  const newHeight = qrSize + LABEL_HEIGHT;

  return svgString
    .replace(/(<svg[^>]*\s)height="[^"]*"/, `$1height="${newHeight}"`)
    .replace(
      /<\/svg>\s*$/,
      `<text x="${qrSize / 2}" y="${textY}" text-anchor="middle" dominant-baseline="middle" ` +
        `font-family="Inter, system-ui, sans-serif" font-size="${LABEL_FONT_SIZE}" ` +
        `font-weight="600" fill="${labelColor}">${escaped}</text></svg>`,
    );
}

/** Downloads PNG with label composited below the QR. */
export async function downloadPNGWithLabel(
  qrInstance: QRCodeStyling,
  label: string,
  labelColor: string,
  bgColor: string,
  qrSize: number,
  fileName: string,
): Promise<void> {
  const canvas = await buildCompositeCanvas(qrInstance, label, labelColor, bgColor, qrSize);
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png"),
  );
  triggerDownload(URL.createObjectURL(blob), `${fileName || "qr-code"}.png`);
}

/** Downloads SVG with label as a <text> element below the QR. */
export function downloadSVGWithLabel(
  svgElement: SVGSVGElement,
  label: string,
  labelColor: string,
  qrSize: number,
  fileName: string,
): void {
  const raw = new XMLSerializer().serializeToString(svgElement);
  const composite = buildCompositeSVG(raw, label, labelColor, qrSize);
  const blob = new Blob([composite], { type: "image/svg+xml" });
  triggerDownload(URL.createObjectURL(blob), `${fileName || "qr-code"}.svg`);
}

/** Returns a composite canvas for PDF export. */
export async function buildCompositeCanvasForPDF(
  qrInstance: QRCodeStyling,
  label: string,
  labelColor: string,
  bgColor: string,
  qrSize: number,
): Promise<HTMLCanvasElement> {
  return buildCompositeCanvas(qrInstance, label, labelColor, bgColor, qrSize);
}

function triggerDownload(url: string, name: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
