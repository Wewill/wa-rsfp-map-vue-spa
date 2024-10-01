/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

const path = require("node:path");
const createAliasSetting = require("@vue/eslint-config-airbnb/createAliasSetting");

module.exports = {
	root: true,
	extends: [
		"plugin:vue/vue3-essential",
		"@vue/eslint-config-airbnb", // <-- added
		"eslint:recommended",
		"@vue/eslint-config-prettier",
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	env: {
		es6: true, // Active l'environnement ES6
		browser: true, // Si votre projet est pour le navigateur
		node: true, // Si votre projet est pour Node.js
	},
	rules: {
		"import/no-unresolved": "error",
	},
	settings: {
		...createAliasSetting({
			"@": `${path.resolve(__dirname, "./src")}`,
		}),
	},
};
