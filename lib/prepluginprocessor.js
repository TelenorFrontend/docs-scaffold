const remark = require('remark');
const strip = require('strip-markdown');

module.exports = () => {
  return (files, metalsmith, done) => {
      // give each file a plaintext field
      Object.keys(files).forEach((file) => {
          remark()
            .use(strip)
            .process(files[file].contents.toString(), function (err, plaintext) {
              if (err) throw err;
              files[file].plaintext = String(plaintext);
            });
      });
    done();
  };
};
