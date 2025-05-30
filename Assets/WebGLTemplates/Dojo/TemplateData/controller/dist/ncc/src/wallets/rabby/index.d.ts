import { ExternalPlatform, ExternalWallet, ExternalWalletResponse, ExternalWalletType, WalletAdapter } from "../types";
export declare class RabbyWallet implements WalletAdapter {
    readonly type: ExternalWalletType;
    readonly platform: ExternalPlatform;
    private account;
    private store;
    private provider;
    private connectedAccounts;
    constructor();
    isAvailable(): boolean;
    getInfo(): ExternalWallet;
    connect(address?: string): Promise<ExternalWalletResponse<any>>;
    getConnectedAccounts(): string[];
    signTransaction(transaction: any): Promise<ExternalWalletResponse<any>>;
    signMessage(message: `0x${string}`): Promise<ExternalWalletResponse<any>>;
    signTypedData(data: any): Promise<ExternalWalletResponse<any>>;
    sendTransaction(_txn: any): Promise<ExternalWalletResponse<any>>;
    switchChain(chainId: string): Promise<boolean>;
    getBalance(tokenAddress?: string): Promise<ExternalWalletResponse<any>>;
}
