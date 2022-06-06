/**
 * @author WMXPY
 * @namespace Serverless
 * @description CLI
 */

import * as Path from "path";
import { ExecuteOption } from "./declare";
import { bundleRecipe } from "./recipe/bundle";
import { cleanRecipe } from "./recipe/clean";
import { compressRecipe } from "./recipe/compress";
import { logInfo } from "./util/log";

export const execute = async (
    args: string[],
    base: string = process.cwd(),
): Promise<void> => {

    const currentPath: string = Path.resolve(base);
    const currentConfigPath: string = Path.join(currentPath, 'serverless.yaml');

    const options: ExecuteOption = {

        only: false,

        configPath: currentConfigPath,
    };

    const commands: string[] = args.slice(2);

    if (commands.length === 0) {

        console.log('[COMPLETE] No command specified');
        return;
    }

    for (let i = 0; i < commands.length; i++) {

        const command: string = commands[i];

        if (command.startsWith('-')) {

            switch (command) {

                case '--config': {

                    logInfo(`OPTION - Use config path: ${commands[i + 1]}`);
                    if (commands.length > i + 1) {

                        i++;
                        const targetConfigPath: string = Path.resolve(
                            Path.join(base, commands[i]),
                        );
                        options.configPath = targetConfigPath;
                    }
                    break;
                }
                case '--only': {

                    logInfo(`OPTION - Run target without dependencies`);
                    options.only = true;
                    break;
                }
            }
            continue;
        }

        try {

            switch (command) {
                case 'bundle': {
                    let target: string | undefined;
                    if (commands.length > i + 1) {
                        i++;
                        target = commands[i];
                    }

                    if (typeof target === 'undefined') {
                        throw new Error('Target not specified');
                    }

                    logInfo(`RUN - Bundle ${target}`);
                    await bundleRecipe(options, base, target);
                    break;
                }
                case 'clean': {
                    let target: string | undefined;
                    if (commands.length > i + 1) {
                        i++;
                        target = commands[i];
                    }

                    if (typeof target === 'undefined') {
                        throw new Error('Target not specified');
                    }

                    logInfo(`RUN - Clean ${target}`);
                    await cleanRecipe(options, base, target);
                    break;
                }
                case 'compress': {
                    let target: string | undefined;
                    if (commands.length > i + 1) {
                        i++;
                        target = commands[i];
                    }

                    if (typeof target === 'undefined') {
                        throw new Error('Target not specified');
                    }

                    logInfo(`RUN - Compress ${target}`);
                    await compressRecipe(options, base, target);
                    break;
                }
            }
        } catch (reason) {

            console.log(reason);
            console.log('[ERROR]');
            process.exit(255);
        }
    }

    console.log('[COMPLETE] Finished');
};
