/**
 * @author WMXPY
 * @namespace Config_Declare
 * @description V1
 */

export enum ServerlessConfigFunctionTypeVersion1 {

    AWS_LAMBDA = 'aws_lambda',
}

export type ServerlessConfigFunctionVersion1 = {

    readonly name: string;

    readonly entryPath: string;
    readonly outputPath?: string;
} & {

    readonly type: ServerlessConfigFunctionTypeVersion1.AWS_LAMBDA;

    readonly functionName: string;
};

export type ServerlessConfigVersion1 = {

    readonly version: 1;

    readonly functions: ServerlessConfigFunctionVersion1[];
};
