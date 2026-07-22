import { copyFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const dest = "dist/styles/index.css";

mkdirSync(dirname(dest), { recursive: true });
copyFileSync("src/styles/index.css", dest);
