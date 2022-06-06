/**
 * @author WMXPY
 * @namespace Config
 * @description Read
 */

import { isFile, pathExists, readTextFile } from "@sudoo/io";
import { parse } from "yaml";
import { logInfo } from "../util/log";
import { ServerlessConfig } from "./declare";

const serverlessConfigCache: Record<string, ServerlessConfig> = {};

export const readServerlessConfig = async (path: string): Promise<ServerlessConfig> => {

    if (typeof serverlessConfigCache[path] !== 'undefined') {
        return serverlessConfigCache[path];
    }

    logInfo(`Reading Serverless Config: ${path}`);

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

    serverlessConfigCache[path] = config;
    logInfo(`Serverless Config Cached: ${path}`);

    return config;
};
