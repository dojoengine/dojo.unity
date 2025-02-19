import { WalletAccount } from "starknet";
import BaseProvider from "../provider";
import { SessionPolicies } from "@cartridge/presets";
import { AddStarknetChainParameters } from "@starknet-io/types-js";
import { ParsedSessionPolicies } from "../policies";
export default class TelegramProvider extends BaseProvider {
    private _tmaUrl;
    protected _chainId: string;
    protected _username?: string;
    protected _policies: ParsedSessionPolicies;
    private _rpcUrl;
    constructor({ rpc, chainId, policies, tmaUrl, }: {
        rpc: string;
        chainId: string;
        policies: SessionPolicies;
        tmaUrl: string;
    });
    probe(): Promise<WalletAccount | undefined>;
    connect(): Promise<WalletAccount | undefined>;
    switchStarknetChain(_chainId: string): Promise<boolean>;
    addStarknetChain(_chain: AddStarknetChainParameters): Promise<boolean>;
    disconnect(): Promise<void>;
    tryRetrieveFromQueryOrStorage(): Promise<WalletAccount | undefined>;
}
