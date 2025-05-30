import { WalletAccount } from "starknet";
import { AddStarknetChainParameters, RequestFn, StarknetWindowObject, WalletEventListener, WalletEvents } from "@starknet-io/types-js";
export default abstract class BaseProvider implements StarknetWindowObject {
    id: string;
    name: string;
    version: string;
    icon: string;
    account?: WalletAccount;
    subscriptions: WalletEvents[];
    private _probePromise;
    protected safeProbe(): Promise<WalletAccount | undefined>;
    request: RequestFn;
    on: WalletEventListener;
    off: WalletEventListener;
    protected emitNetworkChanged(chainId: string): void;
    protected emitAccountsChanged(accounts: string[]): void;
    abstract probe(): Promise<WalletAccount | undefined>;
    abstract connect(): Promise<WalletAccount | undefined>;
    abstract switchStarknetChain(chainId: string): Promise<boolean>;
    abstract addStarknetChain(chain: AddStarknetChainParameters): Promise<boolean>;
}
