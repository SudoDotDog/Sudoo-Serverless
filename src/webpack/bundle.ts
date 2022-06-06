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

        compiler.run((err: Error | null | undefined, stats: Webpack.Stats | undefined) => {
            if (err) {
                reject(err);
            } else {

                if (typeof stats === 'undefined') {
                    reject(new Error('Stats is undefined'));
                    return;
                }

                if (stats.hasErrors()) {
                    reject(new Error('Webpack compile has errors'));
                    console.log(stats.compilation.errors);
                    return;
                }
                resolve();
            }
        });
    });
};
