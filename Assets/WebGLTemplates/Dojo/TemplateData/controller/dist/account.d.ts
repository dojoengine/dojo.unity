import { InvokeFunctionResponse, TypedData, WalletAccount, Call, AllowArray } from 'starknet';
import { SPEC } from '@starknet-io/types-js';
import { Keychain, KeychainOptions, Modal } from './types';
import { AsyncMethodReturns } from '@cartridge/penpal';
import { default as BaseProvider } from './provider';
declare class ControllerAccount extends WalletAccount {
    address: string;
    private keychain;
    private modal;
    private options?;
    constructor(provider: BaseProvider, rpcUrl: string, address: string, keychain: AsyncMethodReturns<Keychain>, options: KeychainOptions, modal: Modal);
    /**
     * Invoke execute function in account contract
     *
     * @param calls the invocation object or an array of them, containing:
     * - contractAddress - the address of the contract
     * - entrypoint - the entrypoint of the contract
     * - calldata - (defaults to []) the calldata
     * - signature - (defaults to []) the signature
     * @param abis (optional) the abi of the contract for better displaying
     *
     * @returns response from addTransaction
     */
    execute(calls: AllowArray<Call>): Promise<InvokeFunctionResponse>;
    /**
     * Sign an JSON object for off-chain usage with the starknet private key and return the signature
     * This adds a message prefix so it cant be interchanged with transactions
     *
     * @param json - JSON object to be signed
     * @returns the signature of the JSON object
     * @throws {Error} if the JSON object is not a valid JSON
     */
    signMessage(typedData: TypedData): Promise<SPEC.SIGNATURE>;
}
export default ControllerAccount;
