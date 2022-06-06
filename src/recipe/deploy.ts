/**
 * @author WMXPY
 * @namespace Recipe
 * @description Deploy
 */

import { ServerlessConfig } from "../config/declare";
import { ServerlessConfigFunctionVersion1 } from "../config/declare/v1";
import { readServerlessConfig } from "../config/read";
import { ExecuteOption } from "../declare";
import { logInfo } from "../util/log";
import { deployTarget } from "./deploy/deploy-target";

export const deployRecipe = async (
    options: ExecuteOption,
    base: string,
    target: string,
): Promise<void> => {

    const config: ServerlessConfig = await readServerlessConfig(options.configPath);

    const targetFunction: ServerlessConfigFunctionVersion1[] = [];

    if (target === '--all') {
        logInfo('Deploying All Functions');
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
        await deployTarget(options, base, functionConfig);
    }
};
