import { WalletAccount } from 'starknet';
import { SessionPolicies } from '@cartridge/presets';
import { AddStarknetChainParameters } from '@starknet-io/types-js';
import { B as BaseProvider } from '../provider-ap1C1ypF.cjs';
export { i as Chain, C as ConnectError, b as ConnectReply, e as ControllerAccounts, a as ControllerError, g as ControllerOptions, D as DeployReply, E as ExecuteReply, h as IFrameOptions, I as IFrames, K as Keychain, k as KeychainOptions, L as LookupRequest, d as LookupResponse, c as LookupResult, M as Modal, P as ProbeReply, f as Profile, m as ProfileContextTypeVariant, l as ProfileOptions, j as ProviderOptions, R as ResponseCodes, S as Session, T as Tokens } from '../provider-ap1C1ypF.cjs';
import { P as ParsedSessionPolicies } from '../policies-DD1aPjQ4.cjs';
export { N as NotReadyToConnect } from '../policies-DD1aPjQ4.cjs';
import '@cartridge/penpal';

/**
 * Implements a file system backend.
 * This is designed for Node.js environments to store session data on the filesystem.
 */
declare class NodeBackend {
    private basePath;
    private sessionFile;
    private data;
    private callbackServer?;
    constructor(basePath: string);
    private ensureDirectoryExists;
    private loadData;
    private saveData;
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
    getRedirectUri(): Promise<string>;
    waitForCallback(): Promise<string | null>;
    openLink(url: string): void;
}

type SessionOptions = {
    rpc: string;
    chainId: string;
    policies: SessionPolicies;
    basePath: string;
    keychainUrl?: string;
};
declare class SessionProvider extends BaseProvider {
    id: string;
    name: string;
    protected _chainId: string;
    protected _rpcUrl: string;
    protected _username?: string;
    protected _policies: ParsedSessionPolicies;
    protected _keychainUrl: string;
    protected _backend: NodeBackend;
    constructor({ rpc, chainId, policies, basePath, keychainUrl, }: SessionOptions);
    username(): Promise<any>;
    probe(): Promise<WalletAccount | undefined>;
    connect(): Promise<WalletAccount | undefined>;
    disconnect(): Promise<void>;
    switchStarknetChain(_chainId: string): Promise<boolean>;
    addStarknetChain(_chain: AddStarknetChainParameters): Promise<boolean>;
}

export { type SessionOptions, SessionProvider as default };
