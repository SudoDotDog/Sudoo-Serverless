/**
 * @author WMXPY
 * @namespace Recipe_Deploy
 * @description Deploy Target
 */

import { deployAWSLambda } from "../../cloud/deploy-aws-lambda";
import { ServerlessConfigFunctionVersion1 } from "../../config/declare/v1";
import { ExecuteOption } from "../../declare";
import { logInfo } from "../../util/log";

export const deployTarget = async (
    options: ExecuteOption,
    base: string,
    target: ServerlessConfigFunctionVersion1,
): Promise<void> => {

    logInfo(`Deploy Target: ${target.name}`);

    await deployAWSLambda(options, base, target);
};
