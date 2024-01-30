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
	* @returns {number}
	*/
	export function jsonrpcClientNew(rpc_url: string): number;
	/**
	* @param {number} rpc
	* @param {string} private_key
	* @param {string} address
	* @returns {Promise<number>}
	*/
	export function accountNew(rpc: number, private_key: string, address: string): Promise<number>;
	/**
	* @param {number} account
	* @returns {string}
	*/
	export function accountAddress(account: number): string;
	/**
	* @param {number} account
	* @returns {string}
	*/
	export function accountChainId(account: number): string;
	/**
	* @param {number} account
	* @param {string} block_id
	*/
	export function accountSetBlockId(account: number, block_id: string): void;
	/**
	* @param {number} account
	* @param {JsCalls} calldata
	* @returns {Promise<string>}
	*/
	export function accountExecuteRaw(account: number, calldata: JsCalls): Promise<string>;
	/**
	* @param {number} rpc
	* @param {string} txn_hash
	* @returns {Promise<boolean>}
	*/
	export function waitForTransaction(rpc: number, txn_hash: string): Promise<boolean>;
	/**
	* @param {string} class_hash
	* @param {string} salt
	* @param {(string)[]} constructor_calldata
	* @param {string} deployer_address
	* @returns {string}
	*/
	export function hashGetContractAddress(class_hash: string, salt: string, constructor_calldata: (string)[], deployer_address: string): string;
	/**
	* @param {number} master_account
	* @returns {Promise<number>}
	*/
	export function accountDeployBurner(master_account: number): Promise<number>;
	/**
	* Create the a client with the given configurations.
	* @param {(EntityModel)[]} initialModelsToSync
	* @param {ClientConfig} config
	* @returns {Promise<Client>}
	*/
	export function createClient(initialModelsToSync: (EntityModel)[], config: ClientConfig): Promise<Client>;
	
	export interface EntityModel {
	    model: string;
	    keys: string[];
	}
	
	
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
	
	export interface JsCalls {
	    calls: JsCall[];
	}
	
	export interface JsCall {
	    to: string;
	    selector: string;
	    calldata: string[];
	}
	
	/**
	*/
	export class Client {
	  free(): void;
	/**
	* @param {number} limit
	* @param {number} offset
	* @returns {Promise<any>}
	*/
	  getEntities(limit: number, offset: number): Promise<any>;
	/**
	* @param {string} model
	* @param {any[]} keys
	* @param {number} limit
	* @param {number} offset
	* @returns {Promise<any>}
	*/
	  getEntitiesByKeys(model: string, keys: any[], limit: number, offset: number): Promise<any>;
	/**
	* Retrieves the model value of an entity. Will fetch from remote if the requested entity is not one of the entities that are being synced.
	* @param {string} model
	* @param {any[]} keys
	* @returns {Promise<any>}
	*/
	  getModelValue(model: string, keys: any[]): Promise<any>;
	/**
	* Register new entities to be synced.
	* @param {(EntityModel)[]} models
	* @returns {Promise<void>}
	*/
	  addModelsToSync(models: (EntityModel)[]): Promise<void>;
	/**
	* Remove the entities from being synced.
	* @param {(EntityModel)[]} models
	* @returns {Promise<void>}
	*/
	  removeModelsToSync(models: (EntityModel)[]): Promise<void>;
	/**
	* Register a callback to be called every time the specified synced entity's value changes.
	* @param {EntityModel} model
	* @param {Function} callback
	* @returns {Promise<void>}
	*/
	  onSyncModelChange(model: EntityModel, callback: Function): Promise<void>;
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
  readonly __wbg_client_free: (a: number) => void;
  readonly signingKeyNew: (a: number) => void;
  readonly signingKeySign: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly verifyingKeyNew: (a: number, b: number, c: number) => void;
  readonly verifyingKeyVerify: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly jsonrpcClientNew: (a: number, b: number, c: number) => void;
  readonly accountNew: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly accountAddress: (a: number, b: number) => void;
  readonly accountChainId: (a: number, b: number) => void;
  readonly accountSetBlockId: (a: number, b: number, c: number, d: number) => void;
  readonly accountExecuteRaw: (a: number, b: number) => number;
  readonly waitForTransaction: (a: number, b: number, c: number) => number;
  readonly hashGetContractAddress: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly accountDeployBurner: (a: number) => number;
  readonly client_getEntities: (a: number, b: number, c: number) => number;
  readonly client_getEntitiesByKeys: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly client_getModelValue: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly client_addModelsToSync: (a: number, b: number, c: number) => number;
  readonly client_removeModelsToSync: (a: number, b: number, c: number) => number;
  readonly client_onSyncModelChange: (a: number, b: number, c: number) => number;
  readonly client_onEntityUpdated: (a: number, b: number, c: number, d: number) => number;
  readonly client_subscribeTopic: (a: number, b: number, c: number) => number;
  readonly client_unsubscribeTopic: (a: number, b: number, c: number) => number;
  readonly client_publishMessage: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly client_onMessage: (a: number, b: number) => number;
  readonly createClient: (a: number, b: number, c: number) => number;
  readonly __wbg_queuingstrategy_free: (a: number) => void;
  readonly queuingstrategy_highWaterMark: (a: number) => number;
  readonly __wbg_intounderlyingsource_free: (a: number) => void;
  readonly intounderlyingsource_pull: (a: number, b: number) => number;
  readonly intounderlyingsource_cancel: (a: number) => void;
  readonly __wbg_intounderlyingbytesource_free: (a: number) => void;
  readonly intounderlyingbytesource_type: (a: number, b: number) => void;
  readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
  readonly intounderlyingbytesource_start: (a: number, b: number) => void;
  readonly intounderlyingbytesource_pull: (a: number, b: number) => number;
  readonly intounderlyingbytesource_cancel: (a: number) => void;
  readonly __wbg_intounderlyingsink_free: (a: number) => void;
  readonly intounderlyingsink_write: (a: number, b: number) => number;
  readonly intounderlyingsink_close: (a: number) => number;
  readonly intounderlyingsink_abort: (a: number, b: number) => number;
  readonly __wbg_readablestreamgetreaderoptions_free: (a: number) => void;
  readonly readablestreamgetreaderoptions_mode: (a: number) => number;
  readonly __wbg_pipeoptions_free: (a: number) => void;
  readonly pipeoptions_preventClose: (a: number) => number;
  readonly pipeoptions_preventCancel: (a: number) => number;
  readonly pipeoptions_preventAbort: (a: number) => number;
  readonly pipeoptions_signal: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly wasm_bindgen__convert__closures__invoke1_mut__h1bbff548ea78c42e: (a: number, b: number, c: number) => void;
  readonly wasm_bindgen__convert__closures__invoke0_mut__h5022508738de08e2: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures__invoke1_mut__h3c219dc0b035f7df: (a: number, b: number, c: number) => void;
  readonly wasm_bindgen__convert__closures__invoke1_mut__hf7a65870f58b9527: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h49135c650ec5830a: (a: number, b: number, c: number, d: number) => void;
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
