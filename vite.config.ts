import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: "localhost",
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("src/components")) {
            return "components";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
