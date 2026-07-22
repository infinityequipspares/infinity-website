import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

// Excel file location
const excelPath =
  "/Users/apple/Desktop/Infinity Equipments And Spares/Infinity Product Master.xlsx";

// Check if Excel exists
if (!fs.existsSync(excelPath)) {
  console.log("❌ Infinity Product Master.xlsx not found.");
  process.exit(1);
}

// Read workbook
const workbook = XLSX.readFile(excelPath);

// Read "Products" sheet
const sheet = workbook.Sheets["Products"];

if (!sheet) {
  console.log("❌ 'Products' sheet not found.");
  process.exit(1);
}

// Convert Excel to JSON
const data = XLSX.utils
  .sheet_to_json(sheet, {
    defval: "",
  })
  .map((row: any, index: number) => ({
    ...row,

    id: row.id || index + 1,

    partNumber: String(row.partNumber || "").trim(),
    alternatePartNumbers: String(row.alternatePartNumbers || "").trim(),
    brand: String(row.brand || "").trim().toUpperCase(),
    name: String(row.name || "").trim(),
    category: String(row.category || "").trim(),
    machines: String(row.machines || "").trim(),
    type: String(row.type || "").trim(),
    stock: String(row.stock || "").trim(),

    image: row.image
      ? `/images/products/${String(row.image).trim()}`
      : "/images/products/no-image.jpg",

    images: row.image
      ? [`/images/products/${String(row.image).trim()}`]
      : ["/images/products/no-image.jpg"],

    description: String(row.description || "").trim(),
    seoKeywords: String(row.seoKeywords || "").trim(),
    slug: String(row.slug || row.partNumber || "").trim(),
  }))
  .filter(
    (row: any) =>
      row.partNumber ||
      row.alternatePartNumbers ||
      row.name
  );

// Output file
const outputPath = path.join(
  process.cwd(),
  "data",
  "products.json"
);

// Save JSON
fs.writeFileSync(
  outputPath,
  JSON.stringify(data, null, 2),
  "utf8"
);

console.log("✅ products.json generated successfully.");
console.log(`📄 ${data.length} products exported.`);