/**
 * @author WMXPY
 * @namespace Config
 * @description Declare
 */

import { ServerlessConfigVersion1 } from "./declare/v1";

export type ServerlessConfig =
    | ServerlessConfigVersion1;
