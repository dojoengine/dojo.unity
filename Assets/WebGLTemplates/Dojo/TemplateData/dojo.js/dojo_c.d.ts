declare namespace wasm_bindgen {
	/* tslint:disable */
	/* eslint-disable */
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
	export function getContractAddress(class_hash: string, salt: string, constructor_calldata: string[], deployer_address: string): string;
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
	 * Computes a Poseidon hash of the inputs
	 *
	 * # Parameters
	 * * `inputs` - Array of field elements as hex strings
	 *
	 * # Returns
	 * Result containing hash as hex string or error
	 */
	export function poseidonHash(inputs: string[]): string;
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
	 * The `ReadableStreamType` enum.
	 *
	 * *This API requires the following crate features to be activated: `ReadableStreamType`*
	 */
	type ReadableStreamType = "bytes";
	export interface Page<T> {
	    items: T[];
	    next_cursor: string | undefined;
	}
	
	export type WasmU256 = string;
	
	export type Controllers = Controller[];
	
	export interface Controller {
	    address: string;
	    username: string;
	    deployed_at_timestamp: number;
	}
	
	export type Tokens = Page<Token>;
	
	export type TokenBalances = Page<TokenBalance>;
	
	export interface Token {
	    contract_address: string;
	    token_id: string;
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
	
	export interface Entity {
	    hashed_keys: string;
	    models: Record<string, Model>;
	}
	
	export type Entities = Page<Entity>;
	
	export interface Call {
	    to: string;
	    selector: string;
	    calldata: string[];
	}
	
	export type BlockTag = "Latest" | "Pending";
	
	export type BlockId = { Hash: string } | { Number: number } | { BlockTag: BlockTag };
	
	export interface Query {
	    pagination: Pagination;
	    clause: Clause | undefined;
	    no_hashed_keys: boolean;
	    models: string[];
	    historical: boolean;
	}
	
	export interface Pagination {
	    limit: number;
	    cursor: string | undefined;
	    direction: PaginationDirection;
	    order_by: OrderBy[];
	}
	
	export type PaginationDirection = "Forward" | "Backward";
	
	export interface OrderBy {
	    model: string;
	    member: string;
	    direction: OrderDirection;
	}
	
	export type OrderDirection = "Asc" | "Desc";
	
	export type Clause = { HashedKeys: string[] } | { Keys: KeysClause } | { Member: MemberClause } | { Composite: CompositeClause };
	
	export type PatternMatching = "FixedLen" | "VariableLen";
	
	export interface KeysClause {
	    keys: (string | undefined)[];
	    pattern_matching: PatternMatching;
	    models: string[];
	}
	
	export type KeysClauses = KeysClause[];
	
	export type MemberValue = { Primitive: Primitive } | { String: string } | { List: MemberValue[] };
	
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
	
	export type ComparisonOperator = "Eq" | "Neq" | "Gt" | "Gte" | "Lt" | "Lte" | "In" | "NotIn";
	
	export interface Value {
	    primitive_type: Primitive;
	    value_type: ValueType;
	}
	
	export type ValueType = { String: string } | { Int: number } | { UInt: number } | { VBool: boolean } | { Bytes: number[] };
	
	export type Primitive = { I8: number | undefined } | { I16: number | undefined } | { I32: number | undefined } | { I64: number | undefined } | { I128: string | undefined } | { U8: number | undefined } | { U16: number | undefined } | { U32: number | undefined } | { U64: number | undefined } | { U128: string | undefined } | { U256: string | undefined } | { Bool: boolean | undefined } | { Felt252: string | undefined } | { ClassHash: string | undefined } | { ContractAddress: string | undefined } | { EthAddress: string | undefined };
	
	export interface Event {
	    keys: string[];
	    data: string[];
	    transaction_hash: string;
	}
	
	export class Account {
	  free(): void;
	  /**
	   * Creates a new account instance with the given private key and address
	   *
	   * # Parameters
	   * * `provider` - Provider instance
	   * * `private_key` - Private key as hex string
	   * * `address` - Account address as hex string
	   *
	   * # Returns
	   * Result containing Account instance or error
	   */
	  constructor(provider: Provider, private_key: string, address: string);
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
	  executeRaw(calldata: Call[]): Promise<string>;
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
	  /**
	   * Gets the provider of the account
	   *
	   * # Returns
	   * Result containing provider as hex string or error
	   */
	  provider(): Provider;
	}
	export class ByteArray {
	  free(): void;
	  /**
	   * Serializes a string into a Cairo byte array
	   *
	   * # Parameters
	   * * `str` - String to serialize
	   *
	   * # Returns
	   * Result containing array of field elements as hex strings or error
	   */
	  constructor(str: string);
	  /**
	   * Serializes a Cairo byte array into a vector of field elements as hex strings
	   *
	   * # Returns
	   * Result containing vector of field elements as hex strings or error
	   */
	  toRaw(): string[];
	  /**
	   * Deserializes a Cairo byte array into a string
	   *
	   * # Parameters
	   * * `felts` - Array of field elements as hex strings
	   *
	   * # Returns
	   * Result containing deserialized string or error
	   */
	  static fromRaw(felts: string[]): ByteArray;
	  /**
	   * Converts a Cairo byte array to a string
	   *
	   * # Returns
	   * Result containing string representation of the byte array or error
	   */
	  toString(): string;
	}
	export class ControllerAccount {
	  private constructor();
	  free(): void;
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
	  free(): void;
	  /**
	   * Creates a new Starknet provider instance for a given RPC URL
	   *
	   * # Parameters
	   * * `rpc_url` - URL of the RPC endpoint
	   *
	   * # Returns
	   * Result containing Provider instance or error
	   */
	  constructor(rpc_url: string);
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
	  /**
	   * Gets the chain id of the provider
	   *
	   * # Returns
	   * Result containing chain id as hex string or error
	   */
	  chainId(): Promise<string>;
	}
	export class SigningKey {
	  free(): void;
	  /**
	   * Generates a new random signing key
	   *
	   * # Returns
	   * Private key as hex string
	   */
	  constructor(secret_scalar: string);
	  /**
	   * Initializes a new signing key from a secret scalar
	   *
	   * # Parameters
	   * * `secret_scalar` - Secret scalar as hex string
	   *
	   * # Returns
	   * Result containing signing key or error
	   */
	  static fromRandom(): SigningKey;
	  /**
	   * Returns the secret scalar of the signing key
	   *
	   * # Returns
	   * Result containing secret scalar as hex string or error
	   */
	  secretScalar(): string;
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
	  sign(hash: string): Signature;
	  /**
	   * Returns the verifying key of the signing key
	   *
	   * # Returns
	   * Result containing verifying key or error
	   */
	  verifyingKey(): VerifyingKey;
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
	  free(): void;
	  /**
	   * Creates a new Torii client with the given configuration
	   *
	   * # Parameters
	   * * `config` - Client configuration including URLs and world address
	   *
	   * # Returns
	   * Result containing ToriiClient instance or error
	   */
	  constructor(config: ClientConfig);
	  /**
	   * Gets controllers along with their usernames for the given contract addresses
	   *
	   * # Parameters
	   * * `contract_addresses` - Array of contract addresses as hex strings. If empty, all
	   *   controllers will be returned.
	   *
	   * # Returns
	   * Result containing controllers or error
	   */
	  getControllers(contract_addresses: string[]): Promise<Controllers>;
	  /**
	   * Gets token information for the given contract addresses
	   *
	   * # Parameters
	   * * `contract_addresses` - Array of contract addresses as hex strings
	   * * `token_ids` - Array of token ids
	   * * `limit` - Maximum number of tokens to return
	   * * `cursor` - Cursor to start from
	   *
	   * # Returns
	   * Result containing token information or error
	   */
	  getTokens(contract_addresses?: string[] | null, token_ids?: WasmU256[] | null, limit?: number | null, cursor?: string | null): Promise<Tokens>;
	  /**
	   * Subscribes to token updates
	   *
	   * # Parameters
	   * * `contract_addresses` - Array of contract addresses as hex strings
	   * * `callback` - JavaScript function to call on updates
	   *
	   * # Returns
	   * Result containing subscription handle or error
	   */
	  onTokenUpdated(contract_addresses: string[] | null | undefined, token_ids: WasmU256[] | null | undefined, callback: Function): Subscription;
	  /**
	   * Gets token balances for given accounts and contracts
	   *
	   * # Parameters
	   * * `contract_addresses` - Array of contract addresses as hex strings
	   * * `account_addresses` - Array of account addresses as hex strings
	   * * `token_ids` - Array of token ids
	   * * `limit` - Maximum number of token balances to return
	   * * `cursor` - Cursor to start from
	   *
	   * # Returns
	   * Result containing token balances or error
	   */
	  getTokenBalances(contract_addresses?: string[] | null, account_addresses?: string[] | null, token_ids?: WasmU256[] | null, limit?: number | null, cursor?: string | null): Promise<TokenBalances>;
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
	   * * `cursor` - Cursor to start from
	   *
	   * # Returns
	   * Result containing paginated entities or error
	   */
	  getAllEntities(limit: number, cursor?: string | null): Promise<Entities>;
	  /**
	   * Gets event messages based on query parameters
	   *
	   * # Parameters
	   * * `query` - Query parameters for filtering messages
	   *
	   * # Returns
	   * Result containing matching event messages or error
	   */
	  getEventMessages(query: Query): Promise<Entities>;
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
	  onEntityUpdated(clause: Clause | null | undefined, callback: Function): Subscription;
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
	  updateEntitySubscription(subscription: Subscription, clause?: Clause | null): Promise<void>;
	  /**
	   * Subscribes to event message updates
	   *
	   * # Parameters
	   * * `clauses` - Array of key clauses for filtering updates
	   * * `callback` - JavaScript function to call on updates
	   *
	   * # Returns
	   * Result containing subscription handle or error
	   */
	  onEventMessageUpdated(clause: Clause | null | undefined, callback: Function): Subscription;
	  /**
	   * Updates an existing event message subscription
	   *
	   * # Parameters
	   * * `subscription` - Existing subscription to update
	   * * `clauses` - New array of key clauses for filtering
	   *
	   * # Returns
	   * Result containing unit or error
	   */
	  updateEventMessageSubscription(subscription: Subscription, clause?: Clause | null): Promise<void>;
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
	  onStarknetEvent(clauses: KeysClause[], callback: Function): Subscription;
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
	  onIndexerUpdated(contract_address: string | null | undefined, callback: Function): Subscription;
	  /**
	   * Subscribes to token balance updates
	   *
	   * # Parameters
	   * * `contract_addresses` - Array of contract addresses to filter (empty for all)
	   * * `account_addresses` - Array of account addresses to filter (empty for all)
	   * * `callback` - JavaScript function to call on updates
	   *
	   * # Returns
	   * Result containing subscription handle or error
	   */
	  onTokenBalanceUpdated(contract_addresses: string[] | null | undefined, account_addresses: string[] | null | undefined, token_ids: WasmU256[] | null | undefined, callback: Function): Subscription;
	  /**
	   * Updates an existing token balance subscription
	   *
	   * # Parameters
	   * * `subscription` - Existing subscription to update
	   * * `contract_addresses` - New array of contract addresses to filter
	   * * `account_addresses` - New array of account addresses to filter
	   *
	   * # Returns
	   * Result containing unit or error
	   */
	  updateTokenBalanceSubscription(subscription: Subscription, contract_addresses: string[], account_addresses: string[], token_ids: WasmU256[]): Promise<void>;
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
	  publishMessage(message: string, signature: string[]): Promise<Uint8Array>;
	}
	export class TypedData {
	  free(): void;
	  constructor(typed_data: string);
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
	  encode(address: string): string;
	}
	export class VerifyingKey {
	  free(): void;
	  /**
	   * Initializes a new verifying key from a scalar
	   *
	   * # Parameters
	   * * `verifying_key` - Verifying key as hex string
	   *
	   * # Returns
	   * Result containing verifying key or error
	   */
	  constructor(verifying_key: string);
	  /**
	   * Returns the scalar of the verifying key
	   *
	   * # Returns
	   * Result containing scalar as hex string or error
	   */
	  scalar(): string;
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
	  verify(hash: string, signature: Signature): boolean;
	}
	
}

declare type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_signingkey_free: (a: number, b: number) => void;
  readonly __wbg_verifyingkey_free: (a: number, b: number) => void;
  readonly __wbg_typeddata_free: (a: number, b: number) => void;
  readonly __wbg_bytearray_free: (a: number, b: number) => void;
  readonly signingkey_new: (a: number, b: number) => [number, number, number];
  readonly signingkey_fromRandom: () => [number, number, number];
  readonly signingkey_secretScalar: (a: number) => [number, number, number, number];
  readonly signingkey_sign: (a: number, b: number, c: number) => [number, number, number];
  readonly signingkey_verifyingKey: (a: number) => [number, number, number];
  readonly verifyingkey_new: (a: number, b: number) => [number, number, number];
  readonly verifyingkey_scalar: (a: number) => [number, number, number, number];
  readonly verifyingkey_verify: (a: number, b: number, c: number, d: any) => [number, number, number];
  readonly typeddata_new: (a: number, b: number) => [number, number, number];
  readonly typeddata_encode: (a: number, b: number, c: number) => [number, number, number, number];
  readonly provider_new: (a: number, b: number) => [number, number, number];
  readonly provider_call: (a: number, b: any, c: any) => any;
  readonly provider_waitForTransaction: (a: number, b: number, c: number) => any;
  readonly provider_chainId: (a: number) => any;
  readonly account_new: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly account_address: (a: number) => [number, number, number, number];
  readonly account_chainId: (a: number) => [number, number, number, number];
  readonly account_setBlockId: (a: number, b: number, c: number) => [number, number];
  readonly account_executeRaw: (a: number, b: number, c: number) => any;
  readonly account_deployBurner: (a: number, b: number, c: number) => any;
  readonly account_nonce: (a: number) => any;
  readonly account_provider: (a: number) => number;
  readonly getContractAddress: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => [number, number, number, number];
  readonly getSelectorFromTag: (a: number, b: number) => [number, number];
  readonly bytearray_new: (a: number, b: number) => [number, number, number];
  readonly bytearray_toRaw: (a: number) => [number, number, number, number];
  readonly bytearray_fromRaw: (a: number, b: number) => [number, number, number];
  readonly bytearray_toString: (a: number) => [number, number, number, number];
  readonly poseidonHash: (a: number, b: number) => [number, number, number, number];
  readonly getSelectorFromName: (a: number, b: number) => [number, number, number, number];
  readonly starknetKeccak: (a: any) => [number, number, number, number];
  readonly cairoShortStringToFelt: (a: number, b: number) => [number, number, number, number];
  readonly parseCairoShortString: (a: number, b: number) => [number, number, number, number];
  readonly toriiclient_new: (a: any) => any;
  readonly toriiclient_getControllers: (a: number, b: number, c: number) => any;
  readonly toriiclient_getTokens: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => any;
  readonly toriiclient_onTokenUpdated: (a: number, b: number, c: number, d: number, e: number, f: any) => [number, number, number];
  readonly toriiclient_getTokenBalances: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => any;
  readonly toriiclient_getEntities: (a: number, b: any) => any;
  readonly toriiclient_getAllEntities: (a: number, b: number, c: number, d: number) => any;
  readonly toriiclient_getEventMessages: (a: number, b: any) => any;
  readonly toriiclient_onEntityUpdated: (a: number, b: number, c: any) => [number, number, number];
  readonly toriiclient_updateEntitySubscription: (a: number, b: number, c: number) => any;
  readonly toriiclient_onEventMessageUpdated: (a: number, b: number, c: any) => [number, number, number];
  readonly toriiclient_updateEventMessageSubscription: (a: number, b: number, c: number) => any;
  readonly toriiclient_onStarknetEvent: (a: number, b: number, c: number, d: any) => [number, number, number];
  readonly toriiclient_onIndexerUpdated: (a: number, b: number, c: number, d: any) => [number, number, number];
  readonly toriiclient_onTokenBalanceUpdated: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: any) => [number, number, number];
  readonly toriiclient_updateTokenBalanceSubscription: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => any;
  readonly toriiclient_publishMessage: (a: number, b: number, c: number, d: number, e: number) => any;
  readonly subscription_cancel: (a: number) => void;
  readonly __wbg_toriiclient_free: (a: number, b: number) => void;
  readonly __wbg_provider_free: (a: number, b: number) => void;
  readonly __wbg_account_free: (a: number, b: number) => void;
  readonly __wbg_controlleraccount_free: (a: number, b: number) => void;
  readonly __wbg_subscription_free: (a: number, b: number) => void;
  readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
  readonly intounderlyingbytesource_type: (a: number) => number;
  readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
  readonly intounderlyingbytesource_start: (a: number, b: any) => void;
  readonly intounderlyingbytesource_pull: (a: number, b: any) => any;
  readonly intounderlyingbytesource_cancel: (a: number) => void;
  readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
  readonly intounderlyingsource_pull: (a: number, b: any) => any;
  readonly intounderlyingsource_cancel: (a: number) => void;
  readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
  readonly intounderlyingsink_write: (a: number, b: any) => any;
  readonly intounderlyingsink_close: (a: number) => any;
  readonly intounderlyingsink_abort: (a: number, b: any) => any;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_4: WebAssembly.Table;
  readonly __wbindgen_export_5: WebAssembly.Table;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h25a2d6c0cac360bc: (a: number, b: number) => void;
  readonly closure1136_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure1161_externref_shim: (a: number, b: number, c: any) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hfd0262bcce7a58a4: (a: number, b: number) => void;
  readonly closure2502_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure2678_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
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
