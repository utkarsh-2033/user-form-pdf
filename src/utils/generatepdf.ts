import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generatePdf(data: {
  name: string;
  email: string;
  phone: string;
  position: string;
  description: string;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 750]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone Number: ${data.phone}`,
    `Position: ${data.position}`,
    `Description: ${data.description}`,
  ];

  lines.forEach((line : string, index : number) => {
    page.drawText(line, {
      x: 50,
      y: 700 - index * 30,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
