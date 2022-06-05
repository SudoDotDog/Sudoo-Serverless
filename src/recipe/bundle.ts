/**
 * @author WMXPY
 * @namespace Recipe
 * @description Bundle
 */

import { ServerlessConfig } from "../config/declare";
import { ServerlessConfigFunctionTypeVersion1, ServerlessConfigFunctionVersion1 } from "../config/declare/v1";
import { readServerlessConfig } from "../config/read";
import { ExecuteOption } from "../declare";

export const bundleRecipe = async (options: ExecuteOption, target: string): Promise<void> => {

    const config: ServerlessConfig = await readServerlessConfig(options.configPath);

    const targetFunction: ServerlessConfigFunctionVersion1[] = [];

    if (target === '--all') {
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

        switch (functionConfig.type) {
            case ServerlessConfigFunctionTypeVersion1.AWS_LAMBDA: {

            }
        }
    }
};
