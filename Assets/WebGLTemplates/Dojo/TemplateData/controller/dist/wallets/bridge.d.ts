import { ExternalWallet, ExternalWalletResponse, ExternalWalletType } from './types';
export declare class WalletBridge {
    private readonly walletAdapters;
    private readonly connectedWalletsByType;
    private readonly connectedWalletsByAddress;
    constructor();
    getIFrameMethods(): {
        externalDetectWallets: (_origin: string) => () => Promise<ExternalWallet[]>;
        externalConnectWallet: (_origin: string) => (type: ExternalWalletType) => Promise<ExternalWalletResponse<unknown>>;
        externalSignMessage: (_origin: string) => (identifier: ExternalWalletType | string, message: string) => Promise<ExternalWalletResponse<unknown>>;
        externalSignTypedData: (_origin: string) => (identifier: ExternalWalletType | string, data: any) => Promise<ExternalWalletResponse<unknown>>;
        externalSendTransaction: (_origin: string) => (identifier: ExternalWalletType | string, txn: any) => Promise<ExternalWalletResponse<unknown>>;
        externalGetBalance: (_origin: string) => (identifier: ExternalWalletType | string, tokenAddress?: string) => Promise<ExternalWalletResponse<unknown>>;
    };
    detectWallets(): Promise<ExternalWallet[]>;
    private getWalletAdapterByType;
    private handleError;
    connectWallet(type: ExternalWalletType): Promise<ExternalWalletResponse>;
    private getConnectedWalletAdapter;
    signMessage(identifier: ExternalWalletType | string, message: string): Promise<ExternalWalletResponse>;
    signTypedData(identifier: ExternalWalletType | string, data: any): Promise<ExternalWalletResponse>;
    sendTransaction(identifier: ExternalWalletType | string, txn: any): Promise<ExternalWalletResponse>;
    getBalance(identifier: ExternalWalletType | string, tokenAddress?: string): Promise<ExternalWalletResponse>;
}
declare global {
    interface Window {
        ethereum?: any;
        solana?: any;
        starknet_argentX?: any;
        wallet_bridge?: WalletBridge;
    }
}
export type { ExternalWallet, ExternalWalletResponse, ExternalWalletType, WalletAdapter, } from './types';
