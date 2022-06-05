/**
 * @author WMXPY
 * @namespace Example
 * @description Bundle
 */

import { execute } from "../../src/cli";

(async () => {

    await execute([
        'node',
        'path',
        'bundle',
        'config.yaml'
    ], __dirname);
})();
