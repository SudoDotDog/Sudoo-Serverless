/**
 * @author WMXPY
 * @namespace Recipe_Bundle
 * @description Bundle Target
 */

import { ServerlessConfigFunctionTypeVersion1, ServerlessConfigFunctionVersion1 } from "../../config/declare/v1";
import { ExecuteOption } from "../../declare";
import { bundleProductionWithWebpack } from "../../webpack/bundle";

export const bundleTarget = async (options: ExecuteOption, target: ServerlessConfigFunctionVersion1): Promise<void> => {

    switch (target.type) {
        case ServerlessConfigFunctionTypeVersion1.AWS_LAMBDA: {

            await bundleProductionWithWebpack({

                sourceFilePath: target.entryPath,
                targetFolderPath: target.outputPath,
            });
        }
    }
};
