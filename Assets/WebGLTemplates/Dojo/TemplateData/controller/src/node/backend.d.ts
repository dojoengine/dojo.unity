/**
 * Implements a file system backend.
 * This is designed for Node.js environments to store session data on the filesystem.
 */
export declare class NodeBackend {
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
