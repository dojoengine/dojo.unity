export * from "./types";
export { defaultPresets } from "./presets";
import { AccountInterface } from "starknet";
import { AsyncMethodReturns } from "@cartridge/penpal";
import { Keychain, Policy, ControllerOptions } from "./types";
declare class Controller {
    private url;
    private policies;
    private paymaster?;
    private connection?;
    private modal?;
    keychain?: AsyncMethodReturns<Keychain>;
    rpc: URL;
    account?: AccountInterface;
    constructor(policies?: Policy[], options?: ControllerOptions);
    private initModal;
    private setTheme;
    private setColorMode;
    ready(): Promise<boolean>;
    probe(): Promise<true | null | undefined>;
    connect(): Promise<AccountInterface | undefined>;
    disconnect(): Promise<void>;
    revoke(origin: string, _policy: Policy[]): Promise<void> | null;
    username(): Promise<string> | undefined;
    delegateAccount(): Promise<import("starknet").CallContractResponse | null>;
}
export * from "./types";
export * from "./errors";
export default Controller;
