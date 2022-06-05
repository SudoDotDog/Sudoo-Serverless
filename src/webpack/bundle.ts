/**
 * @author WMXPY
 * @namespace Serverless_Webpack
 * @description Bundle
 */

import * as Webpack from "webpack";
import { WebpackConfigOptions } from "./config/declare";
import { createProductionConfig } from "./config/production";

export const bundleProductionWithWebpack = (options: WebpackConfigOptions): Promise<void> => {

    const compiler: Webpack.Compiler = Webpack(createProductionConfig(options));

    return new Promise((
        resolve: () => void,
        reject: (reason: any) => void,
    ) => {

        compiler.run((err: Error, stats: Webpack.Stats) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
