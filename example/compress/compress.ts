/**
 * @author WMXPY
 * @namespace Example
 * @description Compress
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
        'compress',
        'first',
    ], __dirname);
})();
