const path = require("path");
const config = require("../config/config");

module.exports = () => {
  return (files, metalsmith, done) => {
      // give each file a url field
      Object.keys(files).forEach((file) => {
          files[file].url = config.webRoot + file;
      });

      // remove files that haven't been processed from navigation
      Object.keys(files).forEach((file) => {
          if (!(/\.html$/.test(path.extname(file)))) delete files[file].nav_groups;
      });
    done();
  };
};
