import { ExternalPlatform, ExternalWallet, ExternalWalletResponse, ExternalWalletType, WalletAdapter } from '../types';
export declare class RabbyWallet implements WalletAdapter {
    readonly type: ExternalWalletType;
    readonly platform: ExternalPlatform;
    private account;
    private store;
    private provider;
    constructor();
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
