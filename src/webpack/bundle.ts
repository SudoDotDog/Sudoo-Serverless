/**
 * @author WMXPY
 * @namespace Serverless_Webpack
 * @description Bundle
 */

import Webpack from "webpack";
import { WebpackConfigOptions } from "./config/declare";
import { createProductionConfig } from "./config/production";

export const bundleProductionWithWebpack = (options: WebpackConfigOptions): Promise<void> => {

    const compiler: Webpack.Compiler = Webpack(createProductionConfig(options));

    return new Promise((
        resolve: () => void,
        reject: (reason: any) => void,
    ) => {

        console.log(123);

        compiler.run((err: Error | null | undefined, stats: Webpack.Stats | undefined) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
