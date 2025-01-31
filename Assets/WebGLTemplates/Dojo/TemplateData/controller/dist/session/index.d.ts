import { WalletAccount } from 'starknet';
import { B as BaseProvider } from '../provider-ap1C1ypF.js';
export { i as Chain, C as ConnectError, b as ConnectReply, e as ControllerAccounts, a as ControllerError, g as ControllerOptions, D as DeployReply, E as ExecuteReply, h as IFrameOptions, I as IFrames, K as Keychain, k as KeychainOptions, L as LookupRequest, d as LookupResponse, c as LookupResult, M as Modal, P as ProbeReply, f as Profile, m as ProfileContextTypeVariant, l as ProfileOptions, j as ProviderOptions, R as ResponseCodes, S as Session, T as Tokens } from '../provider-ap1C1ypF.js';
import { SessionPolicies } from '@cartridge/presets';
import { AddStarknetChainParameters } from '@starknet-io/types-js';
import { P as ParsedSessionPolicies } from '../policies-DD1aPjQ4.js';
export { N as NotReadyToConnect } from '../policies-DD1aPjQ4.js';
import '@cartridge/penpal';

type SessionOptions = {
    rpc: string;
    chainId: string;
    policies: SessionPolicies;
    redirectUrl: string;
    keychainUrl?: string;
};
declare class SessionProvider extends BaseProvider {
    id: string;
    name: string;
    protected _chainId: string;
    protected _rpcUrl: string;
    protected _username?: string;
    protected _redirectUrl: string;
    protected _policies: ParsedSessionPolicies;
    protected _keychainUrl: string;
    constructor({ rpc, chainId, policies, redirectUrl, keychainUrl, }: SessionOptions);
    private validatePoliciesSubset;
    username(): Promise<string | undefined>;
    probe(): Promise<WalletAccount | undefined>;
    connect(): Promise<WalletAccount | undefined>;
    switchStarknetChain(_chainId: string): Promise<boolean>;
    addStarknetChain(_chain: AddStarknetChainParameters): Promise<boolean>;
    disconnect(): Promise<void>;
    tryRetrieveFromQueryOrStorage(): Promise<WalletAccount | undefined>;
    private clearStoredSession;
}

export { type SessionOptions, SessionProvider as default };
