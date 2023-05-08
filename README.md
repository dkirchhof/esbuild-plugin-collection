# esbuild plugin collection

## logger
Prints a message after finishing a build. Can be used in a single build and in watch mode.

```
import { logger } from "esbuild-plugin-collection";

await build({
    plugins: [logger()],
});
```

## dotenv
Replaces all occurrences of `process.env.ENV_VARIABLE` with the actual value if it can find one. It can also handle `.env`-files. 

```
import { dotenv } from "esbuild-plugin-collection";

await build({
    plugins: [
        // default dotenv
	    dotEnv(),
	    
	    // path to .env file
	    // dotEnv({ envFile: new URL("../.env", import.meta.url) }),
	],
});
```

## cache buster
Generates files with hashed names and replaces their paths in the specified entry point. The hash value only changes if the file content changes.
:exclamation:  Make sure `sed` is available on your system.  

```
import { cacheBuster } from "esbuild-plugin-collection";

await build({
    entryPoints: [
        // will generate public/index-[HASH].js
        "src/index.js",
    ],
    outdir: "public",
    plugins: [cacheBuster({ entryPoint: "src/index.html" })],
});
```

Example html source file:
```
<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

		<!-- will be replaced with /index-[HASH].css -->
        <link rel="stylesheet" href="/index.css" /> 

		<!-- will be replaced with /index-[HASH].js -->
        <script src="/index.js" defer></script>
    </head>

    <body>
    
    </body>
</html>
```

## example config
You can find an example with all plugins in the `example`-folder. Just run `cd example && node esbuild.mjs` to try it out.
