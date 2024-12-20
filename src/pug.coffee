import {extname, isAbsolute, join} from "node:path"
import renderer from "pug"
import {htmlToPdf} from "./puppeteer.js"

# Attaches a view renderer to the context of the specified application.
export pug = (application, rendererOptions = {}) ->

	# Resolves the path of the specified view.
	resolvePath = (view) ->
		view += ".pug" unless extname view
		if isAbsolute(view) or not rendererOptions.basedir? then view else join rendererOptions.basedir, view

	# Renders the specified view.
	render = (view, locals = {}, renderingOptions = {}) ->
		data = {rendererOptions..., @state..., locals...}
		html = await Promise.resolve renderer.renderFile resolvePath(view), data
		if renderingOptions.writeResponse ? yes
			@body = html
			@type = "html"
		html

	# Renders the specified view as a PDF document.
	renderPdf = (view, locals = {}, renderingOptions = {}) ->
		data = {rendererOptions..., @state..., locals...}
		html = await Promise.resolve renderer.renderFile resolvePath(view), data
		pdf = await htmlToPdf html, browser: rendererOptions.browser, pdf: renderingOptions
		if renderingOptions.writeResponse ? yes
			@body = pdf
			@type = "pdf"
		pdf

	# Attach the rendering functions to the application context.
	Object.defineProperties application.context, render: {value: render}, renderPdf: {value: renderPdf}
	renderer
