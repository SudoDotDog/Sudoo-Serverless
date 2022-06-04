/**
 * @author WMXPY
 * @namespace Util
 * @description Make Directory
 */

import * as Path from "path";
import * as Fs from "fs";

export const splitNestedPath = (path: string): string[] => {

    const fixedPath = Path.resolve(path);
    const directoryPath = Path.dirname(fixedPath);

    const splitedPath = directoryPath.split(Path.sep).filter((value: string): boolean => {
        return value !== '';
    });

    const stepPaths: string[] = [];
    for (let i = 0; i < splitedPath.length; i++) {
        stepPaths.push(Path.join(...splitedPath.slice(0, i + 1)));
    }

    return stepPaths;
};

export const makeNestedDirectory = (path: string): Promise<void> => {

    return new Promise((
        resolve: () => void,
        reject: (reason: any) => void,
    ) => {

        const stepPaths: string[] = splitNestedPath(path);

        for (const stepPath of stepPaths) {
            if (!Fs.existsSync(stepPath)) {
                Fs.mkdirSync(stepPath);
            }
        }
    });
};
