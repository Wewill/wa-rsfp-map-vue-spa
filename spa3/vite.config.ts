import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

export default defineConfig({
	plugins: [vue(), vueJsx()],
	build: {
		rollupOptions: {
			// Supprimez la ligne input si votre configuration l'inclut. Utilisez plutôt l'option de Vite par défaut.
			output: {
				dir: "dist", // Spécifie le répertoire de sortie
				entryFileNames: "build.js", // Spécifie le nom du fichier pour l'entrée principale
				format: "iife", // Utilisez 'iife' pour un script qui peut s'exécuter immédiatement
			},
		},
		emptyOutDir: true, // Nettoie le dossier de sortie avant de construire
		assetsDir: ".", // Définit le répertoire pour les assets
	},
});
