import type QRCodeStyling from "qr-code-styling";

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
): Promise<void> {
  const raw = await qrInstance.getRawData("png");
  if (!raw || !(raw instanceof Blob)) throw new Error("Failed to render QR code");

  const base64 = await blobToBase64(raw);

  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Centre QR on A4 page (210×297 mm); cap at 160 mm regardless of pixel size
  const imgMM = Math.min(160, size * 0.2646);
  const x = (210 - imgMM) / 2;
  const y = (297 - imgMM) / 2;

  pdf.addImage(base64, "PNG", x, y, imgMM, imgMM);
  pdf.save(`${fileName || "qr-code"}.pdf`);
}
