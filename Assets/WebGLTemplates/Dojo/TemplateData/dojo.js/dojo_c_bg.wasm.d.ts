/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_provider_free(a: number): void;
export function __wbg_account_free(a: number): void;
export function __wbg_subscription_free(a: number): void;
export function __wbg_client_free(a: number): void;
export function typedDataEncode(a: number, b: number, c: number, d: number, e: number): void;
export function signingKeyNew(a: number): void;
export function signingKeySign(a: number, b: number, c: number, d: number, e: number): void;
export function verifyingKeyNew(a: number, b: number, c: number): void;
export function verifyingKeyVerify(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function createProvider(a: number, b: number, c: number): void;
export function provider_createAccount(a: number, b: number, c: number, d: number, e: number): number;
export function provider_call(a: number, b: number, c: number): number;
export function provider_waitForTransaction(a: number, b: number, c: number): number;
export function account_address(a: number, b: number): void;
export function account_chainId(a: number, b: number): void;
export function account_setBlockId(a: number, b: number, c: number, d: number): void;
export function account_executeRaw(a: number, b: number): number;
export function account_deployBurner(a: number, b: number, c: number): number;
export function hashGetContractAddress(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): void;
export function byteArraySerialize(a: number, b: number, c: number): void;
export function byteArrayDeserialize(a: number, b: number, c: number): void;
export function poseidonHash(a: number, b: number, c: number): void;
export function client_getEntities(a: number, b: number): number;
export function client_getAllEntities(a: number, b: number, c: number): number;
export function client_getEventMessages(a: number, b: number): number;
export function client_getModelValue(a: number, b: number, c: number, d: number, e: number): number;
export function client_addModelsToSync(a: number, b: number): number;
export function client_removeModelsToSync(a: number, b: number): number;
export function client_onSyncModelChange(a: number, b: number, c: number): number;
export function client_onEntityUpdated(a: number, b: number, c: number, d: number): number;
export function client_onEventMessageUpdated(a: number, b: number, c: number, d: number): number;
export function client_publishMessage(a: number, b: number, c: number, d: number): number;
export function subscription_cancel(a: number): void;
export function createClient(a: number, b: number): number;
export function __wbg_queuingstrategy_free(a: number): void;
export function queuingstrategy_highWaterMark(a: number): number;
export function __wbg_intounderlyingsink_free(a: number): void;
export function intounderlyingsink_write(a: number, b: number): number;
export function intounderlyingsink_close(a: number): number;
export function intounderlyingsink_abort(a: number, b: number): number;
export function __wbg_intounderlyingbytesource_free(a: number): void;
export function intounderlyingbytesource_type(a: number, b: number): void;
export function intounderlyingbytesource_autoAllocateChunkSize(a: number): number;
export function intounderlyingbytesource_start(a: number, b: number): void;
export function intounderlyingbytesource_pull(a: number, b: number): number;
export function intounderlyingbytesource_cancel(a: number): void;
export function __wbg_readablestreamgetreaderoptions_free(a: number): void;
export function readablestreamgetreaderoptions_mode(a: number): number;
export function __wbg_pipeoptions_free(a: number): void;
export function pipeoptions_preventClose(a: number): number;
export function pipeoptions_preventCancel(a: number): number;
export function pipeoptions_preventAbort(a: number): number;
export function pipeoptions_signal(a: number): number;
export function __wbg_intounderlyingsource_free(a: number): void;
export function intounderlyingsource_pull(a: number, b: number): number;
export function intounderlyingsource_cancel(a: number): void;
export function __wbindgen_malloc(a: number, b: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number, d: number): number;
export const __wbindgen_export_2: WebAssembly.Table;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h202721cc6efa1300(a: number, b: number, c: number): void;
export function wasm_bindgen__convert__closures__invoke0_mut__hef135aeadb8d9b2d(a: number, b: number): void;
export function wasm_bindgen__convert__closures__invoke1_mut__h80d0ff2204b1ffde(a: number, b: number, c: number): void;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h54a3cbc5936c0dc6(a: number, b: number, c: number): void;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number, c: number): void;
export function __wbindgen_exn_store(a: number): void;
export function wasm_bindgen__convert__closures__invoke2_mut__hee2649badc712846(a: number, b: number, c: number, d: number): void;
