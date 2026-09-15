import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Plain Vite config (replaces the old @lovable.dev/vite-tanstack-config
// wrapper). The "node-server" Nitro preset builds a standard Node server
// bundle that runs the same way on Railway, a VPS, or Vercel's Node
// runtime -- see serve.mjs and DEPLOYMENT.md.
export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro({ preset: "node-server" }),
    viteReact(),
  ],
});
