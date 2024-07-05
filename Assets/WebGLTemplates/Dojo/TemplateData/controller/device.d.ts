import { Account, Abi, Call, EstimateFeeDetails, Signature, InvokeFunctionResponse, EstimateFee, DeclareContractPayload, TypedData, InvocationsDetails } from "starknet";
import { Keychain, Modal, PaymasterOptions } from "./types";
import { AsyncMethodReturns } from "@cartridge/penpal";
declare class DeviceAccount extends Account {
    address: string;
    private keychain;
    private modal;
    private paymaster?;
    constructor(rpcUrl: string, address: string, keychain: AsyncMethodReturns<Keychain>, modal: Modal, paymaster?: PaymasterOptions);
    /**
     * Estimate Fee for a method on starknet
     *
     * @param calls the invocation object containing:
     * - contractAddress - the address of the contract
     * - entrypoint - the entrypoint of the contract
     * - calldata - (defaults to []) the calldata
     * - signature - (defaults to []) the signature
     *
     * @returns response from addTransaction
     */
    estimateInvokeFee(calls: Call | Call[], details?: EstimateFeeDetails): Promise<EstimateFee>;
    estimateDeclareFee(payload: DeclareContractPayload, details?: EstimateFeeDetails): Promise<EstimateFee>;
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
    execute(calls: Call | Call[], abis?: Abi[], transactionsDetail?: InvocationsDetails): Promise<InvokeFunctionResponse>;
    /**
     * Sign an JSON object for off-chain usage with the starknet private key and return the signature
     * This adds a message prefix so it cant be interchanged with transactions
     *
     * @param json - JSON object to be signed
     * @returns the signature of the JSON object
     * @throws {Error} if the JSON object is not a valid JSON
     */
    signMessage(typedData: TypedData): Promise<Signature>;
}
export default DeviceAccount;
