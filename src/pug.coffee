import {compile, compileFile, render, renderFile} from "pug"
import {htmlToPdf} from "./puppeteer.js"

# Attaches a view renderer to the context of the specified application.
export pug = (application, rendererOptions = {}) ->
	renderer = Object.freeze {compile, compileFile, render, renderFile}

	# Renders the specified view.
	_render = (view, locals = {}, renderingOptions = {}) ->
		data = {rendererOptions..., @state..., locals...}
		html = await Promise.resolve renderer.renderFile view, data
		if renderingOptions.writeResponse ? yes
			@body = html
			@type = "html"
		html

	# Renders the specified view as a PDF document.
	_renderPdf = (view, locals = {}, renderingOptions = {}) ->
		data = {rendererOptions..., @state..., locals...}
		html = await Promise.resolve renderer.renderFile view, data
		pdf = await htmlToPdf html, browser: rendererOptions.browser, pdf: renderingOptions
		if renderingOptions.writeResponse ? yes
			@body = pdf
			@type = "pdf"
		pdf

	# Attach the rendering functions to the application context.
	Object.defineProperties application.context, render: {value: _render}, renderPdf: {value: _renderPdf}
	renderer
