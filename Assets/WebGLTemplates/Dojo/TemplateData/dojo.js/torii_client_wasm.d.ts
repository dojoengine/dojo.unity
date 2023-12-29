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
