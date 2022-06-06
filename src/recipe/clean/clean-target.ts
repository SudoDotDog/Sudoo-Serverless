/**
 * @author WMXPY
 * @namespace Recipe_Clean
 * @description Clean Target
 */

import { RMRFFolder } from "@sudoo/io";
import { ServerlessConfigFunctionVersion1 } from "../../config/declare/v1";
import { ExecuteOption } from "../../declare";
import { logInfo } from "../../util/log";
import { fixOutputPath } from "../../util/output-path";

export const cleanTarget = async (
    options: ExecuteOption,
    base: string,
    target: ServerlessConfigFunctionVersion1,
): Promise<void> => {

    const outputPath: string = fixOutputPath(base, target.outputPath);

    logInfo(`Cleaning Path: ${outputPath}`);

    await RMRFFolder(outputPath);
};
