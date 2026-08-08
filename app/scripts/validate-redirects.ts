import fs from "fs";
import path from "path";

const REDIRECTS_PATH = path.join(process.cwd(), "app/data/redirects.json");

function validateRedirects() {
  console.log("🔍 Validating redirects database...");

  if (!fs.existsSync(REDIRECTS_PATH)) {
    console.error("❌ Error: redirects.json not found at " + REDIRECTS_PATH);
    process.exit(1);
  }

  let redirects: any;
  try {
    const raw = fs.readFileSync(REDIRECTS_PATH, "utf-8");
    redirects = JSON.parse(raw);
  } catch (error: any) {
    console.error("❌ Error: Failed to parse redirects.json as valid JSON:", error.message);
    process.exit(1);
  }

  if (!Array.isArray(redirects)) {
    console.error("❌ Error: redirects.json must contain a JSON array.");
    process.exit(1);
  }

  let hasErrors = false;
  const sources = new Set<string>();
  const redirectMap = new Map<string, string>();

  // 1. Basic schema and duplication checks
  for (let i = 0; i < redirects.length; i++) {
    const entry = redirects[i];
    const entryNum = i + 1;

    if (typeof entry !== "object" || entry === null) {
      console.error(`❌ Entry #${entryNum}: Must be an object.`);
      hasErrors = true;
      continue;
    }

    const { source, destination, permanent } = entry;

    if (typeof source !== "string" || !source) {
      console.error(`❌ Entry #${entryNum}: 'source' must be a non-empty string.`);
      hasErrors = true;
    }
    if (typeof destination !== "string" || !destination) {
      console.error(`❌ Entry #${entryNum}: 'destination' must be a non-empty string.`);
      hasErrors = true;
    }
    if (typeof permanent !== "boolean") {
      console.error(`❌ Entry #${entryNum}: 'permanent' must be a boolean value.`);
      hasErrors = true;
    }

    if (typeof source === "string" && source) {
      // Path integrity check
      if (!source.startsWith("/")) {
        console.error(`❌ Entry #${entryNum}: 'source' ("${source}") must start with '/'.`);
        hasErrors = true;
      }

      // Duplication check
      if (sources.has(source)) {
        console.error(`❌ Entry #${entryNum}: Duplicate source detected: "${source}".`);
        hasErrors = true;
      }
      sources.add(source);
      
      if (typeof destination === "string" && destination) {
        redirectMap.set(source, destination);
      }
    }

    if (typeof destination === "string" && destination) {
      const isExternal = destination.startsWith("http://") || destination.startsWith("https://");
      if (!isExternal && !destination.startsWith("/")) {
        console.error(`❌ Entry #${entryNum}: 'destination' ("${destination}") must start with '/' or be a fully qualified HTTP/HTTPS URL.`);
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    console.log("\n❌ Validation failed with schema or path errors.");
    process.exit(1);
  }

  // 2. Cycle and chain detection
  let hasCycles = false;
  let hasChains = false;

  for (const source of redirectMap.keys()) {
    const visited = new Set<string>();
    visited.add(source);
    let current = redirectMap.get(source);
    const pathList = [source];

    while (current && redirectMap.has(current)) {
      pathList.push(current);
      if (visited.has(current)) {
        console.error(`❌ Circular Redirect Loop detected: ${pathList.join(" -> ")}`);
        hasCycles = true;
        break;
      }
      visited.add(current);
      current = redirectMap.get(current);
    }

    // Chain detection (if it resolved to another internal redirect without cycle)
    if (!hasCycles && pathList.length > 2) {
      console.warn(`⚠️ Redirect Chain detected: ${pathList.join(" -> ")} -> ${current || ""}. Consider collapsing this to directly map ${source} -> ${current || pathList[pathList.length - 1]}.`);
      hasChains = true;
    }
  }

  if (hasCycles) {
    console.log("\n❌ Validation failed due to circular redirects.");
    process.exit(1);
  }

  if (hasChains) {
    console.log("\n⚠️ Validation completed with warnings (chains detected).");
  } else {
    console.log("\n✅ All redirects are valid! No loops, duplicates, or format issues found.");
  }
}

validateRedirects();
