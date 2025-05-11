/**
 * @type {Partial<import("typedoc").TypeDocOptions>}
 */
export default {
	entryPoints: ["../src/Main.ts"],
	excludePrivate: true,
	gitRevision: "main",
	hideGenerator: true,
	name: "Pug for Koa",
	out: "../docs",
	readme: "none",
	tsconfig: "../src/tsconfig.json"
};
