import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

const SHEET_ID = "1TbJxkn_ru-MqlmC0hyMYQ4VgX2QwLI6zmNw6H7U7c1k";

// Har tab ka apna exact GID yahan set ho gaya hai
const TABS = [
  { name: "Products", gid: "0" },
  { name: "Categories", gid: "377256535" },
  { name: "Brands", gid: "656070453" },
  { name: "Machine Models", gid: "1884521252" },
  { name: "Machine Sales", gid: "1974906098" }
];

async function sync() {
  for (const tab of TABS) {
    // Direct raw CSV export API bina kisi data format change (zero gayab kiye bina) ke
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${tab.gid}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${tab.name}`);
    }

    const csvData = await response.text();

    const result = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_quotes: true,
    });

    const fileName = tab.name.toLowerCase().replace(/\s+/g, "-");
    const filePath = path.join(process.cwd(), "data", `${fileName}.json`);

    fs.writeFileSync(filePath, JSON.stringify(result, null, 2));

    console.log(`✅ Synced ${tab.name} -> ${fileName}.json`);
  }
}

sync().catch(console.error);
