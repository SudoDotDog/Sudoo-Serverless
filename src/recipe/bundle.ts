/**
 * @author WMXPY
 * @namespace Recipe
 * @description Bundle
 */

import { ServerlessConfig } from "../config/declare";
import { ServerlessConfigFunctionVersion1 } from "../config/declare/v1";
import { readServerlessConfig } from "../config/read";
import { ExecuteOption } from "../declare";
import { logInfo } from "../util/log";
import { bundleTarget } from "./bundle/bundle-target";

export const bundleRecipe = async (
    options: ExecuteOption,
    base: string,
    target: string,
): Promise<void> => {

    logInfo(`RUN - Bundle ${target}`);

    const config: ServerlessConfig = await readServerlessConfig(options.configPath);

    const targetFunction: ServerlessConfigFunctionVersion1[] = [];

    if (target === '--all') {
        logInfo('Bundling All Functions');
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

    for (const functionConfig of targetFunction) {
        await bundleTarget(options, base, functionConfig);
    }
};
