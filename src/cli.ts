/**
 * @author WMXPY
 * @namespace Serverless
 * @description CLI
 */

import { ExecuteOption } from "./declare";
import { bundleRecipe } from "./recipe/bundle";
import { logInfo } from "./util/log";

export const execute = async (args: string[]): Promise<void> => {

    const options: ExecuteOption = {

        only: false,
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
                    await bundleRecipe(options);
                    break;
                }
            }
        } catch (reason) {

            console.log('[ERROR]');
        }
    }

    console.log('[COMPLETE] Finished');
};
