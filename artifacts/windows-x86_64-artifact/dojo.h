#include <stdarg.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

#ifdef __cplusplus
namespace dojo_bindings {
#endif  // __cplusplus

struct ToriiClient;
struct Policy;
struct ControllerAccount;
struct Call;
struct Controller;
struct OrderBy;
struct Entity;
struct COptionFieldElement;
struct Model;
struct Transaction;
struct Subscription;
struct TransactionCall;
struct Struct;
struct Token;
struct TokenBalance;
struct TokenCollection;
struct Provider;
struct Account;
struct Ty;
struct Member;
struct EnumOption;

typedef enum BlockTag {
  Latest,
  Pending,
} BlockTag;

typedef enum CallType {
  Execute,
  ExecuteFromOutside,
} CallType;

typedef enum ComparisonOperator {
  Eq,
  Neq,
  Gt,
  Gte,
  Lt,
  Lte,
  In,
  NotIn,
} ComparisonOperator;

typedef enum LogicalOperator {
  And,
  Or,
} LogicalOperator;

typedef enum OrderDirection {
  Asc,
  Desc,
} OrderDirection;

typedef enum PaginationDirection {
  Forward,
  Backward,
} PaginationDirection;

typedef enum PatternMatching {
  FixedLen = 0,
  VariableLen = 1,
} PatternMatching;

typedef struct Error {
  char *message;
} Error;

typedef enum ResultToriiClient_Tag {
  OkToriiClient,
  ErrToriiClient,
} ResultToriiClient_Tag;

typedef struct ResultToriiClient {
  ResultToriiClient_Tag tag;
  union {
    struct {
      struct ToriiClient *ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultToriiClient;

typedef struct FieldElement {
  uint8_t data[32];
} FieldElement;

typedef enum ResultControllerAccount_Tag {
  OkControllerAccount,
  ErrControllerAccount,
} ResultControllerAccount_Tag;

typedef struct ResultControllerAccount {
  ResultControllerAccount_Tag tag;
  union {
    struct {
      struct ControllerAccount *ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultControllerAccount;

typedef enum Resultbool_Tag {
  Okbool,
  Errbool,
} Resultbool_Tag;

typedef struct Resultbool {
  Resultbool_Tag tag;
  union {
    struct {
      bool ok;
    };
    struct {
      struct Error err;
    };
  };
} Resultbool;

typedef enum ResultFieldElement_Tag {
  OkFieldElement,
  ErrFieldElement,
} ResultFieldElement_Tag;

typedef struct ResultFieldElement {
  ResultFieldElement_Tag tag;
  union {
    struct {
      struct FieldElement ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultFieldElement;

typedef struct CArrayFieldElement {
  struct FieldElement *data;
  uintptr_t data_len;
} CArrayFieldElement;

typedef struct Message {
  const char *message;
  struct CArrayFieldElement signature;
} Message;

typedef enum ResultCArrayFieldElement_Tag {
  OkCArrayFieldElement,
  ErrCArrayFieldElement,
} ResultCArrayFieldElement_Tag;

typedef struct ResultCArrayFieldElement {
  ResultCArrayFieldElement_Tag tag;
  union {
    struct {
      struct CArrayFieldElement ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultCArrayFieldElement;

typedef struct CArrayController {
  struct Controller *data;
  uintptr_t data_len;
} CArrayController;

typedef enum COptionc_char_Tag {
  Somec_char,
  Nonec_char,
} COptionc_char_Tag;

typedef struct COptionc_char {
  COptionc_char_Tag tag;
  union {
    struct {
      const char *some;
    };
  };
} COptionc_char;

typedef struct PageController {
  struct CArrayController items;
  struct COptionc_char next_cursor;
} PageController;

typedef enum ResultPageController_Tag {
  OkPageController,
  ErrPageController,
} ResultPageController_Tag;

typedef struct ResultPageController {
  ResultPageController_Tag tag;
  union {
    struct {
      struct PageController ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultPageController;

typedef enum COptionu32_Tag {
  Someu32,
  Noneu32,
} COptionu32_Tag;

typedef struct COptionu32 {
  COptionu32_Tag tag;
  union {
    struct {
      uint32_t some;
    };
  };
} COptionu32;

typedef struct CArrayOrderBy {
  struct OrderBy *data;
  uintptr_t data_len;
} CArrayOrderBy;

typedef struct Pagination {
  struct COptionc_char cursor;
  struct COptionu32 limit;
  enum PaginationDirection direction;
  struct CArrayOrderBy order_by;
} Pagination;

typedef struct CArrayc_char {
  const char **data;
  uintptr_t data_len;
} CArrayc_char;

typedef struct ControllerQuery {
  struct Pagination pagination;
  struct CArrayFieldElement contract_addresses;
  struct CArrayc_char usernames;
} ControllerQuery;

typedef struct CArrayEntity {
  struct Entity *data;
  uintptr_t data_len;
} CArrayEntity;

typedef struct PageEntity {
  struct CArrayEntity items;
  struct COptionc_char next_cursor;
} PageEntity;

typedef enum ResultPageEntity_Tag {
  OkPageEntity,
  ErrPageEntity,
} ResultPageEntity_Tag;

typedef struct ResultPageEntity {
  ResultPageEntity_Tag tag;
  union {
    struct {
      struct PageEntity ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultPageEntity;

typedef struct CArrayCOptionFieldElement {
  struct COptionFieldElement *data;
  uintptr_t data_len;
} CArrayCOptionFieldElement;

typedef struct KeysClause {
  struct CArrayCOptionFieldElement keys;
  enum PatternMatching pattern_matching;
  struct CArrayc_char models;
} KeysClause;

typedef struct U256 {
  uint8_t data[32];
} U256;

typedef enum Primitive_Tag {
  I8,
  I16,
  I32,
  I64,
  I128,
  U8,
  U16,
  U32,
  U64,
  U128,
  U256_,
  Bool,
  Felt252,
  ClassHash,
  ContractAddress,
  EthAddress,
} Primitive_Tag;

typedef struct Primitive {
  Primitive_Tag tag;
  union {
    struct {
      int8_t i8;
    };
    struct {
      int16_t i16;
    };
    struct {
      int32_t i32;
    };
    struct {
      int64_t i64;
    };
    struct {
      uint8_t i128[16];
    };
    struct {
      uint8_t u8;
    };
    struct {
      uint16_t u16;
    };
    struct {
      uint32_t u32;
    };
    struct {
      uint64_t u64;
    };
    struct {
      uint8_t u128[16];
    };
    struct {
      struct U256 u256;
    };
    struct {
      bool bool_;
    };
    struct {
      struct FieldElement felt252;
    };
    struct {
      struct FieldElement class_hash;
    };
    struct {
      struct FieldElement contract_address;
    };
    struct {
      struct FieldElement eth_address;
    };
  };
} Primitive;

typedef struct CArrayMemberValue {
  struct MemberValue *data;
  uintptr_t data_len;
} CArrayMemberValue;

typedef enum MemberValue_Tag {
  PrimitiveValue,
  String,
  List,
} MemberValue_Tag;

typedef struct MemberValue {
  MemberValue_Tag tag;
  union {
    struct {
      struct Primitive primitive_value;
    };
    struct {
      const char *string;
    };
    struct {
      struct CArrayMemberValue list;
    };
  };
} MemberValue;

typedef struct MemberClause {
  const char *model;
  const char *member;
  enum ComparisonOperator operator_;
  struct MemberValue value;
} MemberClause;

typedef struct CArrayClause {
  struct Clause *data;
  uintptr_t data_len;
} CArrayClause;

typedef struct CompositeClause {
  enum LogicalOperator operator_;
  struct CArrayClause clauses;
} CompositeClause;

typedef enum Clause_Tag {
  HashedKeys,
  Keys,
  CMember,
  Composite,
} Clause_Tag;

typedef struct Clause {
  Clause_Tag tag;
  union {
    struct {
      struct CArrayFieldElement hashed_keys;
    };
    struct {
      struct KeysClause keys;
    };
    struct {
      struct MemberClause c_member;
    };
    struct {
      struct CompositeClause composite;
    };
  };
} Clause;

typedef enum COptionClause_Tag {
  SomeClause,
  NoneClause,
} COptionClause_Tag;

typedef struct COptionClause {
  COptionClause_Tag tag;
  union {
    struct {
      struct Clause some;
    };
  };
} COptionClause;

typedef struct Query {
  struct Pagination pagination;
  struct COptionClause clause;
  bool no_hashed_keys;
  struct CArrayc_char models;
  bool historical;
} Query;

typedef struct CArrayModel {
  struct Model *data;
  uintptr_t data_len;
} CArrayModel;

typedef struct World {
  struct FieldElement world_address;
  struct CArrayModel models;
} World;

typedef enum ResultWorld_Tag {
  OkWorld,
  ErrWorld,
} ResultWorld_Tag;

typedef struct ResultWorld {
  ResultWorld_Tag tag;
  union {
    struct {
      struct World ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultWorld;

typedef struct CArrayTransaction {
  struct Transaction *data;
  uintptr_t data_len;
} CArrayTransaction;

typedef struct PageTransaction {
  struct CArrayTransaction items;
  struct COptionc_char next_cursor;
} PageTransaction;

typedef enum ResultPageTransaction_Tag {
  OkPageTransaction,
  ErrPageTransaction,
} ResultPageTransaction_Tag;

typedef struct ResultPageTransaction {
  ResultPageTransaction_Tag tag;
  union {
    struct {
      struct PageTransaction ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultPageTransaction;

typedef enum COptionu64_Tag {
  Someu64,
  Noneu64,
} COptionu64_Tag;

typedef struct COptionu64 {
  COptionu64_Tag tag;
  union {
    struct {
      uint64_t some;
    };
  };
} COptionu64;

typedef struct TransactionFilter {
  struct CArrayFieldElement transaction_hashes;
  struct CArrayFieldElement caller_addresses;
  struct CArrayFieldElement contract_addresses;
  struct CArrayc_char entrypoints;
  struct CArrayFieldElement model_selectors;
  struct COptionu64 from_block;
  struct COptionu64 to_block;
} TransactionFilter;

typedef enum COptionTransactionFilter_Tag {
  SomeTransactionFilter,
  NoneTransactionFilter,
} COptionTransactionFilter_Tag;

typedef struct COptionTransactionFilter {
  COptionTransactionFilter_Tag tag;
  union {
    struct {
      struct TransactionFilter some;
    };
  };
} COptionTransactionFilter;

typedef struct TransactionQuery {
  struct COptionTransactionFilter filter;
  struct Pagination pagination;
} TransactionQuery;

typedef enum ResultSubscription_Tag {
  OkSubscription,
  ErrSubscription,
} ResultSubscription_Tag;

typedef struct ResultSubscription {
  ResultSubscription_Tag tag;
  union {
    struct {
      struct Subscription *ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultSubscription;

typedef struct CArrayTransactionCall {
  struct TransactionCall *data;
  uintptr_t data_len;
} CArrayTransactionCall;

typedef struct Transaction {
  struct FieldElement transaction_hash;
  struct FieldElement sender_address;
  struct CArrayFieldElement calldata;
  struct FieldElement max_fee;
  struct CArrayFieldElement signature;
  struct FieldElement nonce;
  uint64_t block_number;
  const char *transaction_type;
  uint64_t block_timestamp;
  struct CArrayTransactionCall calls;
  struct CArrayFieldElement unique_models;
} Transaction;

typedef struct CArrayStruct {
  struct Struct *data;
  uintptr_t data_len;
} CArrayStruct;

typedef struct Event {
  struct CArrayFieldElement keys;
  struct CArrayFieldElement data;
  struct FieldElement transaction_hash;
} Event;

typedef struct CArrayToken {
  struct Token *data;
  uintptr_t data_len;
} CArrayToken;

typedef struct PageToken {
  struct CArrayToken items;
  struct COptionc_char next_cursor;
} PageToken;

typedef enum ResultPageToken_Tag {
  OkPageToken,
  ErrPageToken,
} ResultPageToken_Tag;

typedef struct ResultPageToken {
  ResultPageToken_Tag tag;
  union {
    struct {
      struct PageToken ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultPageToken;

typedef struct CArrayU256 {
  struct U256 *data;
  uintptr_t data_len;
} CArrayU256;

typedef struct TokenQuery {
  struct CArrayFieldElement contract_addresses;
  struct CArrayU256 token_ids;
  struct Pagination pagination;
} TokenQuery;

typedef struct Token {
  struct FieldElement contract_address;
  struct U256 token_id;
  const char *name;
  const char *symbol;
  uint8_t decimals;
  const char *metadata;
} Token;

typedef struct CArrayTokenBalance {
  struct TokenBalance *data;
  uintptr_t data_len;
} CArrayTokenBalance;

typedef struct PageTokenBalance {
  struct CArrayTokenBalance items;
  struct COptionc_char next_cursor;
} PageTokenBalance;

typedef enum ResultPageTokenBalance_Tag {
  OkPageTokenBalance,
  ErrPageTokenBalance,
} ResultPageTokenBalance_Tag;

typedef struct ResultPageTokenBalance {
  ResultPageTokenBalance_Tag tag;
  union {
    struct {
      struct PageTokenBalance ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultPageTokenBalance;

typedef struct TokenBalanceQuery {
  struct CArrayFieldElement contract_addresses;
  struct CArrayFieldElement account_addresses;
  struct CArrayU256 token_ids;
  struct Pagination pagination;
} TokenBalanceQuery;

typedef struct CArrayTokenCollection {
  struct TokenCollection *data;
  uintptr_t data_len;
} CArrayTokenCollection;

typedef struct PageTokenCollection {
  struct CArrayTokenCollection items;
  struct COptionc_char next_cursor;
} PageTokenCollection;

typedef enum ResultPageTokenCollection_Tag {
  OkPageTokenCollection,
  ErrPageTokenCollection,
} ResultPageTokenCollection_Tag;

typedef struct ResultPageTokenCollection {
  ResultPageTokenCollection_Tag tag;
  union {
    struct {
      struct PageTokenCollection ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultPageTokenCollection;

typedef struct IndexerUpdate {
  int64_t head;
  int64_t tps;
  int64_t last_block_timestamp;
  struct FieldElement contract_address;
} IndexerUpdate;

typedef struct TokenBalance {
  struct U256 balance;
  struct FieldElement account_address;
  struct FieldElement contract_address;
  struct U256 token_id;
} TokenBalance;

typedef enum Resultc_char_Tag {
  Okc_char,
  Errc_char,
} Resultc_char_Tag;

typedef struct Resultc_char {
  Resultc_char_Tag tag;
  union {
    struct {
      const char *ok;
    };
    struct {
      struct Error err;
    };
  };
} Resultc_char;

typedef struct Signature {
  /**
   * The `r` value of a signature
   */
  struct FieldElement r;
  /**
   * The `s` value of a signature
   */
  struct FieldElement s;
} Signature;

typedef enum ResultSignature_Tag {
  OkSignature,
  ErrSignature,
} ResultSignature_Tag;

typedef struct ResultSignature {
  ResultSignature_Tag tag;
  union {
    struct {
      struct Signature ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultSignature;

typedef enum ResultProvider_Tag {
  OkProvider,
  ErrProvider,
} ResultProvider_Tag;

typedef struct ResultProvider {
  ResultProvider_Tag tag;
  union {
    struct {
      struct Provider *ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultProvider;

typedef enum ResultAccount_Tag {
  OkAccount,
  ErrAccount,
} ResultAccount_Tag;

typedef struct ResultAccount {
  ResultAccount_Tag tag;
  union {
    struct {
      struct Account *ok;
    };
    struct {
      struct Error err;
    };
  };
} ResultAccount;

typedef struct Call {
  struct FieldElement to;
  const char *selector;
  struct CArrayFieldElement calldata;
} Call;

/**
 * Block hash, number or tag
 */
typedef enum BlockId_Tag {
  Hash,
  Number,
  BlockTag_,
} BlockId_Tag;

typedef struct BlockId {
  BlockId_Tag tag;
  union {
    struct {
      struct FieldElement hash;
    };
    struct {
      uint64_t number;
    };
    struct {
      enum BlockTag block_tag;
    };
  };
} BlockId;

typedef struct Policy {
  struct FieldElement target;
  const char *method;
  const char *description;
} Policy;

typedef struct Controller {
  struct FieldElement address;
  const char *username;
  uint64_t deployed_at_timestamp;
} Controller;

typedef struct OrderBy {
  const char *field;
  enum OrderDirection direction;
} OrderBy;

typedef struct Entity {
  struct FieldElement hashed_keys;
  struct CArrayStruct models;
} Entity;

typedef enum COptionFieldElement_Tag {
  SomeFieldElement,
  NoneFieldElement,
} COptionFieldElement_Tag;

typedef struct COptionFieldElement {
  COptionFieldElement_Tag tag;
  union {
    struct {
      struct FieldElement some;
    };
  };
} COptionFieldElement;

typedef struct CArrayMember {
  struct Member *data;
  uintptr_t data_len;
} CArrayMember;

typedef struct Struct {
  const char *name;
  struct CArrayMember children;
} Struct;

typedef struct CArrayEnumOption {
  struct EnumOption *data;
  uintptr_t data_len;
} CArrayEnumOption;

typedef struct Enum {
  const char *name;
  uint8_t option;
  struct CArrayEnumOption options;
} Enum;

typedef struct CArrayTy {
  struct Ty *data;
  uintptr_t data_len;
} CArrayTy;

typedef enum Ty_Tag {
  Primitive_,
  Struct_,
  Enum_,
  Tuple_,
  Array_,
  ByteArray,
} Ty_Tag;

typedef struct Ty {
  Ty_Tag tag;
  union {
    struct {
      struct Primitive primitive;
    };
    struct {
      struct Struct struct_;
    };
    struct {
      struct Enum enum_;
    };
    struct {
      struct CArrayTy tuple;
    };
    struct {
      struct CArrayTy array;
    };
    struct {
      const char *byte_array;
    };
  };
} Ty;

typedef struct Model {
  struct Ty schema;
  const char *namespace_;
  const char *name;
  struct FieldElement selector;
  uint32_t packed_size;
  uint32_t unpacked_size;
  struct FieldElement class_hash;
  struct FieldElement contract_address;
  const char *layout;
} Model;

typedef struct TransactionCall {
  struct FieldElement contract_address;
  const char *entrypoint;
  struct CArrayFieldElement calldata;
  enum CallType call_type;
  struct FieldElement caller_address;
} TransactionCall;

typedef struct TokenCollection {
  struct FieldElement contract_address;
  const char *name;
  const char *symbol;
  uint8_t decimals;
  uint32_t count;
  const char *metadata;
} TokenCollection;

typedef struct Member {
  const char *name;
  struct Ty *ty;
  bool key;
} Member;

typedef struct EnumOption {
  const char *name;
  struct Ty *ty;
} EnumOption;

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

/**
 * Creates a new Torii client instance
 *
 * # Parameters
 * * `torii_url` - URL of the Torii server
 * * `libp2p_relay_url` - URL of the libp2p relay server
 * * `world` - World address as a FieldElement
 *
 * # Returns
 * Result containing pointer to new ToriiClient instance or error
 */
struct ResultToriiClient client_new(const char *torii_url, struct FieldElement world);

/**
 * Initiates a connection to establish a new session account
 *
 * This function:
 * 1. Generates a new signing key pair
 * 2. Starts a local HTTP server to receive the callback
 * 3. Opens the keychain session URL in browser
 * 4. Waits for callback with session details
 * 5. Creates and stores the session
 * 6. Calls the provided callback with the new session account
 *
 * # Safety
 * This function is marked as unsafe because it:
 * - Handles raw C pointers
 * - Performs FFI operations
 * - Creates system-level resources (HTTP server, keyring entries)
 *
 * # Parameters
 * * `rpc_url` - Pointer to null-terminated string containing the RPC endpoint URL
 * * `policies` - Pointer to array of Policy structs defining session permissions
 * * `policies_len` - Length of the policies array
 * * `account_callback` - Function pointer called with the new session account when ready
 *
 * # Example
 * ```c
 * void on_account(SessionAccount* account) {
 *     // Handle new session account
 * }
 *
 * controller_connect(
 *     "https://rpc.example.com",
 *     policies,
 *     policies_length,
 *     on_account
 * );
 * ```
 */
void controller_connect(const char *rpc_url,
                        const struct Policy *policies,
                        uintptr_t policies_len,
                        void (*account_callback)(struct ControllerAccount*));

/**
 * Retrieves a stored session account if one exists and is valid
 *
 * # Parameters
 * * `policies` - Array of policies to match the session
 * * `policies_len` - Length of policies array
 * * `chain_id` - Chain ID to verify against
 *
 * # Returns
 * Result containing pointer to SessionAccount or error if no valid account exists
 */
struct ResultControllerAccount controller_account(const struct Policy *policies,
                                                  uintptr_t policies_len,
                                                  struct FieldElement chain_id);

/**
 * Clears sessions matching the specified policies and chain ID
 *
 * # Parameters
 * * `policies` - Array of policies to match
 * * `policies_len` - Length of policies array
 * * `chain_id` - Chain ID to match
 *
 * # Returns
 * Result containing success boolean or error
 */
struct Resultbool controller_clear(const struct Policy *policies,
                                   uintptr_t policies_len,
                                   struct FieldElement chain_id);

/**
 * Gets the username of controller
 *
 * # Parameters
 * * `account` - Pointer to Account
 *
 * # Returns
 * CString containing the username
 */
const char *controller_username(struct ControllerAccount *controller);

/**
 * Gets account address
 *
 * # Parameters
 * * `account` - Pointer to Account
 *
 * # Returns
 * FieldElement containing the account address
 */
struct FieldElement controller_address(struct ControllerAccount *controller);

/**
 * Gets account chain ID
 *
 * # Parameters
 * * `account` - Pointer to Account
 *
 * # Returns
 * FieldElement containing the chain ID
 */
struct FieldElement controller_chain_id(struct ControllerAccount *controller);

/**
 * Gets account nonce
 *
 * # Parameters
 * * `account` - Pointer to Account
 *
 * # Returns
 * Result containing FieldElement nonce or error
 */
struct ResultFieldElement controller_nonce(struct ControllerAccount *controller);

/**
 * Executes raw transaction
 *
 * # Parameters
 * * `account` - Pointer to Account
 * * `calldata` - Array of Call structs
 * * `calldata_len` - Length of calldata array
 *
 * # Returns
 * Result containing transaction hash as FieldElement or error
 */
struct ResultFieldElement controller_execute_raw(struct ControllerAccount *controller,
                                                 const struct Call *calldata,
                                                 uintptr_t calldata_len);

/**
 * Executes a transaction from outside (paymaster)
 *
 * # Parameters
 * * `account` - Pointer to Account
 * * `calldata` - Array of Call structs
 * * `calldata_len` - Length of calldata array
 *
 * # Returns
 * Result containing transaction hash as FieldElement or error
 */
struct ResultFieldElement controller_execute_from_outside(struct ControllerAccount *controller,
                                                          const struct Call *calldata,
                                                          uintptr_t calldata_len);

/**
 * Sets a logger callback function for the client
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `logger` - Callback function that takes a C string parameter
 */
void client_set_logger(struct ToriiClient *client, void (*logger)(const char*));

/**
 * Publishes a message to the network
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `message` - JSON string containing typed data message
 * * `signature_felts` - Array of field elements containing signature
 * * `signature_felts_len` - Length of signature array
 *
 * # Returns
 * Result containing byte array or error
 */
struct ResultFieldElement client_publish_message(struct ToriiClient *client,
                                                 struct Message message);

/**
 * Publishes multiple messages to the network
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `messages` - Array of Message structs
 * * `messages_len` - Length of messages array
 *
 * # Returns
 * Result containing array of message IDs or error
 */
struct ResultCArrayFieldElement client_publish_message_batch(struct ToriiClient *client,
                                                             const struct Message *messages,
                                                             uintptr_t messages_len);

/**
 * Retrieves controllers for the given contract addresses
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `contract_addresses` - Array of contract addresses. If empty, all controllers will be
 *   returned.
 *
 * # Returns
 * Result containing controllers or error
 */
struct ResultPageController client_controllers(struct ToriiClient *client,
                                               struct ControllerQuery query);

/**
 * Queries entities matching given criteria
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `query` - Query parameters
 *
 * # Returns
 * Result containing array of matching entities or error
 */
struct ResultPageEntity client_entities(struct ToriiClient *client, struct Query query);

/**
 * Retrieves event messages matching the given query
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `query` - Query parameters
 * * `historical` - Whether to include historical messages
 *
 * # Returns
 * Result containing array of matching event message entities or error
 */
struct ResultPageEntity client_event_messages(struct ToriiClient *client, struct Query query);

/**
 * Gets the world metadata for the client
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 *
 * # Returns
 * World structure containing world information
 */
struct ResultWorld client_metadata(struct ToriiClient *client);

/**
 * Retrieves transactions matching the given query
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `query` - Query parameters
 *
 * # Returns
 * Result containing array of matching transactions or error
 */
struct ResultPageTransaction client_transactions(struct ToriiClient *client,
                                                 struct TransactionQuery query);

/**
 * Subscribes to transaction updates
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `filter` - Filter parameters
 * * `callback` - Function called when updates occur
 *
 * # Returns
 * Result containing pointer to Subscription or error
 */
struct ResultSubscription client_on_transaction(struct ToriiClient *client,
                                                struct COptionTransactionFilter filter,
                                                void (*callback)(struct Transaction));

/**
 * Subscribes to entity state updates
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `clauses` - Array of entity key clauses to filter updates
 * * `clauses_len` - Length of clauses array
 * * `callback` - Function called when updates occur
 *
 * # Returns
 * Result containing pointer to Subscription or error
 */
struct ResultSubscription client_on_entity_state_update(struct ToriiClient *client,
                                                        struct COptionClause clause,
                                                        void (*callback)(struct FieldElement,
                                                                         struct CArrayStruct));

/**
 * Updates an existing entity subscription with new clauses
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `subscription` - Pointer to existing Subscription
 * * `clauses` - New array of entity key clauses
 * * `clauses_len` - Length of new clauses array
 *
 * # Returns
 * Result containing success boolean or error
 */
struct Resultbool client_update_entity_subscription(struct ToriiClient *client,
                                                    struct Subscription *subscription,
                                                    struct COptionClause clause);

/**
 * Subscribes to event message updates
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `clauses` - Array of entity key clauses to filter updates
 * * `clauses_len` - Length of clauses array
 * * `callback` - Function called when updates occur
 *
 * # Returns
 * Result containing pointer to Subscription or error
 */
struct ResultSubscription client_on_event_message_update(struct ToriiClient *client,
                                                         struct COptionClause clause,
                                                         void (*callback)(struct FieldElement,
                                                                          struct CArrayStruct));

/**
 * Updates an existing event message subscription
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `subscription` - Pointer to existing Subscription
 * * `clauses` - New array of entity key clauses
 * * `clauses_len` - Length of new clauses array
 *
 * # Returns
 * Result containing success boolean or error
 */
struct Resultbool client_update_event_message_subscription(struct ToriiClient *client,
                                                           struct Subscription *subscription,
                                                           struct COptionClause clause);

/**
 * Subscribes to Starknet events
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `clauses` - Array of entity key clauses to filter events
 * * `clauses_len` - Length of clauses array
 * * `callback` - Function called when events occur
 *
 * # Returns
 * Result containing pointer to Subscription or error
 */
struct ResultSubscription client_on_starknet_event(struct ToriiClient *client,
                                                   const struct KeysClause *clauses,
                                                   uintptr_t clauses_len,
                                                   void (*callback)(struct Event));

/**
 * Retrieves token information for given contract addresses
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `contract_addresses` - Array of contract addresses
 * * `contract_addresses_len` - Length of addresses array
 * * `token_ids` - Array of token ids
 * * `token_ids_len` - Length of token ids array
 * * `limit` - Maximum number of tokens to return
 * * `cursor` - Cursor to start from
 *
 * # Returns
 * Result containing array of Token information or error
 */
struct ResultPageToken client_tokens(struct ToriiClient *client, struct TokenQuery query);

/**
 * Subscribes to token updates
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `contract_addresses` - Array of contract addresses
 * * `callback` - Function called when updates occur
 *
 * # Returns
 * Result containing pointer to Subscription or error
 */
struct ResultSubscription client_on_token_update(struct ToriiClient *client,
                                                 const struct FieldElement *contract_addresses,
                                                 uintptr_t contract_addresses_len,
                                                 const struct U256 *token_ids,
                                                 uintptr_t token_ids_len,
                                                 void (*callback)(struct Token));

/**
 * Gets token balances for given accounts and contracts
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `contract_addresses` - Array of contract addresses
 * * `contract_addresses_len` - Length of contract addresses array
 * * `account_addresses` - Array of account addresses
 * * `account_addresses_len` - Length of account addresses array
 * * `token_ids` - Array of token ids
 * * `token_ids_len` - Length of token ids array
 * * `limit` - Maximum number of token balances to return
 * * `cursor` - Cursor to start from
 *
 * # Returns
 * Result containing array of TokenBalance information or error
 */
struct ResultPageTokenBalance client_token_balances(struct ToriiClient *client,
                                                    struct TokenBalanceQuery query);

/**
 * Gets token collections for given accounts and contracts
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `contract_addresses` - Array of contract addresses
 * * `contract_addresses_len` - Length of contract addresses array
 * * `account_addresses` - Array of account addresses
 * * `account_addresses_len` - Length of account addresses array
 * * `token_ids` - Array of token ids
 * * `token_ids_len` - Length of token ids array
 * * `limit` - Maximum number of token balances to return
 * * `cursor` - Cursor to start from
 *
 * # Returns
 * Result containing array of TokenBalance information or error
 */
struct ResultPageTokenCollection client_token_collections(struct ToriiClient *client,
                                                          struct TokenBalanceQuery query);

/**
 * Subscribes to indexer updates
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `contract_address` - Optional contract address to filter updates
 * * `callback` - Function called when updates occur
 *
 * # Returns
 * Result containing pointer to Subscription or error
 */
struct ResultSubscription on_indexer_update(struct ToriiClient *client,
                                            const struct FieldElement *contract_address,
                                            void (*callback)(struct IndexerUpdate));

/**
 * Subscribes to token balance updates
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `contract_addresses` - Array of contract addresses to filter (empty for all)
 * * `contract_addresses_len` - Length of contract addresses array
 * * `account_addresses` - Array of account addresses to filter (empty for all)
 * * `account_addresses_len` - Length of account addresses array
 * * `callback` - Function called when updates occur
 *
 * # Returns
 * Result containing pointer to Subscription or error
 */
struct ResultSubscription client_on_token_balance_update(struct ToriiClient *client,
                                                         const struct FieldElement *contract_addresses,
                                                         uintptr_t contract_addresses_len,
                                                         const struct FieldElement *account_addresses,
                                                         uintptr_t account_addresses_len,
                                                         const struct U256 *token_ids,
                                                         uintptr_t token_ids_len,
                                                         void (*callback)(struct TokenBalance));

/**
 * Updates an existing token balance subscription
 *
 * # Parameters
 * * `client` - Pointer to ToriiClient instance
 * * `subscription` - Pointer to existing Subscription
 * * `contract_addresses` - Array of contract addresses to filter (empty for all)
 * * `contract_addresses_len` - Length of contract addresses array
 * * `account_addresses` - Array of account addresses to filter (empty for all)
 * * `account_addresses_len` - Length of account addresses array
 *
 * # Returns
 * Result containing success boolean or error
 */
struct Resultbool client_update_token_balance_subscription(struct ToriiClient *client,
                                                           struct Subscription *subscription,
                                                           const struct FieldElement *contract_addresses,
                                                           uintptr_t contract_addresses_len,
                                                           const struct FieldElement *account_addresses,
                                                           uintptr_t account_addresses_len,
                                                           const struct U256 *token_ids,
                                                           uintptr_t token_ids_len);

/**
 * Serializes a string into a byte array
 *
 * # Parameters
 * * `str` - String to serialize
 *
 * # Returns
 * Result containing array of FieldElements or error
 */
struct ResultCArrayFieldElement bytearray_serialize(const char *str);

/**
 * Deserializes field elements into a string
 *
 * # Parameters
 * * `felts` - Array of field elements
 * * `felts_len` - Length of field elements array
 *
 * # Returns
 * Result containing pointer to C string or error
 */
struct Resultc_char bytearray_deserialize(const struct FieldElement *felts, uintptr_t felts_len);

/**
 * Computes Poseidon hash of field elements
 *
 * # Parameters
 * * `felts` - Array of field elements
 * * `felts_len` - Length of array
 *
 * # Returns
 * FieldElement containing the hash result
 */
struct FieldElement poseidon_hash(const struct FieldElement *felts, uintptr_t felts_len);

/**
 * Gets selector from name string
 *
 * # Parameters
 * * `name` - Name to compute selector from
 *
 * # Returns
 * Result containing FieldElement selector or error
 */
struct ResultFieldElement get_selector_from_name(const char *name);

/**
 * Gets selector from tag string
 *
 * # Parameters
 * * `tag` - Tag to compute selector from
 *
 * # Returns
 * FieldElement containing the computed selector
 */
struct FieldElement get_selector_from_tag(const char *tag);

/**
 * Computes Starknet keccak hash of bytes
 *
 * # Parameters
 * * `bytes` - Byte array to hash
 * * `bytes_len` - Length of byte array
 *
 * # Returns
 * FieldElement containing the hash result
 */
struct FieldElement starknet_keccak(const uint8_t *bytes, uintptr_t bytes_len);

/**
 * Converts a short string to field element
 *
 * # Parameters
 * * `str` - String to convert
 *
 * # Returns
 * Result containing FieldElement or error
 */
struct ResultFieldElement cairo_short_string_to_felt(const char *str);

/**
 * Parses a field element into a short string
 *
 * # Parameters
 * * `felt` - FieldElement to parse
 *
 * # Returns
 * Result containing pointer to C string or error
 */
struct Resultc_char parse_cairo_short_string(struct FieldElement felt);

/**
 * Encodes typed data
 *
 * # Parameters
 * * `typed_data` - JSON string of typed data
 * * `address` - Address as FieldElement
 *
 * # Returns
 * Result containing encoded FieldElement or error
 */
struct ResultFieldElement typed_data_encode(const char *typed_data, struct FieldElement address);

/**
 * Generates a new signing key
 *
 * # Returns
 * FieldElement containing the new private key
 */
struct FieldElement signing_key_new(void);

/**
 * Signs a hash with a private key
 *
 * # Parameters
 * * `private_key` - Private key as FieldElement
 * * `hash` - Hash to sign as FieldElement
 *
 * # Returns
 * Result containing Signature or error
 */
struct ResultSignature signing_key_sign(struct FieldElement private_key, struct FieldElement hash);

/**
 * Creates a verifying key from a signing key
 *
 * # Parameters
 * * `signing_key` - Signing key as FieldElement
 *
 * # Returns
 * FieldElement containing the verifying key
 */
struct FieldElement verifying_key_new(struct FieldElement signing_key);

/**
 * Verifies a signature
 *
 * # Parameters
 * * `verifying_key` - Verifying key as FieldElement
 * * `hash` - Hash that was signed
 * * `signature` - Signature to verify
 *
 * # Returns
 * Result containing verification success boolean or error
 */
struct Resultbool verifying_key_verify(struct FieldElement verifying_key,
                                       struct FieldElement hash,
                                       struct Signature signature);

/**
 * Creates a new provider instance
 *
 * # Parameters
 * * `rpc_url` - URL of the RPC endpoint
 *
 * # Returns
 * Result containing pointer to Provider or error
 */
struct ResultProvider provider_new(const char *rpc_url);

/**
 * Creates a new account instance
 *
 * # Parameters
 * * `rpc` - Pointer to Provider
 * * `private_key` - Private key as FieldElement
 * * `address` - Account address as string
 *
 * # Returns
 * Result containing pointer to Account or error
 */
struct ResultAccount account_new(struct Provider *rpc,
                                 struct FieldElement private_key,
                                 const char *address);

/**
 * Makes a Starknet call
 *
 * # Parameters
 * * `provider` - Pointer to Provider
 * * `call` - Call parameters
 * * `block_id` - Block identifier
 *
 * # Returns
 * Result containing array of FieldElements or error
 */
struct ResultCArrayFieldElement starknet_call(struct Provider *provider,
                                              struct Call call,
                                              struct BlockId block_id);

/**
 * Deploys a burner account
 *
 * # Parameters
 * * `provider` - Pointer to Provider
 * * `master_account` - Pointer to master Account
 * * `signing_key` - Signing key for new account
 *
 * # Returns
 * Result containing pointer to new Account or error
 */
struct ResultAccount account_deploy_burner(struct Provider *provider,
                                           struct Account *master_account,
                                           struct FieldElement signing_key);

/**
 * Gets account address
 *
 * # Parameters
 * * `account` - Pointer to Account
 *
 * # Returns
 * FieldElement containing the account address
 */
struct FieldElement account_address(struct Account *account);

/**
 * Gets account chain ID
 *
 * # Parameters
 * * `account` - Pointer to Account
 *
 * # Returns
 * FieldElement containing the chain ID
 */
struct FieldElement account_chain_id(struct Account *account);

/**
 * Sets block ID for account
 *
 * # Parameters
 * * `account` - Pointer to Account
 * * `block_id` - New block ID
 */
void account_set_block_id(struct Account *account, struct BlockId block_id);

/**
 * Gets account nonce
 *
 * # Parameters
 * * `account` - Pointer to Account
 *
 * # Returns
 * Result containing FieldElement nonce or error
 */
struct ResultFieldElement account_nonce(struct Account *account);

/**
 * Executes raw transaction
 *
 * # Parameters
 * * `account` - Pointer to Account
 * * `calldata` - Array of Call structs
 * * `calldata_len` - Length of calldata array
 *
 * # Returns
 * Result containing transaction hash as FieldElement or error
 */
struct ResultFieldElement account_execute_raw(struct Account *account,
                                              const struct Call *calldata,
                                              uintptr_t calldata_len);

/**
 * Waits for transaction completion
 *
 * # Parameters
 * * `rpc` - Pointer to Provider
 * * `txn_hash` - Transaction hash as FieldElement
 *
 * # Returns
 * Result containing success boolean or error
 */
struct Resultbool wait_for_transaction(struct Provider *rpc, struct FieldElement txn_hash);

/**
 * Computes contract address
 *
 * # Parameters
 * * `class_hash` - Class hash as FieldElement
 * * `salt` - Salt as FieldElement
 * * `constructor_calldata` - Array of constructor parameters
 * * `constructor_calldata_len` - Length of constructor parameters
 * * `deployer_address` - Deployer address as FieldElement
 *
 * # Returns
 * FieldElement containing computed contract address
 */
struct FieldElement hash_get_contract_address(struct FieldElement class_hash,
                                              struct FieldElement salt,
                                              const struct FieldElement *constructor_calldata,
                                              uintptr_t constructor_calldata_len,
                                              struct FieldElement deployer_address);

/**
 * Cancels a subscription
 *
 * # Parameters
 * * `subscription` - Pointer to Subscription to cancel
 */
void subscription_cancel(struct Subscription *subscription);

/**
 * Frees a ToriiClient instance
 *
 * # Parameters
 * * `t` - Pointer to ToriiClient to free
 */
void client_free(struct ToriiClient *t);

/**
 * Frees a Provider instance
 *
 * # Parameters
 * * `rpc` - Pointer to Provider to free
 */
void provider_free(struct Provider *rpc);

/**
 * Frees a Model instance
 *
 * # Parameters
 * * `model` - Pointer to Model to free
 */
void model_free(struct Struct *model);

/**
 * Frees an Account instance
 *
 * # Parameters
 * * `account` - Pointer to Account to free
 */
void account_free(struct Account *account);

/**
 * Frees a Type instance
 *
 * # Parameters
 * * `ty` - Pointer to Type to free
 */
void ty_free(struct Ty *ty);

/**
 * Frees an Entity instance
 *
 * # Parameters
 * * `entity` - Pointer to Entity to free
 */
void entity_free(struct Entity *entity);

/**
 * Frees an Error instance
 *
 * # Parameters
 * * `error` - Pointer to Error to free
 */
void error_free(struct Error *error);

/**
 * Frees a WorldMetadata instance
 *
 * # Parameters
 * * `metadata` - Pointer to WorldMetadata to free
 */
void world_metadata_free(struct World *metadata);

/**
 * Frees a CArray instance
 *
 * # Parameters
 * * `data` - Pointer to array data
 * * `data_len` - Length of array
 */
void carray_free(void *data, uintptr_t data_len);

/**
 * Frees a string
 *
 * # Parameters
 * * `string` - Pointer to string to free
 */
void string_free(char *string);

#ifdef __cplusplus
}  // extern "C"
#endif  // __cplusplus

#ifdef __cplusplus
}  // namespace dojo_bindings
#endif  // __cplusplus
