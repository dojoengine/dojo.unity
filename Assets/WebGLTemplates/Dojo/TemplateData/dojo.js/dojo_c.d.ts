declare namespace wasm_bindgen {
	/* tslint:disable */
	/* eslint-disable */
	/**
	 * Encodes typed data according to Starknet's typed data specification
	 *
	 * # Parameters
	 * * `typed_data` - JSON string containing the typed data
	 * * `address` - Address as hex string
	 *
	 * # Returns
	 * Result containing encoded data as hex string or error
	 */
	export function typedDataEncode(typed_data: string, address: string): string;
	/**
	 * Generates a new random signing key
	 *
	 * # Returns
	 * Private key as hex string
	 */
	export function signingKeyNew(): string;
	/**
	 * Signs a message hash with a private key
	 *
	 * # Parameters
	 * * `private_key` - Private key as hex string
	 * * `hash` - Message hash as hex string
	 *
	 * # Returns
	 * Result containing signature or error
	 */
	export function signingKeySign(private_key: string, hash: string): Signature;
	/**
	 * Derives a verifying (public) key from a signing (private) key
	 *
	 * # Parameters
	 * * `signing_key` - Signing key as hex string
	 *
	 * # Returns
	 * Result containing verifying key as hex string or error
	 */
	export function verifyingKeyNew(signing_key: string): string;
	/**
	 * Verifies a signature against a message hash using a verifying key
	 *
	 * # Parameters
	 * * `verifying_key` - Verifying key as hex string
	 * * `hash` - Message hash as hex string
	 * * `signature` - Signature to verify
	 *
	 * # Returns
	 * Result containing verification success boolean or error
	 */
	export function verifyingKeyVerify(verifying_key: string, hash: string, signature: Signature): boolean;
	/**
	 * Creates a new Starknet provider instance for a given RPC URL
	 *
	 * # Parameters
	 * * `rpc_url` - URL of the RPC endpoint
	 *
	 * # Returns
	 * Result containing Provider instance or error
	 */
	export function createProvider(rpc_url: string): Provider;
	/**
	 * Computes a contract address from deployment parameters
	 *
	 * # Parameters
	 * * `class_hash` - Contract class hash as hex string
	 * * `salt` - Salt value as hex string
	 * * `constructor_calldata` - Array of constructor parameters as hex strings
	 * * `deployer_address` - Address of deployer as hex string
	 *
	 * # Returns
	 * Result containing computed contract address as hex string or error
	 */
	export function hashGetContractAddress(class_hash: string, salt: string, constructor_calldata: (string)[], deployer_address: string): string;
	/**
	 * Computes a selector from a tag string
	 *
	 * # Parameters
	 * * `tag` - Tag string to compute selector from
	 *
	 * # Returns
	 * Selector as hex string
	 */
	export function getSelectorFromTag(tag: string): string;
	/**
	 * Serializes a string into a Cairo byte array
	 *
	 * # Parameters
	 * * `str` - String to serialize
	 *
	 * # Returns
	 * Result containing array of field elements as hex strings or error
	 */
	export function byteArraySerialize(str: string): (string)[];
	/**
	 * Deserializes a Cairo byte array into a string
	 *
	 * # Parameters
	 * * `felts` - Array of field elements as hex strings
	 *
	 * # Returns
	 * Result containing deserialized string or error
	 */
	export function byteArrayDeserialize(felts: (string)[]): string;
	/**
	 * Computes a Poseidon hash of the inputs
	 *
	 * # Parameters
	 * * `inputs` - Array of field elements as hex strings
	 *
	 * # Returns
	 * Result containing hash as hex string or error
	 */
	export function poseidonHash(inputs: (string)[]): string;
	/**
	 * Gets a selector from a function name
	 *
	 * # Parameters
	 * * `name` - Function name to compute selector from
	 *
	 * # Returns
	 * Result containing selector as hex string or error
	 */
	export function getSelectorFromName(name: string): string;
	/**
	 * Computes the Starknet variant of Keccak hash
	 *
	 * # Parameters
	 * * `inputs` - Byte array to hash
	 *
	 * # Returns
	 * Result containing hash as hex string or error
	 */
	export function starknetKeccak(inputs: Uint8Array): string;
	/**
	 * Converts a short string to a Cairo field element
	 *
	 * # Parameters
	 * * `str` - String to convert
	 *
	 * # Returns
	 * Result containing field element as hex string or error
	 */
	export function cairoShortStringToFelt(str: string): string;
	/**
	 * Parses a Cairo field element into a short string
	 *
	 * # Parameters
	 * * `str` - Field element as hex string
	 *
	 * # Returns
	 * Result containing parsed string or error
	 */
	export function parseCairoShortString(str: string): string;
	/**
	 * Creates a new Torii client with the given configuration
	 *
	 * # Parameters
	 * * `config` - Client configuration including URLs and world address
	 *
	 * # Returns
	 * Result containing ToriiClient instance or error
	 */
	export function createClient(config: ClientConfig): Promise<ToriiClient>;
	/**
	 * The `ReadableStreamType` enum.
	 *
	 * *This API requires the following crate features to be activated: `ReadableStreamType`*
	 */
	type ReadableStreamType = "bytes";
	export type Tokens = Token[];
	
	export type TokenBalances = TokenBalance[];
	
	export interface Token {
	    contract_address: string;
	    name: string;
	    symbol: string;
	    decimals: number;
	    metadata: string;
	}
	
	export interface TokenBalance {
	    balance: string;
	    account_address: string;
	    contract_address: string;
	    token_id: string;
	}
	
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
	    order_by: OrderBy[];
	    entity_models: string[];
	    entity_updated_after: number;
	}
	
	export interface OrderBy {
	    model: string;
	    member: string;
	    direction: OrderDirection;
	}
	
	export type OrderDirection = "Asc" | "Desc";
	
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
	
	export class Account {
	  private constructor();
	  free(): void;
	  /**
	   * Returns the account's address
	   *
	   * # Returns
	   * Result containing address as hex string or error
	   */
	  address(): string;
	  /**
	   * Returns the account's chain ID
	   *
	   * # Returns
	   * Result containing chain ID as hex string or error
	   */
	  chainId(): string;
	  /**
	   * Sets the block ID for subsequent operations
	   *
	   * # Parameters
	   * * `block_id` - Block ID as hex string
	   *
	   * # Returns
	   * Result containing unit or error
	   */
	  setBlockId(block_id: string): void;
	  /**
	   * Executes a raw transaction
	   *
	   * # Parameters
	   * * `calldata` - Array of contract calls to execute
	   *
	   * # Returns
	   * Result containing transaction hash as hex string or error
	   */
	  executeRaw(calldata: (Call)[]): Promise<string>;
	  /**
	   * Deploys a burner wallet
	   *
	   * # Parameters
	   * * `private_key` - Private key for the burner wallet as hex string
	   *
	   * # Returns
	   * Result containing new Account instance or error
	   */
	  deployBurner(private_key: string): Promise<Account>;
	  /**
	   * Gets the current nonce for the account
	   *
	   * # Returns
	   * Result containing nonce as hex string or error
	   */
	  nonce(): Promise<string>;
	}
	export class IntoUnderlyingByteSource {
	  private constructor();
	  free(): void;
	  start(controller: ReadableByteStreamController): void;
	  pull(controller: ReadableByteStreamController): Promise<any>;
	  cancel(): void;
	  readonly type: ReadableStreamType;
	  readonly autoAllocateChunkSize: number;
	}
	export class IntoUnderlyingSink {
	  private constructor();
	  free(): void;
	  write(chunk: any): Promise<any>;
	  close(): Promise<any>;
	  abort(reason: any): Promise<any>;
	}
	export class IntoUnderlyingSource {
	  private constructor();
	  free(): void;
	  pull(controller: ReadableStreamDefaultController): Promise<any>;
	  cancel(): void;
	}
	export class Provider {
	  private constructor();
	  free(): void;
	  /**
	   * Creates a new account instance with the given private key and address
	   *
	   * # Parameters
	   * * `private_key` - Private key as hex string
	   * * `address` - Account address as hex string
	   *
	   * # Returns
	   * Result containing Account instance or error
	   */
	  createAccount(private_key: string, address: string): Promise<Account>;
	  /**
	   * Calls a Starknet contract view function
	   *
	   * # Parameters
	   * * `call` - Call parameters including contract address and function
	   * * `block_id` - Block identifier for the call
	   *
	   * # Returns
	   * Result containing array of field elements or error
	   */
	  call(call: Call, block_id: BlockId): Promise<Array<any>>;
	  /**
	   * Waits for a transaction to be confirmed
	   *
	   * # Parameters
	   * * `txn_hash` - Transaction hash as hex string
	   *
	   * # Returns
	   * Result containing success boolean or error
	   */
	  waitForTransaction(txn_hash: string): Promise<boolean>;
	}
	export class Subscription {
	  private constructor();
	  free(): void;
	  /**
	   * Cancels an active subscription
	   */
	  cancel(): void;
	}
	export class ToriiClient {
	  private constructor();
	  free(): void;
	  /**
	   * Gets token information for the given contract addresses
	   *
	   * # Parameters
	   * * `contract_addresses` - Array of contract addresses as hex strings
	   *
	   * # Returns
	   * Result containing token information or error
	   */
	  getTokens(contract_addresses: (string)[]): Promise<Tokens>;
	  /**
	   * Gets token balances for given accounts and contracts
	   *
	   * # Parameters
	   * * `account_addresses` - Array of account addresses as hex strings
	   * * `contract_addresses` - Array of contract addresses as hex strings
	   *
	   * # Returns
	   * Result containing token balances or error
	   */
	  getTokenBalances(account_addresses: (string)[], contract_addresses: (string)[]): Promise<TokenBalances>;
	  /**
	   * Queries entities based on the provided query parameters
	   *
	   * # Parameters
	   * * `query` - Query parameters for filtering entities
	   *
	   * # Returns
	   * Result containing matching entities or error
	   */
	  getEntities(query: Query): Promise<Entities>;
	  /**
	   * Gets all entities with pagination
	   *
	   * # Parameters
	   * * `limit` - Maximum number of entities to return
	   * * `offset` - Number of entities to skip
	   *
	   * # Returns
	   * Result containing paginated entities or error
	   */
	  getAllEntities(limit: number, offset: number): Promise<Entities>;
	  /**
	   * Gets event messages based on query parameters
	   *
	   * # Parameters
	   * * `query` - Query parameters for filtering messages
	   * * `historical` - Whether to include historical messages
	   *
	   * # Returns
	   * Result containing matching event messages or error
	   */
	  getEventMessages(query: Query, historical: boolean): Promise<Entities>;
	  /**
	   * Subscribes to entity updates
	   *
	   * # Parameters
	   * * `clauses` - Array of key clauses for filtering updates
	   * * `callback` - JavaScript function to call on updates
	   *
	   * # Returns
	   * Result containing subscription handle or error
	   */
	  onEntityUpdated(clauses: (EntityKeysClause)[], callback: Function): Promise<Subscription>;
	  /**
	   * Updates an existing entity subscription
	   *
	   * # Parameters
	   * * `subscription` - Existing subscription to update
	   * * `clauses` - New array of key clauses for filtering
	   *
	   * # Returns
	   * Result containing unit or error
	   */
	  updateEntitySubscription(subscription: Subscription, clauses: (EntityKeysClause)[]): Promise<void>;
	  /**
	   * Subscribes to event message updates
	   *
	   * # Parameters
	   * * `clauses` - Array of key clauses for filtering updates
	   * * `historical` - Whether to include historical messages
	   * * `callback` - JavaScript function to call on updates
	   *
	   * # Returns
	   * Result containing subscription handle or error
	   */
	  onEventMessageUpdated(clauses: (EntityKeysClause)[], historical: boolean, callback: Function): Promise<Subscription>;
	  /**
	   * Updates an existing event message subscription
	   *
	   * # Parameters
	   * * `subscription` - Existing subscription to update
	   * * `clauses` - New array of key clauses for filtering
	   * * `historical` - Whether to include historical messages
	   *
	   * # Returns
	   * Result containing unit or error
	   */
	  updateEventMessageSubscription(subscription: Subscription, clauses: (EntityKeysClause)[], historical: boolean): Promise<void>;
	  /**
	   * Subscribes to Starknet events
	   *
	   * # Parameters
	   * * `clauses` - Array of key clauses for filtering events
	   * * `callback` - JavaScript function to call on events
	   *
	   * # Returns
	   * Result containing subscription handle or error
	   */
	  onStarknetEvent(clauses: (EntityKeysClause)[], callback: Function): Promise<Subscription>;
	  /**
	   * Subscribes to indexer updates
	   *
	   * # Parameters
	   * * `contract_address` - Optional contract address to filter updates
	   * * `callback` - JavaScript function to call on updates
	   *
	   * # Returns
	   * Result containing subscription handle or error
	   */
	  onIndexerUpdated(contract_address: string | undefined, callback: Function): Promise<Subscription>;
	  /**
	   * Publishes a message to the network
	   *
	   * # Parameters
	   * * `message` - Message to publish as JSON string
	   * * `signature` - Array of signature field elements as hex strings
	   *
	   * # Returns
	   * Result containing message ID as byte array or error
	   */
	  publishMessage(message: string, signature: (string)[]): Promise<Uint8Array>;
	}
	
}

declare type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly clientconfig_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
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
  readonly toriiclient_getTokens: (a: number, b: number, c: number) => number;
  readonly toriiclient_getTokenBalances: (a: number, b: number, c: number, d: number, e: number) => number;
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
  readonly __wbg_toriiclient_free: (a: number, b: number) => void;
  readonly __wbg_provider_free: (a: number, b: number) => void;
  readonly __wbg_account_free: (a: number, b: number) => void;
  readonly __wbg_subscription_free: (a: number, b: number) => void;
  readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
  readonly intounderlyingbytesource_type: (a: number) => number;
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
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hdd36548e68818caf: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h57f21cd7c8b9ea8e: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h8e06c60ba0f5003f: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h8045929816b5fbae: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hae2f4ec6e71d3739: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf76e1f80e8c3e0a1: (a: number, b: number, c: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h49e145a35b1c793c: (a: number, b: number, c: number, d: number) => void;
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
