/**
 * @author WMXPY
 * @namespace Recipe_Bundle
 * @description Bundle Target
 */

import { ServerlessConfigFunctionTypeVersion1, ServerlessConfigFunctionVersion1 } from "../../config/declare/v1";
import { ExecuteOption } from "../../declare";
import { fixOutputPath } from "../../util/output-path";
import { bundleProductionWithWebpack } from "../../webpack/bundle";

export const bundleTarget = async (options: ExecuteOption, target: ServerlessConfigFunctionVersion1): Promise<void> => {

    const outputPath: string = fixOutputPath(target.outputPath);

    switch (target.type) {
        case ServerlessConfigFunctionTypeVersion1.AWS_LAMBDA: {

            await bundleProductionWithWebpack({

                sourceFilePath: target.entryPath,
                targetFolderPath: outputPath,
            });
        }
    }
};
