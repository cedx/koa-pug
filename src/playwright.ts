import {Buffer} from "node:buffer";
import {chromium} from "playwright";
import type {LaunchOptions, Page} from "playwright-core";

/**
 * Converts the specified HTML code into a PDF document.
 * @param html The HTML code to convert.
 * @param options The rendering options.
 * @returns The PDF document corresponding to the specified HTML code.
 */
export async function htmlToPdf(html: string, options: {browser?: LaunchOptions, pdf?: PdfOptions} = {}): Promise<Buffer> {
	const browser = await chromium.launch(options.browser);
	const page = await browser.newPage();
	await page.setContent(html, {waitUntil: "load"});
	const pdf = await page.pdf(options.pdf);
	await browser.close();
	return Buffer.from(pdf);
}

/**
 * Defines the PDF rendering options.
 */
export type PdfOptions = Parameters<Page["pdf"]>[0];
