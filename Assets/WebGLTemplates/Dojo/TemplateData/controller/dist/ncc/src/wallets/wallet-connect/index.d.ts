import Provider from "@walletconnect/ethereum-provider";
import { ExternalPlatform, ExternalWallet, ExternalWalletResponse, ExternalWalletType, WalletAdapter } from "../types";
export declare class WalletConnectWallet implements WalletAdapter {
    private provider;
    readonly type: ExternalWalletType;
    readonly platform: ExternalPlatform;
    private account;
    constructor(provider: Provider, address?: string);
    getConnectedAccounts(): string[];
    isAvailable(): boolean;
    getInfo(): ExternalWallet;
    connect(): Promise<ExternalWalletResponse<any>>;
    signTransaction(transaction: any): Promise<ExternalWalletResponse<any>>;
    signMessage(message: `0x${string}`): Promise<ExternalWalletResponse<any>>;
    signTypedData(data: any): Promise<ExternalWalletResponse<any>>;
    sendTransaction(_txn: any): Promise<ExternalWalletResponse<any>>;
    switchChain(chainId: string): Promise<boolean>;
    getBalance(tokenAddress?: string): Promise<ExternalWalletResponse<any>>;
}
