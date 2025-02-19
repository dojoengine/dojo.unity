/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export const __wbg_toriiclient_free: (a: number, b: number) => void;
export const __wbg_provider_free: (a: number, b: number) => void;
export const __wbg_account_free: (a: number, b: number) => void;
export const __wbg_controlleraccount_free: (a: number, b: number) => void;
export const __wbg_subscription_free: (a: number, b: number) => void;
export const clientconfig_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
export const typedDataEncode: (a: number, b: number, c: number, d: number, e: number) => void;
export const signingKeyNew: (a: number) => void;
export const signingKeySign: (a: number, b: number, c: number, d: number, e: number) => void;
export const verifyingKeyNew: (a: number, b: number, c: number) => void;
export const verifyingKeyVerify: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
export const createProvider: (a: number, b: number, c: number) => void;
export const provider_createAccount: (a: number, b: number, c: number, d: number, e: number) => number;
export const provider_call: (a: number, b: number, c: number) => number;
export const provider_waitForTransaction: (a: number, b: number, c: number) => number;
export const account_address: (a: number, b: number) => void;
export const account_chainId: (a: number, b: number) => void;
export const account_setBlockId: (a: number, b: number, c: number, d: number) => void;
export const account_executeRaw: (a: number, b: number, c: number) => number;
export const account_deployBurner: (a: number, b: number, c: number) => number;
export const account_nonce: (a: number) => number;
export const hashGetContractAddress: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
export const getSelectorFromTag: (a: number, b: number, c: number) => void;
export const byteArraySerialize: (a: number, b: number, c: number) => void;
export const byteArrayDeserialize: (a: number, b: number, c: number) => void;
export const poseidonHash: (a: number, b: number, c: number) => void;
export const getSelectorFromName: (a: number, b: number, c: number) => void;
export const starknetKeccak: (a: number, b: number) => void;
export const cairoShortStringToFelt: (a: number, b: number, c: number) => void;
export const parseCairoShortString: (a: number, b: number, c: number) => void;
export const toriiclient_getControllers: (a: number, b: number, c: number) => number;
export const toriiclient_getTokens: (a: number, b: number, c: number, d: number, e: number) => number;
export const toriiclient_onTokenUpdated: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
export const toriiclient_getTokenBalances: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => number;
export const toriiclient_getEntities: (a: number, b: number) => number;
export const toriiclient_getAllEntities: (a: number, b: number, c: number) => number;
export const toriiclient_getEventMessages: (a: number, b: number, c: number) => number;
export const toriiclient_onEntityUpdated: (a: number, b: number, c: number, d: number, e: number) => void;
export const toriiclient_updateEntitySubscription: (a: number, b: number, c: number, d: number) => number;
export const toriiclient_onEventMessageUpdated: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
export const toriiclient_updateEventMessageSubscription: (a: number, b: number, c: number, d: number, e: number) => number;
export const toriiclient_onStarknetEvent: (a: number, b: number, c: number, d: number, e: number) => void;
export const toriiclient_onIndexerUpdated: (a: number, b: number, c: number, d: number, e: number) => void;
export const toriiclient_onTokenBalanceUpdated: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
export const toriiclient_updateTokenBalanceSubscription: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
export const toriiclient_publishMessage: (a: number, b: number, c: number, d: number, e: number) => number;
export const subscription_cancel: (a: number) => void;
export const createClient: (a: number) => number;
export const __wbg_intounderlyingsource_free: (a: number, b: number) => void;
export const intounderlyingsource_pull: (a: number, b: number) => number;
export const intounderlyingsource_cancel: (a: number) => void;
export const __wbg_intounderlyingsink_free: (a: number, b: number) => void;
export const intounderlyingsink_write: (a: number, b: number) => number;
export const intounderlyingsink_close: (a: number) => number;
export const intounderlyingsink_abort: (a: number, b: number) => number;
export const __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
export const intounderlyingbytesource_type: (a: number) => number;
export const intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
export const intounderlyingbytesource_start: (a: number, b: number) => void;
export const intounderlyingbytesource_pull: (a: number, b: number) => number;
export const intounderlyingbytesource_cancel: (a: number) => void;
export const __wbindgen_malloc: (a: number, b: number) => number;
export const __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
export const __wbindgen_exn_store: (a: number) => void;
export const __wbindgen_export_3: WebAssembly.Table;
export const __wbindgen_add_to_stack_pointer: (a: number) => number;
export const __wbindgen_free: (a: number, b: number, c: number) => void;
export const _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h297caf672d0a768f: (a: number, b: number) => void;
export const _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h23f0737d79bb370d: (a: number, b: number, c: number) => void;
export const _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h65bc2495b1afaed7: (a: number, b: number, c: number) => void;
export const _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h80e90ecaace8ef82: (a: number, b: number) => void;
export const _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h49c577a396a4ffb5: (a: number, b: number, c: number) => void;
export const _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h732c91a52751bd26: (a: number, b: number, c: number) => void;
export const wasm_bindgen__convert__closures__invoke2_mut__h3ae0980b3d8bcbfe: (a: number, b: number, c: number, d: number) => void;
