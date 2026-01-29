import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const apiUrl = env.VITE_API_URL;

  return {
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
