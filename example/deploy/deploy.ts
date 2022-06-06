/**
 * @author WMXPY
 * @namespace Example
 * @description Deploy
 */

import { execute } from "../../src/cli";

(async () => {

    await execute([
        'node',
        'path',
        '--config',
        'config.yaml',
        '--dry-run',
        'deploy',
        'first',
    ], __dirname);
})();
