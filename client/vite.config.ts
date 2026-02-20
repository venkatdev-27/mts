import path from "path";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      react(),
      splitVendorChunkPlugin(),
      compression({ algorithm: "gzip", ext: ".gz", threshold: 1024 }),
      compression({ algorithm: "brotliCompress", ext: ".br", threshold: 1024 }),
    ],

    server: !isProduction
      ? {
          host: "0.0.0.0",
          port: 5173,
          strictPort: true,
          hmr: true,
        }
      : undefined,

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },

    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false,
      target: "es2017",
      minify: "esbuild",
      cssCodeSplit: true,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            if (id.includes("react-router")) return "router";
            if (id.includes("framer-motion") || id.includes("\\node_modules\\motion") || id.includes("/node_modules/motion")) return "motion";
            if (id.includes("lucide-react") || id.includes("radix-ui")) return "ui-kit";
            if (id.includes("react") || id.includes("react-dom") || id.includes("scheduler")) return "vendor-react";
          },
        },
        treeshake: "recommended",
      },
    },

    preview: {
      port: 4173,
      strictPort: true,
    },
  };
});
