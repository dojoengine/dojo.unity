import { WalletAdapter, ExternalWallet, ExternalWalletResponse, ExternalWalletType, ExternalPlatform } from '../types';
import { TypedData } from '@starknet-io/types-js';
export declare class ArgentWallet implements WalletAdapter {
    readonly type: ExternalWalletType;
    readonly platform: ExternalPlatform;
    private wallet;
    private account;
    isAvailable(): boolean;
    getInfo(): ExternalWallet;
    connect(): Promise<ExternalWalletResponse<any>>;
    signTypedData(data: TypedData): Promise<ExternalWalletResponse<any>>;
    sendTransaction(_txn: any): Promise<ExternalWalletResponse<any>>;
    switchChain(_chainId: string): Promise<boolean>;
    getBalance(_tokenAddress?: string): Promise<ExternalWalletResponse<any>>;
}
