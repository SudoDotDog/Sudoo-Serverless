/**
 * @author WMXPY
 * @namespace Util
 * @description Entry Path
 */

import * as Path from "path";

export const fixEntryPath = (base: string, entryPath: string): string => {

    if (Path.isAbsolute(entryPath)) {
        return entryPath;
    }
    return Path.resolve(base, entryPath);
};
