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

typedef struct ToriiClient ToriiClient;

typedef struct CArray______c_char {
  const char **data;
  uintptr_t data_len;
} CArray______c_char;

typedef struct KeysClause {
  const char *model;
  struct CArray______c_char keys;
} KeysClause;

typedef struct Error {
  const char *message;
} Error;

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

typedef struct Query {
  uint32_t limit;
  uint32_t offset;
  struct Clause clause;
} Query;

typedef struct CArray_KeysClause {
  struct KeysClause *data;
  uintptr_t data_len;
} CArray_KeysClause;

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

struct ToriiClient *client_new(const char *torii_url,
                               const char *rpc_url,
                               const char *world,
                               const struct KeysClause *entities,
                               uintptr_t entities_len,
                               struct Error *error);

struct Ty *client_entity(struct ToriiClient *client,
                         const struct KeysClause *keys,
                         struct Error *error);

struct CArray_Entity client_entities(struct ToriiClient *client,
                                     const struct Query *query,
                                     struct Error *error);

struct CArray_KeysClause client_subscribed_entities(struct ToriiClient *client);

void client_start_subscription(struct ToriiClient *client, struct Error *error);

struct WorldMetadata client_metadata(struct ToriiClient *client);

void client_add_entities_to_sync(struct ToriiClient *client,
                                 const struct KeysClause *entities,
                                 uintptr_t entities_len,
                                 struct Error *error);

void client_on_entity_state_update(struct ToriiClient *client,
                                   const struct KeysClause *entity,
                                   void (*callback)(void));

void client_remove_entities_to_sync(struct ToriiClient *client,
                                    const struct KeysClause *entities,
                                    uintptr_t entities_len,
                                    struct Error *error);

struct Account *account_new(const char *rpc_url,
                            const char *private_key,
                            const char *address,
                            struct Error *error);

struct FieldElement account_address(struct Account *account);

struct FieldElement account_chain_id(struct Account *account);

void account_set_block_id(struct Account *account, struct BlockId block_id);

void account_execute_raw(struct Account *account,
                         const struct Call *calldata,
                         uintptr_t calldata_len,
                         struct Error *error);

void client_free(struct ToriiClient *t);

void account_free(struct Account *account);

void ty_free(struct Ty *ty);

void entity_free(struct Entity *entity);

void error_free(struct Error *error);

void world_metadata_free(struct WorldMetadata *metadata);

void carray_free(void *data, uintptr_t data_len);

void string_free(char *string);
