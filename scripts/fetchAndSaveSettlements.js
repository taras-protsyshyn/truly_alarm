import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const area = `49.96,36.07,50.28,36.56`;

const query = `
[out:json][timeout:25];
(
  node["place"~"city|town|village"](${area});
);
out body;
>;
out skel qt;
`;

// тут ми беремо назави усіх населених пунктів що знаходяться північніше Харкова
async function fetchSettlements() {
  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: query,
  });

  if (!response.ok) {
    throw new Error(`Overpass API error: ${response.statusText}`);
  }

  const data = await response.json();

  const names = data.elements.filter((el) => el.tags?.name).map((el) => el.tags.name);

  return names;
}

async function saveSettlementsToFile(settlements) {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, "..", "assets", "settlements.json");
  await fs.writeFileSync(filePath, JSON.stringify(settlements, null, 2), "utf-8");
  console.log(`✅ Settlements saved to ${filePath}`);
}

(async function () {
  try {
    const settlements = await fetchSettlements();

    await saveSettlementsToFile(settlements);
  } catch (error) {
    console.error("❌ Error fetching or saving settlements:", error);
  }
})();
