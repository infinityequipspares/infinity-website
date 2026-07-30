import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

const SHEET_ID = "1TbJxkn_ru-MqlmC0hyMYQ4VgX2QwLI6zmNw6H7U7c1k";

const TABS = [
  "Categories",
  "Products",
  "Brands",
  "Machine Models",
  "Machine Sales" // <-- Yeh naya tab add kar diya gaya hai
];

async function sync() {
  for (const tabName of TABS) {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
      tabName
    )}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${tabName}`);
    }

    const csvData = await response.text();

    const result = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_quotes: true,
    });

    // ===== DEBUG TEST =====
    if (tabName === "Products") {
      const test = result.find(
        (row: any) => String(row.partNumber).trim() === "1600318"
      );

      console.log("========== TEST ==========");
      console.log(test);
      console.log("==========================");
    }
    // ===== END DEBUG TEST =====

    const fileName = tabName
      .toLowerCase()
      .replace(/\s+/g, "-");

    const filePath = path.join(
      process.cwd(),
      "data",
      `${fileName}.json`
    );

    fs.writeFileSync(filePath, JSON.stringify(result, null, 2));

    console.log(`✅ Synced ${tabName} -> ${fileName}.json`);
  }
}

sync().catch(console.error);
