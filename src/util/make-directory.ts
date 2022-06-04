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

const makeDirectory = (path: string): Promise<void> => {

    return new Promise((
        resolve: () => void,
        reject: (reason: any) => void,
    ) => {

        Fs.stat(path, (error: Error, stats: Fs.Stats) => {

            if (error) {
                reject(error);
                return;
            }

            if (stats.isDirectory()) {
                resolve();
                return;
            }

            Fs.mkdir(path, (error: Error) => {

                if (error) {
                    reject(error);
                    return;
                }
                resolve();
                return;
            });
        });
    });
};

export const makeNestedDirectory = async (path: string): Promise<void> => {

    const stepPaths: string[] = splitNestedPath(path);

    for (const stepPath of stepPaths) {
        await makeDirectory(stepPath);
    }

    return;
};
