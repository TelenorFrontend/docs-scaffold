const config = require("../config/config");

const fs = require("fs-extra");
const path = require("path");
const pathIsInside = require("path-is-inside");

const rootFolder = path.join(__dirname, "..");
const buildFolder = path.join(__dirname, "..", config.targetDir);

if (pathIsInside(buildFolder, rootFolder)) {
    fs.removeSync(buildFolder);
} else {
    throw new Error("Malconfiguration: Build folder outide of project root, aborting ..");
}
