import { Keychain, KeychainOptions } from "../types";
import { IFrame, IFrameOptions } from "./base";
type KeychainIframeOptions = IFrameOptions<Keychain> & KeychainOptions;
export declare class KeychainIFrame extends IFrame<Keychain> {
    constructor({ url, policies, ...iframeOptions }: KeychainIframeOptions);
}
export {};
