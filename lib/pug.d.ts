import {default as Koa} from "koa";
import {compile, compileFile, render, renderFile, Options} from "pug";
import {PuppeteerLaunchOptions} from "puppeteer";

/**
 * Attaches a view renderer to the context of the specified application.
 * @param application The application instance.
 * @param options The renderer options.
 * @returns The newly created view renderer.
 */
export function pug(application: Koa, options?: RendererOptions): Pug;

/**
 * Represents a Pug view renderer.
 */
export type Pug = Readonly<{

	/**
	 * Compiles a Pug template to a function.
	 */
	compile: typeof compile;

	/**
	 * Compiles a Pug template from a file to a function.
	 */
	compileFile: typeof compileFile;

	/**
	 * Compiles a Pug template and renders it to an HTML string.
	 */
	render: typeof render;

	/**
	 * Compiles a Pug template from a file and renders it to an HTML string.
	 */
	renderFile: typeof renderFile;
}>;

/**
 * Defines the renderer options.
 */
export type RendererOptions = Options & Partial<{

	/**
	 * The launch options for the browser used to render PDF documents.
	 */
	browser: PuppeteerLaunchOptions;
}>;
