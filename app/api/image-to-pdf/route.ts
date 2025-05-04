import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFiles = formData.getAll('images') as File[];

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      );
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Process each image
    for (const imageFile of imageFiles) {
      const arrayBuffer = await imageFile.arrayBuffer();
      let image;

      try {
        // Try to embed the image (works for JPEG, PNG)
        image = await pdfDoc.embedJpg(arrayBuffer);
      } catch {
        try {
          // If JPEG fails, try PNG
          image = await pdfDoc.embedPng(arrayBuffer);
        } catch {
          // If both fail, skip this image
          console.warn(`Skipping unsupported image: ${imageFile.name}`);
          continue;
        }
      }

      // Add a new page with the image dimensions
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    // If no valid images were processed
    if (pdfDoc.getPageCount() === 0) {
      return NextResponse.json(
        { error: 'No valid images were provided' },
        { status: 400 }
      );
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Create a response with the PDF
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="converted.pdf"',
      },
    });
  } catch (error) {
    console.error('Image to PDF conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert images to PDF' },
      { status: 500 }
    );
  }
}
