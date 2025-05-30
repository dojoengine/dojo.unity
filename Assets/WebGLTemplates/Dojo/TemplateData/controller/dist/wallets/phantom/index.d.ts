import { WalletAdapter, ExternalWallet, ExternalWalletResponse, ExternalWalletType, ExternalPlatform } from '../types';
export declare class PhantomWallet implements WalletAdapter {
    readonly type: ExternalWalletType;
    readonly platform: ExternalPlatform;
    private account;
    private getProvider;
    isAvailable(): boolean;
    getInfo(): ExternalWallet;
    connect(): Promise<ExternalWalletResponse<any>>;
    signMessage(message: string): Promise<ExternalWalletResponse<any>>;
    sendTransaction(serailized_txn: Uint8Array): Promise<ExternalWalletResponse<any>>;
    switchChain(_chainId: string): Promise<boolean>;
    getBalance(_tokenAddress?: string): Promise<ExternalWalletResponse<any>>;
}
