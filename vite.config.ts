import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			codeSplittingOptions: {},
		}),
		viteReact(),
		tailwindcss(),
	],

	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://118.31.112.189:8801",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	// build: {
	// 	rollupOptions: {
	// 		output: {
	// 		},
	// 	},
	// },
});
