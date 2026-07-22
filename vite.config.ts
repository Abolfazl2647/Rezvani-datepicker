/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        "adapters/index": resolve(__dirname, "src/adapters/index.ts"),
        "adapters/native/index": resolve(__dirname, "src/adapters/native/index.ts"),
        "adapters/dayjs/index": resolve(__dirname, "src/adapters/dayjs/index.ts"),
        "adapters/date-fns/index": resolve(__dirname, "src/adapters/date-fns/index.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        format === "es" ? `${entryName}.es.js` : `${entryName}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "dayjs", "date-fns"],
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
