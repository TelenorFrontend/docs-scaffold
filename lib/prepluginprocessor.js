const remark = require("remark");
const strip = require("strip-markdown");
const path = require("path");
const config = require("../config/config");
const configDocs = require("../config/config-docs");

module.exports = () => {
    return (files, metalsmith, done) => {
        // give each file an editUrl field if config.editUrl exists
        if (config.editUrl && config.editUrl.length > 0) {
            Object.keys(files).forEach((file) => {
                files[file].editUrl = config.editUrl + path.join(configDocs.sourceDir, file);
            });
        }

        // give each file a plaintext field
        Object.keys(files).filter(isMarkdown).forEach((file) => {
            remark()
                .use(strip)
                .process(files[file].contents.toString(), (err, plaintext) => {
                    if (err) throw err;
                    files[file].plaintext = String(plaintext);
                });
        });

        Object.keys(files).filter(isOpenapi).forEach((file) => {
            files[file].plaintext = "Api Reference";
        });
        done();
    };
};

function isMarkdown(file) {
    return /\.(md|markdown)$/.test(path.extname(file));
}

function isOpenapi(file) {
    return /\.(json|yml|yaml|openapi)$/.test(path.extname(file));
}
