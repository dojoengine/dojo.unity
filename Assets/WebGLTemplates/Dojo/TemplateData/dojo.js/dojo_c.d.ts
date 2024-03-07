declare namespace wasm_bindgen {
	/* tslint:disable */
	/* eslint-disable */
	/**
	* @returns {string}
	*/
	export function signingKeyNew(): string;
	/**
	* @param {string} private_key
	* @param {string} hash
	* @returns {JsSignature}
	*/
	export function signingKeySign(private_key: string, hash: string): JsSignature;
	/**
	* @param {string} signing_key
	* @returns {string}
	*/
	export function verifyingKeyNew(signing_key: string): string;
	/**
	* @param {string} verifying_key
	* @param {string} hash
	* @param {JsSignature} signature
	* @returns {boolean}
	*/
	export function verifyingKeyVerify(verifying_key: string, hash: string, signature: JsSignature): boolean;
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
	* Create the a client with the given configurations.
	* @param {KeysClauses} initialModelsToSync
	* @param {ClientConfig} config
	* @returns {Promise<Client>}
	*/
	export function createClient(initialModelsToSync: KeysClauses, config: ClientConfig): Promise<Client>;
	export interface ClientConfig {
	    rpcUrl: string;
	    toriiUrl: string;
	    relayUrl: string;
	    worldAddress: string;
	}
	
	export interface JsSignature {
	    r: string;
	    s: string;
	}
	
	export type Calls = Call[];
	
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
	    clause: Clause | null;
	}
	
	export type Clause = { Keys: KeysClause } | { Member: MemberClause } | { Composite: CompositeClause };
	
	export type KeysClauses = KeysClause[];
	
	export interface KeysClause {
	    model: string;
	    keys: string[];
	}
	
	export interface MemberClause {
	    model: string;
	    member: string;
	    operator: ComparisonOperator;
	    value: Value;
	}
	
	export interface CompositeClause {
	    model: string;
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
	
	export type Primitive = { U8: number | null } | { U16: number | null } | { U32: number | null } | { U64: number | null } | { U128: string | null } | { U256: string | null } | { USize: number | null } | { Bool: boolean | null } | { Felt252: string | null } | { ClassHash: string | null } | { ContractAddress: string | null };
	
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
	* @param {Calls} calldata
	* @returns {Promise<string>}
	*/
	  executeRaw(calldata: Calls): Promise<string>;
	/**
	* @returns {Promise<Account>}
	*/
	  deployBurner(): Promise<Account>;
	}
	/**
	*/
	export class Client {
	  free(): void;
	/**
	* @param {Query} query
	* @returns {Promise<any>}
	*/
	  getEntities(query: Query): Promise<any>;
	/**
	* Retrieves the model value of an entity. Will fetch from remote if the requested entity is not one of the entities that are being synced.
	* @param {string} model
	* @param {(string)[]} keys
	* @returns {Promise<any>}
	*/
	  getModelValue(model: string, keys: (string)[]): Promise<any>;
	/**
	* Register new entities to be synced.
	* @param {KeysClauses} models
	* @returns {Promise<void>}
	*/
	  addModelsToSync(models: KeysClauses): Promise<void>;
	/**
	* Remove the entities from being synced.
	* @param {KeysClauses} models
	* @returns {Promise<void>}
	*/
	  removeModelsToSync(models: KeysClauses): Promise<void>;
	/**
	* Register a callback to be called every time the specified synced entity's value changes.
	* @param {KeysClause} model
	* @param {Function} callback
	* @returns {Promise<void>}
	*/
	  onSyncModelChange(model: KeysClause, callback: Function): Promise<void>;
	/**
	* @param {(string)[] | undefined} ids
	* @param {Function} callback
	* @returns {Promise<void>}
	*/
	  onEntityUpdated(ids: (string)[] | undefined, callback: Function): Promise<void>;
	/**
	* @param {string} topic
	* @returns {Promise<boolean>}
	*/
	  subscribeTopic(topic: string): Promise<boolean>;
	/**
	* @param {string} topic
	* @returns {Promise<boolean>}
	*/
	  unsubscribeTopic(topic: string): Promise<boolean>;
	/**
	* @param {string} topic
	* @param {Uint8Array} message
	* @returns {Promise<Uint8Array>}
	*/
	  publishMessage(topic: string, message: Uint8Array): Promise<Uint8Array>;
	/**
	* @param {Function} callback
	* @returns {Promise<void>}
	*/
	  onMessage(callback: Function): Promise<void>;
	}
	/**
	*/
	export class IntoUnderlyingByteSource {
	  free(): void;
	/**
	* @param {any} controller
	*/
	  start(controller: any): void;
	/**
	* @param {any} controller
	* @returns {Promise<any>}
	*/
	  pull(controller: any): Promise<any>;
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
	* @param {any} controller
	* @returns {Promise<any>}
	*/
	  pull(controller: any): Promise<any>;
	/**
	*/
	  cancel(): void;
	}
	/**
	* Raw options for [`pipeTo()`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/pipeTo).
	*/
	export class PipeOptions {
	  free(): void;
	/**
	*/
	  readonly preventAbort: boolean;
	/**
	*/
	  readonly preventCancel: boolean;
	/**
	*/
	  readonly preventClose: boolean;
	/**
	*/
	  readonly signal: AbortSignal | undefined;
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
	export class QueuingStrategy {
	  free(): void;
	/**
	*/
	  readonly highWaterMark: number;
	}
	/**
	* Raw options for [`getReader()`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader).
	*/
	export class ReadableStreamGetReaderOptions {
	  free(): void;
	/**
	*/
	  readonly mode: any;
	}
	
}

declare type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_provider_free: (a: number) => void;
  readonly __wbg_account_free: (a: number) => void;
  readonly __wbg_client_free: (a: number) => void;
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
  readonly account_executeRaw: (a: number, b: number) => number;
  readonly account_deployBurner: (a: number) => number;
  readonly hashGetContractAddress: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly client_getEntities: (a: number, b: number) => number;
  readonly client_getModelValue: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly client_addModelsToSync: (a: number, b: number) => number;
  readonly client_removeModelsToSync: (a: number, b: number) => number;
  readonly client_onSyncModelChange: (a: number, b: number, c: number) => number;
  readonly client_onEntityUpdated: (a: number, b: number, c: number, d: number) => number;
  readonly client_subscribeTopic: (a: number, b: number, c: number) => number;
  readonly client_unsubscribeTopic: (a: number, b: number, c: number) => number;
  readonly client_publishMessage: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly client_onMessage: (a: number, b: number) => number;
  readonly createClient: (a: number, b: number) => number;
  readonly __wbg_queuingstrategy_free: (a: number) => void;
  readonly queuingstrategy_highWaterMark: (a: number) => number;
  readonly __wbg_intounderlyingsink_free: (a: number) => void;
  readonly intounderlyingsink_write: (a: number, b: number) => number;
  readonly intounderlyingsink_close: (a: number) => number;
  readonly intounderlyingsink_abort: (a: number, b: number) => number;
  readonly __wbg_intounderlyingbytesource_free: (a: number) => void;
  readonly intounderlyingbytesource_type: (a: number, b: number) => void;
  readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
  readonly intounderlyingbytesource_start: (a: number, b: number) => void;
  readonly intounderlyingbytesource_pull: (a: number, b: number) => number;
  readonly intounderlyingbytesource_cancel: (a: number) => void;
  readonly __wbg_readablestreamgetreaderoptions_free: (a: number) => void;
  readonly readablestreamgetreaderoptions_mode: (a: number) => number;
  readonly __wbg_pipeoptions_free: (a: number) => void;
  readonly pipeoptions_preventClose: (a: number) => number;
  readonly pipeoptions_preventCancel: (a: number) => number;
  readonly pipeoptions_preventAbort: (a: number) => number;
  readonly pipeoptions_signal: (a: number) => number;
  readonly __wbg_intounderlyingsource_free: (a: number) => void;
  readonly intounderlyingsource_pull: (a: number, b: number) => number;
  readonly intounderlyingsource_cancel: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6a81129acb643393: (a: number, b: number, c: number) => void;
  readonly wasm_bindgen__convert__closures__invoke0_mut__hd574114c4d9cf57f: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures__invoke1_mut__h802007b5f737ac1e: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h68313b65f95fdd11: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h8a502170c0201eea: (a: number, b: number, c: number, d: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
declare function wasm_bindgen (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
