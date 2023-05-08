import { execSync } from "child_process";
import { basename, join } from "path";

export const cacheBuster = options => ({
    name: "cache buster",
    setup(build) {
        build.initialOptions.metafile = true;
        build.initialOptions.entryNames = "[dir]/[name]-[hash]";

        const outputFile = join(build.initialOptions.outdir, basename(options.entryPoint));

        build.onEnd(result => {
            if (result.errors.length === 0) {
                const expressions = Object.keys(result.metafile.outputs).map(file => {
                    const fileName = file.replace(build.initialOptions.outdir, "");
                    const [, hash] = /\w+-(\w+)\.\w+/.exec(fileName);

                    const searchValue = fileName.replace(`-${hash}`, "");
                    const replaceValue = fileName;

                    return `-e 's|${searchValue}|${replaceValue}|'`;
                });

                const command = [
                    "sed",
                    ...expressions,
                    options.entryPoint,
                    ">",
                    outputFile,
                ].join(" ");

                execSync(command);
            }
        });
    },
});
