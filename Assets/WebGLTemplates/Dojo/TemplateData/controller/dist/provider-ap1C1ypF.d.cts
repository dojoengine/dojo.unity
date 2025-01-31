import { constants, BigNumberish, Call, Abi, InvocationsDetails, WalletAccount } from 'starknet';
import { AddInvokeTransactionResult, TypedData, Signature, ChainId, StarknetWindowObject, WalletEvents, RequestFn, WalletEventListener, AddStarknetChainParameters } from '@starknet-io/types-js';
import { Policy, SessionPolicies } from '@cartridge/presets';
import { AsyncMethodReturns } from '@cartridge/penpal';

type IFrameOptions$1<CallSender> = Omit<ConstructorParameters<typeof IFrame>[0], "id" | "url" | "onConnect"> & {
    url?: string;
    onConnect: (child: AsyncMethodReturns<CallSender>) => void;
};
declare class IFrame<CallSender extends {}> implements Modal {
    url?: URL;
    private iframe?;
    private container?;
    private onClose?;
    constructor({ id, url, preset, onClose, onConnect, methods, }: Pick<ControllerOptions, "preset"> & {
        id: string;
        url: URL;
        onClose?: () => void;
        onConnect: (child: AsyncMethodReturns<CallSender>) => void;
        methods?: {
            [key: string]: (...args: any[]) => void;
        };
    });
    open(): void;
    close(): void;
    sendBackward(): void;
    sendForward(): void;
    private resize;
}

type KeychainIframeOptions = IFrameOptions$1<Keychain> & KeychainOptions;
declare class KeychainIFrame extends IFrame<Keychain> {
    constructor({ url, policies, ...iframeOptions }: KeychainIframeOptions);
}

type ProfileIFrameOptions = IFrameOptions$1<Profile> & ProfileOptions & {
    rpcUrl: string;
    version?: string;
    username: string;
    slot?: string;
    namespace?: string;
};
declare class ProfileIFrame extends IFrame<Profile> {
    constructor({ profileUrl, rpcUrl, version, username, slot, namespace, tokens, ...iframeOptions }: ProfileIFrameOptions);
}

type Session = {
    chainId: constants.StarknetChainId;
    policies: Policy[];
    maxFee: BigNumberish;
    expiresAt: bigint;
    credentials: {
        authorization: string[];
        privateKey: string;
    };
};
declare enum ResponseCodes {
    SUCCESS = "SUCCESS",
    NOT_CONNECTED = "NOT_CONNECTED",
    ERROR = "ERROR",
    CANCELED = "CANCELED",
    USER_INTERACTION_REQUIRED = "USER_INTERACTION_REQUIRED"
}
type ConnectError = {
    code: ResponseCodes;
    message: string;
    error?: ControllerError;
};
type ControllerError = {
    code: Number;
    message: string;
    data?: any;
};
type ConnectReply = {
    code: ResponseCodes.SUCCESS;
    address: string;
    policies?: SessionPolicies;
};
type ExecuteReply = (AddInvokeTransactionResult & {
    code: ResponseCodes.SUCCESS;
}) | {
    code: ResponseCodes.USER_INTERACTION_REQUIRED;
};
type ProbeReply = {
    code: ResponseCodes.SUCCESS;
    address: string;
    rpcUrl?: string;
};
type DeployReply = {
    code: ResponseCodes.SUCCESS;
    transaction_hash: string;
};
type IFrames = {
    keychain: KeychainIFrame;
    profile?: ProfileIFrame;
    version?: number;
};
interface LookupRequest {
    usernames?: string[];
    addresses?: string[];
}
interface LookupResult {
    username: string;
    addresses: string[];
}
interface LookupResponse {
    results: LookupResult[];
}
type ContractAddress = string;
type CartridgeID = string;
type ControllerAccounts = Record<ContractAddress, CartridgeID>;
interface Keychain {
    probe(rpcUrl: string): Promise<ProbeReply | ConnectError>;
    connect(policies: SessionPolicies, rpcUrl: string): Promise<ConnectReply | ConnectError>;
    disconnect(): void;
    reset(): void;
    revoke(origin: string): void;
    deploy(): Promise<DeployReply | ConnectError>;
    execute(calls: Call | Call[], abis?: Abi[], transactionsDetail?: InvocationsDetails, sync?: boolean, paymaster?: any, error?: ControllerError): Promise<ExecuteReply | ConnectError>;
    signMessage(typedData: TypedData, account: string, async?: boolean): Promise<Signature | ConnectError>;
    logout(): Promise<void>;
    openSettings(): Promise<void | ConnectError>;
    session(): Promise<Session>;
    sessions(): Promise<{
        [key: string]: Session;
    }>;
    delegateAccount(): string;
    username(): string;
    openPurchaseCredits(): void;
    openExecute(calls: Call[]): Promise<void>;
    switchChain(rpcUrl: string): Promise<void>;
}
interface Profile {
    navigate(path: string): void;
}
interface Modal {
    open: () => void;
    close: () => void;
}
/**
 * Options for configuring the controller
 */
type ControllerOptions = ProviderOptions & KeychainOptions & ProfileOptions;
type IFrameOptions = {
    /** The ID of the starter pack to use */
    starterPackId?: string;
    /** The preset to use */
    preset?: string;
};
type Chain = {
    rpcUrl: string;
};
type ProviderOptions = {
    defaultChainId: ChainId;
    chains: Chain[];
};
type KeychainOptions = IFrameOptions & {
    policies?: SessionPolicies;
    /** The URL of keychain */
    url?: string;
    /** The origin of keychain */
    origin?: string;
    /** Propagate transaction errors back to caller instead of showing modal */
    propagateSessionErrors?: boolean;
};
type ProfileOptions = IFrameOptions & {
    /** The URL of profile. Mainly for internal development purpose */
    profileUrl?: string;
    /** The project name of Slot instance. */
    slot?: string;
    /** The namespace to use to fetch trophies data from indexer. Will be mandatory once profile page is in production */
    namespace?: string;
    /** The tokens to be listed on Inventory modal */
    tokens?: Tokens;
};
type ProfileContextTypeVariant = "inventory" | "trophies" | "achievements" | "activity";
type Tokens = {
    erc20?: string[];
};

declare abstract class BaseProvider implements StarknetWindowObject {
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

export { BaseProvider as B, type ConnectError as C, type DeployReply as D, type ExecuteReply as E, type IFrames as I, type Keychain as K, type LookupRequest as L, type Modal as M, type ProbeReply as P, ResponseCodes as R, type Session as S, type Tokens as T, type ControllerError as a, type ConnectReply as b, type LookupResult as c, type LookupResponse as d, type ControllerAccounts as e, type Profile as f, type ControllerOptions as g, type IFrameOptions as h, type Chain as i, type ProviderOptions as j, type KeychainOptions as k, type ProfileOptions as l, type ProfileContextTypeVariant as m };
