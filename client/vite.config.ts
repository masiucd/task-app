import tailwindcss from "@tailwindcss/vite";
import {tanstackRouter} from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import {resolve} from "node:path";
import {defineConfig} from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
		tailwindcss(),
	],
	server: {
		port: 3333,
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"), // Example alias
		},
	},
});
