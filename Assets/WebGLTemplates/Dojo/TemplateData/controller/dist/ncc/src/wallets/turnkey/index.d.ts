import { TurnkeyIframeClient } from "@turnkey/sdk-browser";
import { ExternalPlatform, ExternalWallet, ExternalWalletResponse, ExternalWalletType, WalletAdapter } from "../types";
export declare class TurnkeyWallet implements WalletAdapter {
    private turnkeyIframeClient;
    readonly type: ExternalWalletType;
    readonly platform: ExternalPlatform;
    private account;
    private organizationId;
    constructor(turnkeyIframeClient: TurnkeyIframeClient, address?: string, organizationId?: string);
    isAvailable(): boolean;
    getInfo(): ExternalWallet;
    connect(): Promise<ExternalWalletResponse<any>>;
    getConnectedAccounts(): string[];
    signTransaction(transaction: any): Promise<ExternalWalletResponse<any>>;
    signMessage(message: string): Promise<ExternalWalletResponse<any>>;
    signTypedData(data: any): Promise<ExternalWalletResponse<any>>;
    sendTransaction(_txn: any): Promise<ExternalWalletResponse<any>>;
    switchChain(_chainId: string): Promise<boolean>;
    getBalance(tokenAddress?: string): Promise<ExternalWalletResponse<any>>;
}
