import { Keychain, KeychainOptions } from "../types";
import { WalletBridge } from "../wallets/bridge";
import { IFrame, IFrameOptions } from "./base";
type KeychainIframeOptions = IFrameOptions<Keychain> & KeychainOptions;
export declare class KeychainIFrame extends IFrame<Keychain> {
    private walletBridge;
    constructor({ url, policies, ...iframeOptions }: KeychainIframeOptions);
    getWalletBridge(): WalletBridge;
}
export {};
