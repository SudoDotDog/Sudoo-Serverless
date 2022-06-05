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
        '--config',
        'config.yaml',
        'bundle',
        'first',
    ], __dirname);
})();
