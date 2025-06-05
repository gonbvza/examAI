import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows Railway to bind to the correct network interface
    port: 8080, // Uses Railway's assigned port or defaults to 4173
    proxy: {
      "/api": {
        target: "http://web.railway.internal:8000", // Change this to your Django backend's Railway URL in production
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    allowedHosts: ["examai-production.up.railway.app", "localhost", "0.0.0.0"],
  },
});
