/**
 * @author WMXPY
 * @namespace Util
 * @description Entry Path
 */

import * as Path from "path";

export const fixEntryPath = (base: string, entryPath: string): string => {

    const tempPath: string = Path.resolve(`~/.sudoo-serverless/output`);
    return tempPath;
};
