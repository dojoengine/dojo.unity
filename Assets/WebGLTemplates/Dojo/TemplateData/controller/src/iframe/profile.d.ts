import { Profile, ProfileOptions } from "../types";
import { IFrame, IFrameOptions } from "./base";
export type ProfileIFrameOptions = IFrameOptions<Profile> & ProfileOptions & {
    rpcUrl: string;
    version?: string;
    username: string;
    slot?: string;
    namespace?: string;
};
export declare class ProfileIFrame extends IFrame<Profile> {
    constructor({ profileUrl, rpcUrl, version, username, slot, namespace, tokens, ...iframeOptions }: ProfileIFrameOptions);
}
