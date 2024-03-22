import esbuild from "esbuild";
import * as colorette from "colorette";
import fs from "fs";

const logPrefix = colorette.cyanBright("[Bundler]");

const inFile = "dist/compiled/main.js";
const outFile = "dist/bundle.js";
const startTime = Date.now();

function bundle() {
    if (!fs.existsSync(inFile))
        return console.error(logPrefix, colorette.redBright("Error when bundling"), colorette.gray(inFile), "does not exist, please use the compiler first.");

    console.log(logPrefix, "Bundling", colorette.yellowBright(inFile), colorette.gray("->"), colorette.yellowBright(outFile));

    try {
        esbuild.build({
            entryPoints: [inFile],
            outfile: outFile,
            bundle: true,
            format: "cjs"
        });
        
        console.log(logPrefix, colorette.greenBright("Finished bundling"), colorette.gray(inFile), "->", colorette.gray(outFile), "in", `${colorette.green(Date.now() - startTime)}ms\n`);
    }
    catch (error) {
        console.error(logPrefix, colorette.redBright("Error when bundling"), colorette.gray(inFile), "->", colorette.gray(outFile), colorette.red(error));
    }
};

bundle();