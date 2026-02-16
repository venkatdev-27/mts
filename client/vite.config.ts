import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react()],

    // Dev server (local / Docker only)
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
      sourcemap: false, // 🔒 no source maps in prod
      target: "es2017",
    },

    preview: {
      port: 4173,
      strictPort: true,
    },
  };
});
