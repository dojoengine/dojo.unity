import { WalletAccount } from "starknet";
import BaseProvider from "../provider";
import { SessionPolicies } from "@cartridge/presets";
import { AddStarknetChainParameters } from "@starknet-io/types-js";
import { ParsedSessionPolicies } from "../policies";
export type SessionOptions = {
    rpc: string;
    chainId: string;
    policies: SessionPolicies;
    redirectUrl: string;
    keychainUrl?: string;
};
export default class SessionProvider extends BaseProvider {
    id: string;
    name: string;
    protected _chainId: string;
    protected _rpcUrl: string;
    protected _username?: string;
    protected _redirectUrl: string;
    protected _policies: ParsedSessionPolicies;
    protected _keychainUrl: string;
    constructor({ rpc, chainId, policies, redirectUrl, keychainUrl, }: SessionOptions);
    private validatePoliciesSubset;
    username(): Promise<string | undefined>;
    probe(): Promise<WalletAccount | undefined>;
    connect(): Promise<WalletAccount | undefined>;
    switchStarknetChain(_chainId: string): Promise<boolean>;
    addStarknetChain(_chain: AddStarknetChainParameters): Promise<boolean>;
    disconnect(): Promise<void>;
    tryRetrieveFromQueryOrStorage(): Promise<WalletAccount | undefined>;
    private clearStoredSession;
}
