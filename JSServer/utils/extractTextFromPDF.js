import fs from 'fs';
import pdfParse from 'pdf-parse';
import { fromPath } from 'pdf2pic';
import Tesseract from 'tesseract.js';
import { franc } from 'franc';

export async function extractTextFromPDF(pdfPath) {
  const fileBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdfParse(fileBuffer);

  // If text is empty or very short, use OCR
  const isScanned = !pdfData.text || pdfData.text.trim().length < 100;

  if (!isScanned) {
    return { text: pdfData.text, method: 'parsed', language: 'unknown' };
  }

  // Convert first page to image
  const converter = fromPath(pdfPath, {
    density: 300,
    saveFilename: 'temp',
    savePath: './',
    format: 'png',
    width: 1654, height: 2340
  });

  const page1 = await converter(1); // You can OCR more pages in a loop if needed

  const ocrResult = await Tesseract.recognize(page1.path, 'eng+hin+tam+mar', {
    logger: m => console.log(m.status)
  });

  const ocrText = ocrResult.data.text;
  const detectedLang = franc(ocrText); // Optional: returns ISO 639-3 code

  return { text: ocrText, method: 'ocr', language: detectedLang };
}
