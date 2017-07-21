const config = require("../config/config");
const configStyle = require("../config/config-style");

const sass = require("node-sass");
const fs = require("fs");
const path = require("path");

sass.render({
    file: path.join(__dirname, "..", configStyle.sourceFile),
    includePaths: configStyle.includePaths,
    outputStyle: "compressed"
}, (err, result) => {
    if (err) {
        throw err;
    } else {
        const targetDir = path.dirname(path.join(__dirname, "..", config.targetDir, configStyle.targetFile));

        // initDir by Mouneer from https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
        const initDir = path.isAbsolute(targetDir) ? path.sep : "";
        targetDir.split(path.sep).reduce((parentDir, childDir) => {
            const curDir = path.resolve(parentDir, childDir);
            if (!fs.existsSync(curDir)) {
                fs.mkdirSync(curDir);
            }

            return curDir;
        }, initDir);

        fs.writeFile(path.join(__dirname, "..", config.targetDir, configStyle.targetFile), result.css, (error) => {
            if (error) throw error;
        });
    }
});
