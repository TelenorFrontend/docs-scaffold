const config = require("../config/config");
const configDocs = require("../config/config-docs");

const path = require("path");
const metalsmith = require("metalsmith");
const metallic = require("metalsmith-metallic");
const markdown = require("metalsmith-markdown");
const navigation = require("metalsmith-navigation");
const layouts = require("metalsmith-layouts");
const swaggerui = require("metalsmith-swagger-ui");
const prepluginprocessor = require("./prepluginprocessor");
const postpluginprocessor = require("./postpluginprocessor");

metalsmith(path.dirname(__dirname))
    .clean(false)
    .source(configDocs.sourceDir)
    .destination(config.targetDir)
    .metadata({
        docName: config.docName,
        webRoot: config.webRoot
    })
    .use(prepluginprocessor())
    .use(metallic())
    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true
    }))
    .use(swaggerui({
        template: path.join(__dirname, "..", "layouts/partials/_swaggerui.hbs")
    }))
    .use(postpluginprocessor())
    .use(navigation({
        primary: {
            sortBy: "nav_sort",
            filterProperty: "nav_groups"
        },
        secondary: {
            sortBy: "nav_sort",
            filterProperty: "nav_groups"
        },
        tertiary: {
            sortBy: "nav_sort",
            filterProperty: "nav_groups"
        }
    },
    {
        navListProperty: "navs"
    }))
    .use(layouts({
        default: "../layouts/default.hbs",
        pattern: "**/*.html",
        partials: "./layouts/partials",
        engine: "handlebars"
    }))
    .build((err, files) => {
        if (err) throw err;
    });