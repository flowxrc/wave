import esbuild from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";
import { transformExtPlugin } from "@gjsify/esbuild-plugin-transform-ext";
import * as colorette from "colorette";
import * as glob from "glob";

const logPrefix = colorette.cyanBright("[Compiler]");

const startTime = Date.now();
const filesToCompile = glob.sync("src/**/*.ts");

for (let i = 0; i < filesToCompile.length; i++) {
    const filePath = filesToCompile[i];

    if (filePath.includes("@types"))
        continue;

    try {
        const inFile = filePath;
        const outFile = filePath.replace("src", "dist/compiled").replace(".ts", ".js");

        console.log(logPrefix, "Compiling", colorette.blueBright(inFile), colorette.gray("->"), colorette.yellowBright(outFile));

        esbuild.build({
            entryPoints: [inFile],
            outfile: outFile,
            plugins: [esbuildPluginTsc(), transformExtPlugin({ outExtension: {".ts": ".js"}})]
        });
    }
    catch (error) {
        console.error(logPrefix, colorette.redBright("Error when compiling"), colorette.blueBright(inFile), colorette.gray("->"), colorette.yellowBright(outFile), colorette.red(error));
    }
};

console.log(logPrefix, colorette.greenBright("Finished compiling"), "in", `${colorette.green(Date.now() - startTime)}ms\n`);