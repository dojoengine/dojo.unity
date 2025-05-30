import { Policy } from "@cartridge/presets";
import { AddStarknetChainParameters } from "@starknet-io/types-js";
import { WalletAccount } from "starknet";
import BaseProvider from "./provider";
import { ControllerOptions, ProfileContextTypeVariant } from "./types";
export default class ControllerProvider extends BaseProvider {
    private keychain?;
    private profile?;
    private options;
    private iframes;
    private selectedChain;
    private chains;
    constructor(options: ControllerOptions);
    probe(): Promise<WalletAccount | undefined>;
    connect(): Promise<WalletAccount | undefined>;
    switchStarknetChain(chainId: string): Promise<boolean>;
    addStarknetChain(_chain: AddStarknetChainParameters): Promise<boolean>;
    disconnect(): Promise<void>;
    openProfile(tab?: ProfileContextTypeVariant): Promise<void>;
    openProfileTo(to: string): Promise<void>;
    openProfileAt(at: string): Promise<void>;
    openSettings(): Promise<boolean | null>;
    revoke(origin: string, _policy: Policy[]): Promise<void> | null;
    rpcUrl(): string;
    username(): Promise<string> | undefined;
    openPurchaseCredits(): void;
    openStarterPack(starterpackId: string): void;
    openExecute(calls: any, chainId?: string): Promise<{
        status: boolean;
        transactionHash: string;
    } | undefined>;
    delegateAccount(): Promise<string | null>;
    private validateChains;
    private waitForKeychain;
}
