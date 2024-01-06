declare namespace wasm_bindgen {
	/* tslint:disable */
	/* eslint-disable */
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
	    worldAddress: string;
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
	*/
	  onSyncModelChange(model: EntityModel, callback: Function): void;
	/**
	* @param {(string)[] | undefined} ids
	* @param {Function} callback
	* @returns {Promise<void>}
	*/
	  onEntityUpdated(ids: (string)[] | undefined, callback: Function): Promise<void>;
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
  readonly client_getEntities: (a: number, b: number, c: number) => number;
  readonly client_getEntitiesByKeys: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
  readonly client_getModelValue: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly client_addModelsToSync: (a: number, b: number, c: number) => number;
  readonly client_removeModelsToSync: (a: number, b: number, c: number) => number;
  readonly client_onSyncModelChange: (a: number, b: number, c: number, d: number) => void;
  readonly client_onEntityUpdated: (a: number, b: number, c: number, d: number) => number;
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
  readonly wasm_bindgen__convert__closures__invoke1_mut__hf98f9cc6c53368fe: (a: number, b: number, c: number) => void;
  readonly wasm_bindgen__convert__closures__invoke1_mut__h43d945927ecd0948: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h3515c005283ee1fc: (a: number, b: number, c: number, d: number) => void;
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
