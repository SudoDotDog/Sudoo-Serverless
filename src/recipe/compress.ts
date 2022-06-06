/**
 * @author WMXPY
 * @namespace Recipe
 * @description Compress
 */

import { ServerlessConfig } from "../config/declare";
import { ServerlessConfigFunctionVersion1 } from "../config/declare/v1";
import { readServerlessConfig } from "../config/read";
import { ExecuteOption } from "../declare";
import { logInfo } from "../util/log";
import { bundleRecipe } from "./bundle";
import { compressTarget } from "./compress/compress-target";

export const compressRecipe = async (
    options: ExecuteOption,
    base: string,
    target: string,
): Promise<void> => {

    logInfo(`RUN - Compress ${target}`);

    const config: ServerlessConfig = await readServerlessConfig(options.configPath);

    const targetFunction: ServerlessConfigFunctionVersion1[] = [];

    if (target === '--all') {
        logInfo('Compressing All Functions');
        targetFunction.push(...config.functions);
    }

    for (const functionConfig of config.functions) {
        if (functionConfig.name === target) {
            targetFunction.push(functionConfig);
        }
    }

    if (targetFunction.length === 0) {
        throw new Error(`Target ${target} does not exist`);
    }

    if (!options.only) {
        logInfo('Depend On - Bundle');
        await bundleRecipe(options, base, target);
    }

    for (const functionConfig of targetFunction) {
        await compressTarget(options, base, functionConfig);
    }

    logInfo(`Compress ${target} Done`);
};
