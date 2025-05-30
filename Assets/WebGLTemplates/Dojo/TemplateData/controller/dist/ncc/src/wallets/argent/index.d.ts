import { TypedData } from "@starknet-io/types-js";
import { ExternalPlatform, ExternalWallet, ExternalWalletResponse, ExternalWalletType, WalletAdapter } from "../types";
export declare class ArgentWallet implements WalletAdapter {
    readonly type: ExternalWalletType;
    readonly platform: ExternalPlatform;
    private wallet;
    private account;
    private connectedAccounts;
    isAvailable(): boolean;
    getInfo(): ExternalWallet;
    connect(): Promise<ExternalWalletResponse<any>>;
    getConnectedAccounts(): string[];
    signTypedData(data: TypedData): Promise<ExternalWalletResponse<any>>;
    sendTransaction(_txn: any): Promise<ExternalWalletResponse<any>>;
    switchChain(_chainId: string): Promise<boolean>;
    getBalance(_tokenAddress?: string): Promise<ExternalWalletResponse<any>>;
}
