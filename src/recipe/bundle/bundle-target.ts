/**
 * @author WMXPY
 * @namespace Recipe_Bundle
 * @description Bundle Target
 */

import { ServerlessConfigFunctionTypeVersion1, ServerlessConfigFunctionVersion1 } from "../../config/declare/v1";
import { ExecuteOption } from "../../declare";
import { fixEntryPath } from "../../util/entry-path";
import { logInfo } from "../../util/log";
import { fixOutputPath } from "../../util/output-path";
import { bundleProductionWithWebpack } from "../../webpack/bundle";

export const bundleTarget = async (
    options: ExecuteOption,
    base: string,
    target: ServerlessConfigFunctionVersion1,
): Promise<void> => {

    const entryPath: string = fixEntryPath(base, target.entryPath);
    const outputPath: string = fixOutputPath(base, target.outputPath);

    logInfo(`Entry Path: ${entryPath}`);
    logInfo(`Output Path: ${outputPath}`);

    switch (target.type) {
        case ServerlessConfigFunctionTypeVersion1.AWS_LAMBDA: {

            await bundleProductionWithWebpack({

                sourceFilePath: entryPath,
                targetFolderPath: outputPath,
            });
        }
    }
};
