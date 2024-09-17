import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vitest/config';
/// <reference types="vitest/config" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
  }
})

