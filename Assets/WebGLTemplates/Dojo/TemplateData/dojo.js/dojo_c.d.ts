declare namespace wasm_bindgen {
	/* tslint:disable */
	/* eslint-disable */
	/**
	* @param {string} typed_data
	* @param {string} address
	* @returns {string}
	*/
	export function typedDataEncode(typed_data: string, address: string): string;
	/**
	* @returns {string}
	*/
	export function signingKeyNew(): string;
	/**
	* @param {string} private_key
	* @param {string} hash
	* @returns {Signature}
	*/
	export function signingKeySign(private_key: string, hash: string): Signature;
	/**
	* @param {string} signing_key
	* @returns {string}
	*/
	export function verifyingKeyNew(signing_key: string): string;
	/**
	* @param {string} verifying_key
	* @param {string} hash
	* @param {Signature} signature
	* @returns {boolean}
	*/
	export function verifyingKeyVerify(verifying_key: string, hash: string, signature: Signature): boolean;
	/**
	* @param {string} rpc_url
	* @returns {Provider}
	*/
	export function createProvider(rpc_url: string): Provider;
	/**
	* @param {string} class_hash
	* @param {string} salt
	* @param {(string)[]} constructor_calldata
	* @param {string} deployer_address
	* @returns {string}
	*/
	export function hashGetContractAddress(class_hash: string, salt: string, constructor_calldata: (string)[], deployer_address: string): string;
	/**
	* @param {string} tag
	* @returns {string}
	*/
	export function getSelectorFromTag(tag: string): string;
	/**
	* @param {string} str
	* @returns {(string)[]}
	*/
	export function byteArraySerialize(str: string): (string)[];
	/**
	* @param {(string)[]} felts
	* @returns {string}
	*/
	export function byteArrayDeserialize(felts: (string)[]): string;
	/**
	* @param {(string)[]} inputs
	* @returns {string}
	*/
	export function poseidonHash(inputs: (string)[]): string;
	/**
	* @param {string} name
	* @returns {string}
	*/
	export function getSelectorFromName(name: string): string;
	/**
	* @param {Uint8Array} inputs
	* @returns {string}
	*/
	export function starknetKeccak(inputs: Uint8Array): string;
	/**
	* @param {string} str
	* @returns {string}
	*/
	export function cairoShortStringToFelt(str: string): string;
	/**
	* @param {string} str
	* @returns {string}
	*/
	export function parseCairoShortString(str: string): string;
	/**
	* Create the a client with the given configurations.
	* @param {ClientConfig} config
	* @returns {Promise<ToriiClient>}
	*/
	export function createClient(config: ClientConfig): Promise<ToriiClient>;
	export interface IndexerUpdate {
	    head: number;
	    tps: number;
	    last_block_timestamp: number;
	    contract_address: string;
	}
	
	export interface ClientConfig {
	    rpcUrl: string;
	    toriiUrl: string;
	    relayUrl: string;
	    worldAddress: string;
	}
	
	export interface Ty {
	    type: "primitive" | "struct" | "enum" | "array" | "tuple" | "bytearray";
	    type_name: string;
	    value: boolean | number | string | Ty | Record<string, Ty> | Array<Ty> | { option: string, value: Ty } | null;
	    key: boolean;
	}
	
	export interface EnumValue {
	    option: string;
	    value: Ty;
	}
	
	export interface Signature {
	    r: string;
	    s: string;
	}
	
	export type Calls = Call[];
	
	export type Model = Record<string, Ty>;
	
	export type Entity = Record<string, Model>;
	
	export type Entities = Record<string, Entity>;
	
	export interface Call {
	    to: string;
	    selector: string;
	    calldata: string[];
	}
	
	export type BlockTag = "Latest" | "Pending";
	
	export type BlockId = { Hash: string } | { Number: number } | { BlockTag: BlockTag };
	
	export interface Query {
	    limit: number;
	    offset: number;
	    clause: Clause | undefined;
	    dont_include_hashed_keys: boolean;
	}
	
	export type Clause = { Keys: KeysClause } | { Member: MemberClause } | { Composite: CompositeClause };
	
	export type KeysClauses = EntityKeysClause[];
	
	export type ModelKeysClauses = ModelKeysClause[];
	
	export interface ModelKeysClause {
	    model: string;
	    keys: string[];
	}
	
	export type PatternMatching = "FixedLen" | "VariableLen";
	
	export type EntityKeysClause = { HashedKeys: string[] } | { Keys: KeysClause };
	
	export interface KeysClause {
	    keys: (string | undefined)[];
	    pattern_matching: PatternMatching;
	    models: string[];
	}
	
	export type MemberValue = { Primitive: Primitive } | { String: string };
	
	export interface MemberClause {
	    model: string;
	    member: string;
	    operator: ComparisonOperator;
	    value: MemberValue;
	}
	
	export interface CompositeClause {
	    operator: LogicalOperator;
	    clauses: Clause[];
	}
	
	export type LogicalOperator = "And" | "Or";
	
	export type ComparisonOperator = "Eq" | "Neq" | "Gt" | "Gte" | "Lt" | "Lte";
	
	export interface Value {
	    primitive_type: Primitive;
	    value_type: ValueType;
	}
	
	export type ValueType = { String: string } | { Int: number } | { UInt: number } | { VBool: boolean } | { Bytes: number[] };
	
	export type Primitive = { I8: number | undefined } | { I16: number | undefined } | { I32: number | undefined } | { I64: number | undefined } | { I128: string | undefined } | { U8: number | undefined } | { U16: number | undefined } | { U32: number | undefined } | { U64: number | undefined } | { U128: string | undefined } | { U256: string | undefined } | { USize: number | undefined } | { Bool: boolean | undefined } | { Felt252: string | undefined } | { ClassHash: string | undefined } | { ContractAddress: string | undefined };
	
	export interface Event {
	    keys: string[];
	    data: string[];
	    transaction_hash: string;
	}
	
	/**
	*/
	export class Account {
	  free(): void;
	/**
	* @returns {string}
	*/
	  address(): string;
	/**
	* @returns {string}
	*/
	  chainId(): string;
	/**
	* @param {string} block_id
	*/
	  setBlockId(block_id: string): void;
	/**
	* @param {(Call)[]} calldata
	* @returns {Promise<string>}
	*/
	  executeRaw(calldata: (Call)[]): Promise<string>;
	/**
	* @param {string} private_key
	* @returns {Promise<Account>}
	*/
	  deployBurner(private_key: string): Promise<Account>;
	/**
	* @returns {Promise<string>}
	*/
	  nonce(): Promise<string>;
	}
	/**
	*/
	export class IntoUnderlyingByteSource {
	  free(): void;
	/**
	* @param {ReadableByteStreamController} controller
	*/
	  start(controller: ReadableByteStreamController): void;
	/**
	* @param {ReadableByteStreamController} controller
	* @returns {Promise<any>}
	*/
	  pull(controller: ReadableByteStreamController): Promise<any>;
	/**
	*/
	  cancel(): void;
	/**
	*/
	  readonly autoAllocateChunkSize: number;
	/**
	*/
	  readonly type: string;
	}
	/**
	*/
	export class IntoUnderlyingSink {
	  free(): void;
	/**
	* @param {any} chunk
	* @returns {Promise<any>}
	*/
	  write(chunk: any): Promise<any>;
	/**
	* @returns {Promise<any>}
	*/
	  close(): Promise<any>;
	/**
	* @param {any} reason
	* @returns {Promise<any>}
	*/
	  abort(reason: any): Promise<any>;
	}
	/**
	*/
	export class IntoUnderlyingSource {
	  free(): void;
	/**
	* @param {ReadableStreamDefaultController} controller
	* @returns {Promise<any>}
	*/
	  pull(controller: ReadableStreamDefaultController): Promise<any>;
	/**
	*/
	  cancel(): void;
	}
	/**
	*/
	export class Provider {
	  free(): void;
	/**
	* @param {string} private_key
	* @param {string} address
	* @returns {Promise<Account>}
	*/
	  createAccount(private_key: string, address: string): Promise<Account>;
	/**
	* @param {Call} call
	* @param {BlockId} block_id
	* @returns {Promise<Array<any>>}
	*/
	  call(call: Call, block_id: BlockId): Promise<Array<any>>;
	/**
	* @param {string} txn_hash
	* @returns {Promise<boolean>}
	*/
	  waitForTransaction(txn_hash: string): Promise<boolean>;
	}
	/**
	*/
	export class Subscription {
	  free(): void;
	/**
	*/
	  cancel(): void;
	}
	/**
	*/
	export class ToriiClient {
	  free(): void;
	/**
	* @param {Query} query
	* @returns {Promise<Entities>}
	*/
	  getEntities(query: Query): Promise<Entities>;
	/**
	* @param {number} limit
	* @param {number} offset
	* @returns {Promise<Entities>}
	*/
	  getAllEntities(limit: number, offset: number): Promise<Entities>;
	/**
	* @param {Query} query
	* @param {boolean} historical
	* @returns {Promise<Entities>}
	*/
	  getEventMessages(query: Query, historical: boolean): Promise<Entities>;
	/**
	* @param {(EntityKeysClause)[]} clauses
	* @param {Function} callback
	* @returns {Promise<Subscription>}
	*/
	  onEntityUpdated(clauses: (EntityKeysClause)[], callback: Function): Promise<Subscription>;
	/**
	* @param {Subscription} subscription
	* @param {(EntityKeysClause)[]} clauses
	* @returns {Promise<void>}
	*/
	  updateEntitySubscription(subscription: Subscription, clauses: (EntityKeysClause)[]): Promise<void>;
	/**
	* @param {(EntityKeysClause)[]} clauses
	* @param {boolean} historical
	* @param {Function} callback
	* @returns {Promise<Subscription>}
	*/
	  onEventMessageUpdated(clauses: (EntityKeysClause)[], historical: boolean, callback: Function): Promise<Subscription>;
	/**
	* @param {Subscription} subscription
	* @param {(EntityKeysClause)[]} clauses
	* @param {boolean} historical
	* @returns {Promise<void>}
	*/
	  updateEventMessageSubscription(subscription: Subscription, clauses: (EntityKeysClause)[], historical: boolean): Promise<void>;
	/**
	* @param {(EntityKeysClause)[]} clauses
	* @param {Function} callback
	* @returns {Promise<Subscription>}
	*/
	  onStarknetEvent(clauses: (EntityKeysClause)[], callback: Function): Promise<Subscription>;
	/**
	* @param {string | undefined} contract_address
	* @param {Function} callback
	* @returns {Promise<Subscription>}
	*/
	  onIndexerUpdated(contract_address: string | undefined, callback: Function): Promise<Subscription>;
	/**
	* @param {string} message
	* @param {(string)[]} signature
	* @returns {Promise<Uint8Array>}
	*/
	  publishMessage(message: string, signature: (string)[]): Promise<Uint8Array>;
	}
	
}

declare type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_toriiclient_free: (a: number, b: number) => void;
  readonly __wbg_provider_free: (a: number, b: number) => void;
  readonly __wbg_account_free: (a: number, b: number) => void;
  readonly __wbg_subscription_free: (a: number, b: number) => void;
  readonly typedDataEncode: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly signingKeyNew: (a: number) => void;
  readonly signingKeySign: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyingKeyNew: (a: number, b: number, c: number) => void;
  readonly verifyingKeyVerify: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly createProvider: (a: number, b: number, c: number) => void;
  readonly provider_createAccount: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly provider_call: (a: number, b: number, c: number) => number;
  readonly provider_waitForTransaction: (a: number, b: number, c: number) => number;
  readonly account_address: (a: number, b: number) => void;
  readonly account_chainId: (a: number, b: number) => void;
  readonly account_setBlockId: (a: number, b: number, c: number, d: number) => void;
  readonly account_executeRaw: (a: number, b: number, c: number) => number;
  readonly account_deployBurner: (a: number, b: number, c: number) => number;
  readonly account_nonce: (a: number) => number;
  readonly hashGetContractAddress: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly getSelectorFromTag: (a: number, b: number, c: number) => void;
  readonly byteArraySerialize: (a: number, b: number, c: number) => void;
  readonly byteArrayDeserialize: (a: number, b: number, c: number) => void;
  readonly poseidonHash: (a: number, b: number, c: number) => void;
  readonly getSelectorFromName: (a: number, b: number, c: number) => void;
  readonly starknetKeccak: (a: number, b: number) => void;
  readonly cairoShortStringToFelt: (a: number, b: number, c: number) => void;
  readonly parseCairoShortString: (a: number, b: number, c: number) => void;
  readonly toriiclient_getEntities: (a: number, b: number) => number;
  readonly toriiclient_getAllEntities: (a: number, b: number, c: number) => number;
  readonly toriiclient_getEventMessages: (a: number, b: number, c: number) => number;
  readonly toriiclient_onEntityUpdated: (a: number, b: number, c: number, d: number) => number;
  readonly toriiclient_updateEntitySubscription: (a: number, b: number, c: number, d: number) => number;
  readonly toriiclient_onEventMessageUpdated: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly toriiclient_updateEventMessageSubscription: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly toriiclient_onStarknetEvent: (a: number, b: number, c: number, d: number) => number;
  readonly toriiclient_onIndexerUpdated: (a: number, b: number, c: number, d: number) => number;
  readonly toriiclient_publishMessage: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly subscription_cancel: (a: number) => void;
  readonly createClient: (a: number) => number;
  readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
  readonly intounderlyingbytesource_type: (a: number, b: number) => void;
  readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
  readonly intounderlyingbytesource_start: (a: number, b: number) => void;
  readonly intounderlyingbytesource_pull: (a: number, b: number) => number;
  readonly intounderlyingbytesource_cancel: (a: number) => void;
  readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
  readonly intounderlyingsource_pull: (a: number, b: number) => number;
  readonly intounderlyingsource_cancel: (a: number) => void;
  readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
  readonly intounderlyingsink_write: (a: number, b: number) => number;
  readonly intounderlyingsink_close: (a: number) => number;
  readonly intounderlyingsink_abort: (a: number, b: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd2c74c1b7e9222d1: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4aebea369d10720f: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4301a475fe6d23e9: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hdff8534b51b570f5: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbb184a197cc25f28: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h57be5134d1d69be9: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__hcb093c54d64f88f2: (a: number, b: number, c: number, d: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
declare function wasm_bindgen (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
