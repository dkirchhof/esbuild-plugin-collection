import dotenv from "dotenv";

export const dotEnv = options => {
    if (options && options.envFile) {
        dotenv.config({ path: options.envFile });
    } else {
        dotenv.config();
    }

    return {
        name: "dotenv",
        setup(build) {

            if (!build.initialOptions.define) {
                build.initialOptions.define = {};
            }

            Object.entries(process.env).forEach(([key, value]) => {
                build.initialOptions.define[`process.env.${key}`] = JSON.stringify(value);
            });
        },
    };
};
