import { B as BaseProvider, g as ControllerOptions, m as ProfileContextTypeVariant } from './provider-ap1C1ypF.cjs';
import { WalletAccount } from 'starknet';
import { Policy } from '@cartridge/presets';
import { AddStarknetChainParameters } from '@starknet-io/types-js';
import '@cartridge/penpal';

declare class ControllerProvider extends BaseProvider {
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
    openExecute(calls: any, chainId?: string): Promise<boolean | undefined>;
    delegateAccount(): Promise<string | null>;
    private waitForKeychain;
}

export { ControllerProvider as default };
