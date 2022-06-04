/**
 * @author WMXPY
 * @namespace Serverless_Webpack
 * @description Production
 */

import * as Path from "path";
import * as Webpack from 'webpack';
import { WebpackConfigOptions } from './declare';

export const createProductionConfig = (options: WebpackConfigOptions): Webpack.Configuration => {

    return {
        entry: [
            Path.resolve(options.sourceFilePath),
        ],
        output: {
            path: Path.resolve(options.targetFolderPath),
            filename: 'index.js',
            libraryTarget: 'umd',
        },
        target: 'node',
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    };
};
