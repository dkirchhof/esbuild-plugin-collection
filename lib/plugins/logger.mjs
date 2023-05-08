export const logger = () => ({
    name: "logger",
    setup(build) {
        build.onEnd(result => {
            if (result.errors.length > 0) {
                console.log(`Build finished with errors: ${new Date().toLocaleString()}`);
            } else {
                console.log(`Build finished: ${new Date().toLocaleString()}`);
            }
        });
    },
});
