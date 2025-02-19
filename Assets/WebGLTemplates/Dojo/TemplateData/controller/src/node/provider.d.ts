import { WalletAccount } from "starknet";
import { SessionPolicies } from "@cartridge/presets";
import { AddStarknetChainParameters } from "@starknet-io/types-js";
import BaseProvider from "../provider";
import { ParsedSessionPolicies } from "../policies";
import { NodeBackend } from "./backend";
export type SessionOptions = {
    rpc: string;
    chainId: string;
    policies: SessionPolicies;
    basePath: string;
    keychainUrl?: string;
};
export default class SessionProvider extends BaseProvider {
    id: string;
    name: string;
    protected _chainId: string;
    protected _rpcUrl: string;
    protected _username?: string;
    protected _policies: ParsedSessionPolicies;
    protected _keychainUrl: string;
    protected _backend: NodeBackend;
    constructor({ rpc, chainId, policies, basePath, keychainUrl, }: SessionOptions);
    username(): Promise<any>;
    probe(): Promise<WalletAccount | undefined>;
    connect(): Promise<WalletAccount | undefined>;
    disconnect(): Promise<void>;
    switchStarknetChain(_chainId: string): Promise<boolean>;
    addStarknetChain(_chain: AddStarknetChainParameters): Promise<boolean>;
}
