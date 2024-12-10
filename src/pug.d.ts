import {default as Koa} from "koa";
import Pug from "pug";
import {LaunchOptions} from "puppeteer";

/**
 * Attaches a view renderer to the context of the specified application.
 * @param application The application instance.
 * @param options The renderer options.
 * @returns The newly created view renderer.
 */
export function pug(application: Koa, options?: RendererOptions): typeof Pug;

/**
 * Defines the renderer options.
 */
export type RendererOptions = Pug.Options & Partial<{

	/**
	 * The launch options for the browser used to render PDF documents.
	 */
	browser: LaunchOptions;
}>;
