const removeMd = require("remove-markdown");
const path = require("path");
const config = require("../config/config");
const configDocs = require("../config/config-docs");

module.exports = () => {
    return (files, metalsmith, done) => {
        addPlaintext(files);
        addEditUrlIfExists(files);
        done();
    };
};

function isMarkdown(file) {
    return /\.(md|markdown)$/.test(path.extname(file));
}

function isOpenapi(file) {
    return /\.(json|yml|yaml|openapi)$/.test(path.extname(file));
}

function addPlaintext(files) {
    Object.keys(files).filter(isMarkdown).forEach((file) => {
        files[file].plaintext = removeMd(files[file].contents.toString());
    });

    Object.keys(files).filter(isOpenapi).forEach((file) => {
        files[file].plaintext = "Api Reference";
    });

    Object.keys(files).forEach((file) => {
        if (!files[file].plaintext) {
            files[file].plaintext = files[file].title;
        }
    });
}

function addEditUrlIfExists(files) {
    if (config.editUrl && config.editUrl.length > 0) {
        Object.keys(files).forEach((file) => {
            files[file].editUrl = config.editUrl + path.join(configDocs.sourceDir, file);
        });
    }
}
