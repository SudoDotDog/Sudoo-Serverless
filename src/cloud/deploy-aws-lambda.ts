/**
 * @author WMXPY
 * @namespace Serverless_Cloud
 * @description Deploy AWS Lambda
 */

import * as ChildProcess from "child_process";
import * as Path from "path";
import { ServerlessConfigFunctionTypeVersion1, ServerlessConfigFunctionVersion1 } from "../config/declare/v1";
import { ExecuteOption } from "../declare";
import { logInfo } from "../util/log";
import { fixOutputPath } from "../util/output-path";

export const deployAWSLambda = (
    options: ExecuteOption,
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
        const outputZipPath: string = Path.join(outputPath, 'compressed.zip');

        const commandArgs = [
            'lambda',
            'update-function-code',
            '--function-name',
            target.functionName,
            '--no-cli-pager',
            '--zip-file',
            `fileb://${outputZipPath}`,
        ];

        if (options.dryRun) {
            logInfo(`Dry Run Enabled, Skip Deploy Target ${target.name}`);

            const command = `aws ${commandArgs.join(' ')}`;
            logInfo(`Command: ${command}`);

            resolve();
            return;
        }

        const awsProcess = ChildProcess.spawn('aws', commandArgs);

        awsProcess.on('close', (code: number) => {

            if (code !== 0) {
                reject(new Error(`Failed to deploy target ${target.name}`));
            }
            resolve();
        });
    });
};
