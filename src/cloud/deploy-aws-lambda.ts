/**
 * @author WMXPY
 * @namespace Serverless_Cloud
 * @description Deploy AWS Lambda
 */

import * as ChildProcess from "child_process";
import { ServerlessConfigFunctionTypeVersion1, ServerlessConfigFunctionVersion1 } from "../config/declare/v1";
import { ExecuteOption } from "../declare";
import { fixOutputPath } from "../util/output-path";

export const deployAWSLambda = (
    option: ExecuteOption,
    base: string,
    target: ServerlessConfigFunctionVersion1,
): Promise<void> => {

    if (target.type !== ServerlessConfigFunctionTypeVersion1.AWS_LAMBDA) {
        throw new Error(`Target ${target.name} is not AWS Lambda`);
    }

    return new Promise((
        resolve: () => void,
        reject: (reason: any) => void,
    ) => {

        const outputPath: string = fixOutputPath(base, target.outputPath);

        const awsProcess = ChildProcess.spawn('aws', [
            'lambda',
            'update-function-code',
            '--function-name',
            target.functionName,
            '--no-cli-pager',
            '--zip-file',
            `fileb://${outputPath}`,
        ]);

        awsProcess.on('close', (code: number) => {

            if (code !== 0) {
                throw new Error(`Failed to deploy AWS Lambda: ${target.functionName}`);
            }
            resolve();
        });
    });
};
