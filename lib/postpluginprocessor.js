const path = require("path");
const config = require("../config/config");

module.exports = () => {
    return (files, metalsmith, done) => {
        addUrl(files, metalsmith);
        removeNavigation(files, metalsmith);
        done();
    };
};

// give each file a url field
function addUrl(files, metalsmith) {
    Object.keys(files).forEach((file) => {
        files[file].url = config.webRoot + file;
    });
}

// remove files that haven't been processed from navigation
function removeNavigation(files, metalsmith) {
    Object.keys(files).forEach((file) => {
        if (!(/\.html$/.test(path.extname(file)))) {
            delete files[file].nav_groups;
        }
    });
}
