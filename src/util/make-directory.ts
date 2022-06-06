/**
 * @author WMXPY
 * @namespace Util
 * @description Make Directory
 */

import { attemptMarkDir } from "@sudoo/io";
import * as Path from "path";

export const splitNestedPath = (path: string): string[] => {

    const fixedPath = Path.resolve(path);
    const directoryPath = Path.dirname(fixedPath);

    const splitedPath = directoryPath.split(Path.sep).filter((value: string): boolean => {
        return value !== '';
    });

    const stepPaths: string[] = [];
    for (let i = 0; i < splitedPath.length; i++) {
        stepPaths.push(Path.join(
            '/',
            ...splitedPath.slice(0, i + 1),
        ));
    }
    return stepPaths;
};

export const makeNestedDirectory = async (path: string): Promise<void> => {

    const stepPaths: string[] = splitNestedPath(path);

    for (const stepPath of stepPaths) {
        await attemptMarkDir(stepPath);
    }
    return;
};
