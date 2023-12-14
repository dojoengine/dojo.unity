#include <stdarg.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

typedef enum BlockTag {
  Latest,
  Pending,
} BlockTag;

typedef enum ComparisonOperator {
  Eq,
  Neq,
  Gt,
  Gte,
  Lt,
  Lte,
} ComparisonOperator;

typedef enum LogicalOperator {
  And,
  Or,
} LogicalOperator;

typedef struct Account Account;

typedef struct CJsonRpcClient CJsonRpcClient;

typedef struct ToriiClient ToriiClient;

typedef struct Error {
  char *message;
} Error;

typedef enum Result_____ToriiClient_Tag {
  Ok_____ToriiClient,
  Err_____ToriiClient,
} Result_____ToriiClient_Tag;

typedef struct Result_____ToriiClient {
  Result_____ToriiClient_Tag tag;
  union {
    struct {
      struct ToriiClient *ok;
    };
    struct {
      struct Error err;
    };
  };
} Result_____ToriiClient;

typedef struct CArray______c_char {
  const char **data;
  uintptr_t data_len;
} CArray______c_char;

typedef struct KeysClause {
  const char *model;
  struct CArray______c_char keys;
} KeysClause;

typedef struct FieldElement {
  uint8_t data[32];
} FieldElement;

typedef enum Primitive_Tag {
  U8,
  U16,
  U32,
  U64,
  U128,
  U256,
  USize,
  PBool,
  Felt252,
  ClassHash,
  ContractAddress,
} Primitive_Tag;

typedef struct Primitive {
  Primitive_Tag tag;
  union {
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
      uint64_t u256[4];
    };
    struct {
      uint32_t u_size;
    };
    struct {
      bool p_bool;
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
  };
} Primitive;

typedef struct Member {
  const char *name;
  struct Ty *ty;
  bool key;
} Member;

typedef struct CArray_Member {
  struct Member *data;
  uintptr_t data_len;
} CArray_Member;

typedef struct Struct {
  const char *name;
  struct CArray_Member children;
} Struct;

typedef struct EnumOption {
  const char *name;
  struct Ty *ty;
} EnumOption;

typedef struct CArray_EnumOption {
  struct EnumOption *data;
  uintptr_t data_len;
} CArray_EnumOption;

typedef struct Enum {
  const char *name;
  uint8_t option;
  struct CArray_EnumOption options;
} Enum;

typedef struct CArray_Ty {
  struct Ty *data;
  uintptr_t data_len;
} CArray_Ty;

typedef enum Ty_Tag {
  TyPrimitive,
  TyStruct,
  TyEnum,
  TyTuple,
} Ty_Tag;

typedef struct Ty {
  Ty_Tag tag;
  union {
    struct {
      struct Primitive ty_primitive;
    };
    struct {
      struct Struct ty_struct;
    };
    struct {
      struct Enum ty_enum;
    };
    struct {
      struct CArray_Ty ty_tuple;
    };
  };
} Ty;

typedef enum COption_____Ty_Tag {
  Some_____Ty,
  None_____Ty,
} COption_____Ty_Tag;

typedef struct COption_____Ty {
  COption_____Ty_Tag tag;
  union {
    struct {
      struct Ty *some;
    };
  };
} COption_____Ty;

typedef enum Result_COption_____Ty_Tag {
  Ok_COption_____Ty,
  Err_COption_____Ty,
} Result_COption_____Ty_Tag;

typedef struct Result_COption_____Ty {
  Result_COption_____Ty_Tag tag;
  union {
    struct {
      struct COption_____Ty ok;
    };
    struct {
      struct Error err;
    };
  };
} Result_COption_____Ty;

typedef struct Model {
  const char *name;
  struct CArray_Member members;
} Model;

typedef struct CArray_Model {
  struct Model *data;
  uintptr_t data_len;
} CArray_Model;

typedef struct Entity {
  struct FieldElement key;
  struct CArray_Model models;
} Entity;

typedef struct CArray_Entity {
  struct Entity *data;
  uintptr_t data_len;
} CArray_Entity;

typedef enum Result_CArray_Entity_Tag {
  Ok_CArray_Entity,
  Err_CArray_Entity,
} Result_CArray_Entity_Tag;

typedef struct Result_CArray_Entity {
  Result_CArray_Entity_Tag tag;
  union {
    struct {
      struct CArray_Entity ok;
    };
    struct {
      struct Error err;
    };
  };
} Result_CArray_Entity;

typedef struct CArray_u8 {
  uint8_t *data;
  uintptr_t data_len;
} CArray_u8;

typedef enum ValueType_Tag {
  VString,
  Int,
  UInt,
  VBool,
  Bytes,
} ValueType_Tag;

typedef struct ValueType {
  ValueType_Tag tag;
  union {
    struct {
      const char *v_string;
    };
    struct {
      int64_t int_;
    };
    struct {
      uint64_t u_int;
    };
    struct {
      bool v_bool;
    };
    struct {
      struct CArray_u8 bytes;
    };
  };
} ValueType;

typedef struct Value {
  struct Primitive primitive_type;
  struct ValueType value_type;
} Value;

typedef struct MemberClause {
  const char *model;
  const char *member;
  enum ComparisonOperator operator_;
  struct Value value;
} MemberClause;

typedef struct CArray_Clause {
  struct Clause *data;
  uintptr_t data_len;
} CArray_Clause;

typedef struct CompositeClause {
  const char *model;
  enum LogicalOperator operator_;
  struct CArray_Clause clauses;
} CompositeClause;

typedef enum Clause_Tag {
  Keys,
  CMember,
  Composite,
} Clause_Tag;

typedef struct Clause {
  Clause_Tag tag;
  union {
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

typedef enum COption_Clause_Tag {
  Some_Clause,
  None_Clause,
} COption_Clause_Tag;

typedef struct COption_Clause {
  COption_Clause_Tag tag;
  union {
    struct {
      struct Clause some;
    };
  };
} COption_Clause;

typedef struct Query {
  uint32_t limit;
  uint32_t offset;
  struct COption_Clause clause;
} Query;

typedef struct CArray_KeysClause {
  struct KeysClause *data;
  uintptr_t data_len;
} CArray_KeysClause;

typedef enum Result_bool_Tag {
  Ok_bool,
  Err_bool,
} Result_bool_Tag;

typedef struct Result_bool {
  Result_bool_Tag tag;
  union {
    struct {
      bool ok;
    };
    struct {
      struct Error err;
    };
  };
} Result_bool;

typedef struct CArray_FieldElement {
  struct FieldElement *data;
  uintptr_t data_len;
} CArray_FieldElement;

typedef struct ModelMetadata {
  struct Ty schema;
  const char *name;
  uint32_t packed_size;
  uint32_t unpacked_size;
  struct FieldElement class_hash;
  struct CArray_FieldElement layout;
} ModelMetadata;

typedef struct CHashItem______c_char__ModelMetadata {
  const char *key;
  struct ModelMetadata value;
} CHashItem______c_char__ModelMetadata;

typedef struct CArray_CHashItem______c_char__ModelMetadata {
  struct CHashItem______c_char__ModelMetadata *data;
  uintptr_t data_len;
} CArray_CHashItem______c_char__ModelMetadata;

typedef struct WorldMetadata {
  struct FieldElement world_address;
  struct FieldElement world_class_hash;
  struct FieldElement executor_address;
  struct FieldElement executor_class_hash;
  struct CArray_CHashItem______c_char__ModelMetadata models;
} WorldMetadata;

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

typedef enum Result_Signature_Tag {
  Ok_Signature,
  Err_Signature,
} Result_Signature_Tag;

typedef struct Result_Signature {
  Result_Signature_Tag tag;
  union {
    struct {
      struct Signature ok;
    };
    struct {
      struct Error err;
    };
  };
} Result_Signature;

typedef enum Result_FieldElement_Tag {
  Ok_FieldElement,
  Err_FieldElement,
} Result_FieldElement_Tag;

typedef struct Result_FieldElement {
  Result_FieldElement_Tag tag;
  union {
    struct {
      struct FieldElement ok;
    };
    struct {
      struct Error err;
    };
  };
} Result_FieldElement;

typedef enum Result_____CJsonRpcClient_Tag {
  Ok_____CJsonRpcClient,
  Err_____CJsonRpcClient,
} Result_____CJsonRpcClient_Tag;

typedef struct Result_____CJsonRpcClient {
  Result_____CJsonRpcClient_Tag tag;
  union {
    struct {
      struct CJsonRpcClient *ok;
    };
    struct {
      struct Error err;
    };
  };
} Result_____CJsonRpcClient;

typedef enum Result_____Account_Tag {
  Ok_____Account,
  Err_____Account,
} Result_____Account_Tag;

typedef struct Result_____Account {
  Result_____Account_Tag tag;
  union {
    struct {
      struct Account *ok;
    };
    struct {
      struct Error err;
    };
  };
} Result_____Account;

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

typedef struct Call {
  const char *to;
  const char *selector;
  struct CArray_FieldElement calldata;
} Call;

struct Result_____ToriiClient client_new(const char *torii_url,
                                         const char *rpc_url,
                                         const char *world,
                                         const struct KeysClause *entities,
                                         uintptr_t entities_len);

struct Result_COption_____Ty client_model(struct ToriiClient *client,
                                          const struct KeysClause *keys);

struct Result_CArray_Entity client_entities(struct ToriiClient *client, const struct Query *query);

struct CArray_KeysClause client_subscribed_models(struct ToriiClient *client);

struct Result_bool client_start_subscription(struct ToriiClient *client);

struct WorldMetadata client_metadata(struct ToriiClient *client);

struct Result_bool client_add_models_to_sync(struct ToriiClient *client,
                                             const struct KeysClause *models,
                                             uintptr_t models_len);

struct Result_bool client_on_sync_model_update(struct ToriiClient *client,
                                               struct KeysClause model,
                                               void (*callback)(void));

struct Result_bool client_on_entity_state_update(struct ToriiClient *client,
                                                 struct FieldElement *entities,
                                                 uintptr_t entities_len,
                                                 void (*callback)(struct FieldElement,
                                                                  struct CArray_Model));

struct Result_bool client_remove_models_to_sync(struct ToriiClient *client,
                                                const struct KeysClause *models,
                                                uintptr_t models_len);

struct FieldElement signing_key_new(void);

struct Result_Signature signing_key_sign(struct FieldElement private_key, struct FieldElement hash);

struct Result_FieldElement felt_from_hex_be(const char *hex);

struct FieldElement verifying_key_new(struct FieldElement signing_key);

struct Result_bool verifying_key_verify(struct FieldElement verifying_key,
                                        struct FieldElement hash,
                                        struct Signature signature);

struct Result_____CJsonRpcClient jsonrpc_client_new(const char *rpc_url);

struct Result_____Account account_new(struct CJsonRpcClient *rpc,
                                      struct FieldElement private_key,
                                      const char *address);

struct FieldElement account_address(struct Account *account);

struct FieldElement account_chain_id(struct Account *account);

void account_set_block_id(struct Account *account, struct BlockId block_id);

struct Result_bool account_execute_raw(struct Account *account,
                                       const struct Call *calldata,
                                       uintptr_t calldata_len);

void client_free(struct ToriiClient *t);

void jsonrpc_client_free(struct CJsonRpcClient *rpc);

void model_free(struct Model *model);

void account_free(struct Account *account);

void ty_free(struct Ty *ty);

void entity_free(struct Entity *entity);

void error_free(struct Error *error);

void world_metadata_free(struct WorldMetadata *metadata);

void carray_free(void *data, uintptr_t data_len);

void string_free(char *string);
