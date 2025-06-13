import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Allows Railway to bind to the correct network interface
    proxy: {
      "/api": {
        target: "http://web.railway.internal:8000", // Change this to your Django backend's Railway URL in production
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ["examai.eu", "localhost"],
  },
  preview: {
    allowedHosts: ["examai.eu", "localhost", "0.0.0.0"],
  },
});
