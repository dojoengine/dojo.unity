import { WalletAdapter, ExternalWallet, ExternalWalletResponse, ExternalWalletType, ExternalPlatform } from '../types';
export declare class MetaMaskWallet implements WalletAdapter {
    readonly type: ExternalWalletType;
    readonly platform: ExternalPlatform;
    private MMSDK;
    private account;
    constructor();
    isAvailable(): boolean;
    getInfo(): ExternalWallet;
    connect(): Promise<ExternalWalletResponse<any>>;
    signTransaction(transaction: any): Promise<ExternalWalletResponse<any>>;
    signMessage(message: string): Promise<ExternalWalletResponse<any>>;
    signTypedData(data: any): Promise<ExternalWalletResponse<any>>;
    sendTransaction(_txn: any): Promise<ExternalWalletResponse<any>>;
    switchChain(chainId: string): Promise<boolean>;
    getBalance(tokenAddress?: string): Promise<ExternalWalletResponse<any>>;
}
