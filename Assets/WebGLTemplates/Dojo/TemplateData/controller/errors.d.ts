import { Policy } from "./types";
export declare class MissingPolicys extends Error {
    missing: Policy[];
    constructor(missing: Policy[]);
}
export declare class NotReadyToConnect extends Error {
    constructor();
}
