# Scripts

This directory contains utility scripts for the project.

## `format-knowledge`

This script is used to format the chatbot's knowledge base for use with Supabase Storage.

### Purpose

The chatbot's knowledge is maintained in TypeScript files within the `src/knowledge` directory. While this is convenient for development, we need to convert this data into a single JSON file before it can be uploaded to Supabase Storage.

This script automates that process.

### How it Works

The script (`format-knowledge.mjs`) performs the following actions:
1.  It reads all `.ts` files from the `src/knowledge` directory.
2.  It dynamically imports each file as an ES module.
3.  It extracts the exported `KnowledgeChunk` arrays from each module.
4.  It combines all the chunks into a single array.
5.  It saves the result as `knowledge.json` in the root of the project.

### Usage

To run the script, execute the following command from the project root:

```bash
npm run format-knowledge
```

After running the command, a `knowledge.json` file will be created or updated in the project's root directory. You can then upload this file to your Supabase Storage bucket.
