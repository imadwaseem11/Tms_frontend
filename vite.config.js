import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://tms-backend-tyfd.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
