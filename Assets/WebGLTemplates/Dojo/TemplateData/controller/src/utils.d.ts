import { Call } from "starknet";
import wasm from "@cartridge/account-wasm/controller";
import { Policies, SessionPolicies } from "@cartridge/presets";
import { ChainId } from "@starknet-io/types-js";
import { ParsedSessionPolicies } from "./policies";
export declare function normalizeCalls(calls: Call | Call[]): {
    entrypoint: string;
    contractAddress: string;
    calldata: import("starknet").HexCalldata;
}[];
export declare function toSessionPolicies(policies: Policies): SessionPolicies;
export declare function toWasmPolicies(policies: ParsedSessionPolicies): wasm.Policy[];
export declare function toArray<T>(val: T | T[]): T[];
export declare function humanizeString(str: string): string;
export declare function parseChainId(url: URL): ChainId;
