import {pug} from "@cedx/koa-pug";
import Koa from "koa";
import console from "node:console";
import {join} from "node:path";
import pkg from "../package.json" with {type: "json"};

// Initialize the Koa application.
const app = new Koa;

// Configure the view renderer.
pug(app, {
	basedir: join(import.meta.dirname, "../res"),
	cache: app.env == "production",
	compileDebug: app.env != "production"
});

// Configure the data shared by all views.
app.use((ctx, next) => {
	Object.assign(ctx.state, {version: pkg.version});
	return next();
});

// Render the view as HTML or PDF depending on content negotiation.
app.use(async ctx => {
	const items = [{name: "Arthion Xyrlynn"}, {name: "Elen Naenan"}, {name: "Paeris Xilmenor"}];
	if (ctx.accepts("pdf")) await ctx.renderPdf("Main", {items});
	else await ctx.render("Main", {items});
});

// Start the application.
if (app.env != "test")
	app.listen({host: "127.0.0.1", port: 3000}, () => console.log("Server listening on http://127.0.0.1:3000..."));

export default app;
