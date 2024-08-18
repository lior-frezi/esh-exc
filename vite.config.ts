/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-styled-components"],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    // hey! 👋 over here
    globals: true,
    setupFiles: "./setup-tests.js", // assuming the test folder is in the root of our project
  },
});
