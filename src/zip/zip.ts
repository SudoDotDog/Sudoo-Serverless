/**
 * @author WMXPY
 * @namespace Serverless_Zip
 * @description Zip
 */

import * as ChildProcess from "child_process";
import { ZipOutputOptions, ZipOutputResult } from "./declare";

export const zipOutput = (options: ZipOutputOptions): Promise<ZipOutputResult> => {

    return new Promise((
        resolve: (result: ZipOutputResult) => void,
        reject: (reason: any) => void,
    ) => {

        ChildProcess.spawn('zip', [
            '-r',
            '-j',
            options.targetFilePath,
            options.sourceFilePath,
        ]).on('close', (code: number) => {

            if (code === 0) {
                resolve({});
            } else {
                reject(code);
            }
        });
    });
};
