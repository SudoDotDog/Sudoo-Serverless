/**
 * @author WMXPY
 * @namespace Recipe_Compress
 * @description Compress Target
 */

import * as Path from "path";
import { ServerlessConfigFunctionTypeVersion1, ServerlessConfigFunctionVersion1 } from "../../config/declare/v1";
import { ExecuteOption } from "../../declare";
import { logInfo } from "../../util/log";
import { fixOutputPath } from "../../util/output-path";
import { zipOutput } from "../../zip/zip";

export const compressTarget = async (
    options: ExecuteOption,
    base: string,
    target: ServerlessConfigFunctionVersion1,
): Promise<void> => {

    const outputPath: string = fixOutputPath(base, target.outputPath);

    const outputFilePath: string = Path.join(outputPath, 'index.js');
    const outputZipPath: string = Path.join(outputPath, target.name + '.zip');

    logInfo(`Output Path: ${outputPath}`);
    logInfo(`Output File Path: ${outputFilePath}`);

    switch (target.type) {
        case ServerlessConfigFunctionTypeVersion1.AWS_LAMBDA: {

            await zipOutput({
                sourceFilePath: outputFilePath,
                targetFilePath: outputZipPath,
            });
        }
    }
};
