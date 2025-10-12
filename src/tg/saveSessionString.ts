import fs from "fs";
import path from "path";

export function saveSessionString(session: string) {
  const envPath = path.resolve(process.cwd(), ".env");
  let envContent = fs.readFileSync(envPath, "utf-8");

  const sessionLine = `STRING_SESSION=${session}`;

  if (envContent.includes("STRING_SESSION=")) {
    envContent = envContent.replace(/STRING_SESSION=.*/g, sessionLine);
  } else {
    envContent += `\n${sessionLine}`;
  }

  fs.writeFileSync(envPath, envContent);
}
