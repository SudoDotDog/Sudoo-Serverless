/**
 * @author WMXPY
 * @namespace Util
 * @description Output Path
 */

import * as Path from "path";

export const fixOutputPath = (base: string, outputPath?: string): string => {

    if (typeof outputPath === 'string') {

        return outputPath;
    }

    const tempPath: string = Path.resolve(`~/.sudoo-serverless/output`);
    return tempPath;
};
