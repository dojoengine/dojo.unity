import { Policy } from "@cartridge/controller-wasm";
import { CartridgeSessionAccount } from "@cartridge/controller-wasm/session";
import { Call, InvokeFunctionResponse, WalletAccount } from "starknet";
import BaseProvider from "../provider";
export * from "../errors";
export * from "../types";
export default class SessionAccount extends WalletAccount {
    controller: CartridgeSessionAccount;
    constructor(provider: BaseProvider, { rpcUrl, privateKey, address, ownerGuid, chainId, expiresAt, policies, guardianKeyGuid, metadataHash, sessionKeyGuid, }: {
        rpcUrl: string;
        privateKey: string;
        address: string;
        ownerGuid: string;
        chainId: string;
        expiresAt: number;
        policies: Policy[];
        guardianKeyGuid: string;
        metadataHash: string;
        sessionKeyGuid: string;
    });
    /**
     * Invoke execute function in account contract
     *
     * @param calls the invocation object or an array of them, containing:
     * - contractAddress - the address of the contract
     * - entrypoint - the entrypoint of the contract
     * - calldata - (defaults to []) the calldata
     * - signature - (defaults to []) the signature
     *
     * @returns response from addTransaction
     */
    execute(calls: Call | Call[]): Promise<InvokeFunctionResponse>;
}
