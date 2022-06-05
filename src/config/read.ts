/**
 * @author WMXPY
 * @namespace Config
 * @description Read
 */

import { isFile, pathExists, readTextFile } from "@sudoo/io";
import { parse } from "yaml";
import { ServerlessConfig } from "./declare";

export const readServerlessConfig = async (path: string): Promise<ServerlessConfig> => {

    const pathExist: boolean = await pathExists(path);

    if (!pathExist) {
        throw new Error(`Path ${path} does not exist`);
    }

    const isPathFile: boolean = await isFile(path);

    if (!isPathFile) {
        throw new Error(`Path ${path} is not a file`);
    }

    const rawConfig: string = await readTextFile(path);
    const config: ServerlessConfig = parse(rawConfig);

    return config;
};
