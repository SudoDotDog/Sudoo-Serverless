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
        'first',
        '--config',
        'config.yaml',
    ], __dirname);
})();
