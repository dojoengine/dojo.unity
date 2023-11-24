#include <stdarg.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

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

typedef struct ToriiClient ToriiClient;

typedef struct FieldElement {
  uint8_t data[32];
} FieldElement;

typedef struct CArray_FieldElement {
  struct FieldElement *data;
  uintptr_t data_len;
} CArray_FieldElement;

typedef struct CArray_FieldElement KeysClause;

typedef struct CArray_u8 {
  uint8_t *data;
  uintptr_t data_len;
} CArray_u8;

typedef enum Value_Tag {
  VString,
  Int,
  UInt,
  VBool,
  Bytes,
} Value_Tag;

typedef struct Value {
  Value_Tag tag;
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
} Value;

typedef struct AttributeClause {
  const char *attribute;
  enum ComparisonOperator operator_;
  struct Value value;
} AttributeClause;

typedef struct CArray_Clause {
  struct Clause *data;
  uintptr_t data_len;
} CArray_Clause;

typedef struct CompositeClause {
  enum LogicalOperator operator_;
  struct CArray_Clause clauses;
} CompositeClause;

typedef enum Clause_Tag {
  Keys,
  Attribute,
  Composite,
} Clause_Tag;

typedef struct Clause {
  Clause_Tag tag;
  union {
    struct {
      KeysClause keys;
    };
    struct {
      struct AttributeClause attribute;
    };
    struct {
      struct CompositeClause composite;
    };
  };
} Clause;

typedef struct EntityQuery {
  const char *model;
  struct Clause clause;
} EntityQuery;

typedef struct Error {
  const char *message;
} Error;

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
  const struct Ty *ty;
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
  const struct Ty *ty;
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

typedef struct CArray_EntityQuery {
  struct EntityQuery *data;
  uintptr_t data_len;
} CArray_EntityQuery;

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

struct ToriiClient *client_new(const char *torii_url,
                               const char *rpc_url,
                               const struct FieldElement *world,
                               const struct EntityQuery *entities,
                               uintptr_t entities_len,
                               struct Error *error);

struct Ty *client_entity(struct ToriiClient *client,
                         const struct EntityQuery *entity,
                         struct Error *error);

const struct CArray_EntityQuery *client_subscribed_entities(struct ToriiClient *client);

void client_start_subscription(struct ToriiClient *client, struct Error *error);

struct WorldMetadata client_metadata(struct ToriiClient *client);

void client_add_entities_to_sync(struct ToriiClient *client,
                                 const struct EntityQuery *entities,
                                 uintptr_t entities_len,
                                 struct Error *error);

void client_on_entity_state_update(struct ToriiClient *client,
                                   const struct EntityQuery *entity,
                                   void (*callback)(void),
                                   struct Error *error);

void client_remove_entities_to_sync(struct ToriiClient *client,
                                    const struct EntityQuery *entities,
                                    uintptr_t entities_len,
                                    struct Error *error);

void client_free(struct ToriiClient *client);

void carray_free(const struct CArray_EntityQuery *array);

void ty_free(const struct Ty *ty);
