import * as esbuild from "esbuild"
import { logger, dotEnv, cacheBuster } from "../lib/index.mjs";

let ctx = await esbuild.context({
    entryPoints: [
        "src/index.js", 
        "src/index2.js",
    ],
    outdir: "public",
    splitting: true,
    format: "esm",
    bundle: true,
    plugins: [
        logger(),
        dotEnv(),
        // dotEnv({ envFile: new URL("../.env", import.meta.url) }),
        cacheBuster({ entryPoint: "src/index.html" }),
    ],
});

await ctx.watch();

let { host, port } = await ctx.serve({
    servedir: "public",
});

console.log(host, port);
