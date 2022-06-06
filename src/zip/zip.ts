/**
 * @author WMXPY
 * @namespace Serverless_Zip
 * @description Zip
 */

import * as Archiver from "archiver";
import * as Fs from "fs";
import { logInfo } from "../util/log";
import { makeNestedDirectory } from "../util/make-directory";
import { ZipOutputOptions, ZipOutputResult } from "./declare";

const spawnZipOutput = (options: ZipOutputOptions): Promise<ZipOutputResult> => {

    return new Promise((
        resolve: (result: ZipOutputResult) => void,
        reject: (reason: any) => void,
    ) => {

        logInfo(`Creating Zip: ${options.targetFilePath}`);

        const writeStream: Fs.WriteStream = Fs.createWriteStream(options.targetFilePath);
        const archiver: Archiver.Archiver = Archiver('zip', {
            zlib: {
                level: 9,
            },
        });

        writeStream.on('close', () => {
            logInfo(`Compressed: ${options.targetFilePath}`);
            logInfo(`Compressed Size: ${archiver.pointer()}`);
            resolve({});
        });

        writeStream.on('end', () => {
            logInfo(`Compress Drained: ${options.targetFilePath}`);
            resolve({});
        });

        archiver.on('error', (error: any) => {
            reject(error);
        });

        archiver.pipe(writeStream);

        archiver.file(options.sourceFilePath, {
            name: 'index.js',
        });

        archiver.finalize();
    });
};

export const zipOutput = async (options: ZipOutputOptions): Promise<ZipOutputResult> => {

    await makeNestedDirectory(options.targetFilePath);

    return await spawnZipOutput(options);
};
