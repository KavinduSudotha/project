// utils/exportUtils.js
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

const exportPDF = (data, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));
  // Add data to PDF
  doc.end();
};

const exportExcel = (data, filePath) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Report');
  // Add data to Excel
  workbook.xlsx.writeFile(filePath);
};

module.exports = { exportPDF, exportExcel };
