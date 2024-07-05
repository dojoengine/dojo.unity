import { Abi, Call, DeclareSignerDetails, DeployAccountSignerDetails, InvocationsSignerDetails, Signature, SignerInterface, TypedData } from "starknet";
import { Keychain, Modal } from "./types";
import { AsyncMethodReturns } from "@cartridge/penpal";
export declare class Signer implements SignerInterface {
    private keychain;
    modal: Modal;
    constructor(keychain: AsyncMethodReturns<Keychain>, modal: Modal);
    /**
     * Method to get the public key of the signer
     *
     * @returns public key of signer as hex string with 0x prefix
     */
    getPubKey(): Promise<string>;
    /**
     * Sign an JSON object for off-chain usage with the starknet private key and return the signature
     * This adds a message prefix so it cant be interchanged with transactions
     *
     * @param typedData - JSON object to be signed
     * @param accountAddress - account
     * @returns the signature of the JSON object
     * @throws {Error} if the JSON object is not a valid JSON
     */
    signMessage(typedData: TypedData, account: string): Promise<Signature>;
    signTransaction(transactions: Call[], transactionsDetail: InvocationsSignerDetails, abis?: Abi[]): Promise<Signature>;
    signDeployAccountTransaction(transaction: DeployAccountSignerDetails): Promise<Signature>;
    signDeclareTransaction(transaction: DeclareSignerDetails): Promise<Signature>;
}
