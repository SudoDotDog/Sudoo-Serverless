/**
 * @author WMXPY
 * @namespace Config_Declare
 * @description V1
 */

export type ServerlessConfigFunctionVersion1 = {

    readonly entryPath: string;
    readonly outputPath?: string;

    readonly functionName: string;
};

export type ServerlessConfigVersion1 = {

    readonly version: 1;

    readonly functions: ServerlessConfigFunctionVersion1[];
};
