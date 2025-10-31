import fs from 'fs/promises';
import path from 'path';

// This script is an ESM module.

/**
 * The directory where the knowledge TypeScript files are located.
 * This path is relative to the project root.
 */
const KNOWLEDGE_DIR = 'src/knowledge';

/**
 * The path where the final JSON output file will be saved.
 * This path is relative to the project root.
 */
const OUTPUT_PATH = 'knowledge.json';

/**
 * Main function to execute the script.
 *
 * This function performs the following steps:
 * 1. Reads all files from the `KNOWLEDGE_DIR`.
 * 2. Filters out files that are not relevant (e.g., `index.ts`).
 * 3. Dynamically imports each knowledge file.
 * 4. Extracts the exported `KnowledgeChunk` arrays from each module.
 * 5. Flattens all chunks into a single array.
 * 6. Writes the final array to `OUTPUT_PATH` as a JSON file.
 * 7. Logs a success message to the console.
 */
async function main() {
  const allChunks = [];
  const files = await fs.readdir(KNOWLEDGE_DIR);

  for (const file of files) {
    // We only process .ts files, and we exclude the index file.
    if (file.endsWith('.ts') && file !== 'index.ts') {
      const modulePath = path.join(process.cwd(), KNOWLEDGE_DIR, file);
      const module = await import(modulePath);

      // We look for any exported array in the module.
      for (const exportName in module) {
        const exportedData = module[exportName];
        if (Array.isArray(exportedData)) {
          allChunks.push(...exportedData);
        }
      }
    }
  }

  // Write the combined data to the output file, formatted for readability.
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(allChunks, null, 2));

  console.log(`✅ Successfully formatted knowledge data.`);
  console.log(`📄 Total chunks: ${allChunks.length}`);
  console.log(`➡ Output file: ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error('❌ An error occurred while formatting knowledge data:', error);
  process.exit(1);
});
