using System;
using System.Linq;
using System.Numerics;
using bottlenoselabs.C2CS.Runtime;
using Dojo.Starknet;
using dojo_bindings;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using UnityEngine;

namespace Dojo.Torii
{
#nullable enable

    [Serializable]
    public struct Pagination
    {
        public uint? limit;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string? cursor;
        public OrderBy[] order_by;
        [JsonConverter(typeof(StringEnumConverter))]
        public dojo.PaginationDirection direction;

        public Pagination(uint limit = 1000, dojo.PaginationDirection direction = dojo.PaginationDirection.Forward, string? cursor = null, OrderBy[]? order_by = null)
        {
            this.limit = limit;
            this.cursor = cursor;
            this.direction = direction;
            this.order_by = order_by ?? Array.Empty<OrderBy>();
        }

        public dojo.Pagination ToNative()
        {
            return new dojo.Pagination
            {
                limit = limit is null ? new dojo.COptionu32 { tag = dojo.COptionu32_Tag.Noneu32 } : new dojo.COptionu32 { tag = dojo.COptionu32_Tag.Someu32, some = limit.Value },
                cursor = cursor is null ? new dojo.COptionc_char { tag = dojo.COptionc_char_Tag.Nonec_char } : new dojo.COptionc_char { tag = dojo.COptionc_char_Tag.Somec_char, some = cursor },
                direction = direction,
                order_by = order_by.Select(o => o.ToNative()).ToArray()
            };
        }
    }

    [Serializable]
    public class ControllerQuery
    {
        public string[] usernames;
        public FieldElement[] contract_addresses;
        public Pagination pagination;

        public ControllerQuery(string[] usernames, FieldElement[] contract_addresses, Pagination pagination)
        {
            this.pagination = pagination;
            this.usernames = usernames;
            this.contract_addresses = contract_addresses;
        }

        public dojo.ControllerQuery ToNative()
        {
            return new dojo.ControllerQuery
            {
                usernames = usernames,
                contract_addresses = contract_addresses.Select(c => c.Inner).ToArray(),
                pagination = pagination.ToNative(),
            };
        }
    }

    [Serializable]
    public class TokenQuery
    {
        public FieldElement[] contract_addresses;
        public BigInteger[] token_ids;
        public Pagination pagination;

        public TokenQuery(FieldElement[] contract_addresses, BigInteger[] token_ids, Pagination pagination)
        {
            this.pagination = pagination;
            this.contract_addresses = contract_addresses;
            this.token_ids = token_ids;
        }

        public dojo.TokenQuery ToNative()
        {
            return new dojo.TokenQuery
            {
                contract_addresses = contract_addresses.Select(c => c.Inner).ToArray(),
                token_ids = token_ids.Select(t =>
            {
                var bytes = t.ToByteArray();
                Array.Resize(ref bytes, 32);
                return new dojo.U256 { data = bytes.Reverse().ToArray() };
            }).ToArray(),
                pagination = pagination.ToNative(),
            };
        }
    }

    [Serializable]
    public class TokenBalanceQuery
    {
        public FieldElement[] contract_addresses;
        public FieldElement[] account_addresses;
        public BigInteger[] token_ids;
        public Pagination pagination;

        public TokenBalanceQuery(FieldElement[] contract_addresses, FieldElement[] account_addresses, BigInteger[] token_ids, Pagination pagination)
        {
            this.pagination = pagination;
            this.contract_addresses = contract_addresses;
            this.account_addresses = account_addresses;
            this.token_ids = token_ids;
        }

        public dojo.TokenBalanceQuery ToNative()
        {
            return new dojo.TokenBalanceQuery
            {
                contract_addresses = contract_addresses.Select(c => c.Inner).ToArray(),
                account_addresses = account_addresses.Select(a => a.Inner).ToArray(),
                token_ids = token_ids.Select(t =>
            {
                var bytes = t.ToByteArray();
                Array.Resize(ref bytes, 32);
                return new dojo.U256 { data = bytes.Reverse().ToArray() };
            }).ToArray(),
                pagination = pagination.ToNative(),
            };
        }
    }

    [Serializable]
    public class Query
    {
        public Pagination pagination;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Clause? clause;
        public bool no_hashed_keys;
        public string[] models;
        public bool historical;

        public Query(Pagination? pagination = null, Clause? clause = null, bool no_hashed_keys = false, string[]? models = null, bool historical = false)
        {
            this.pagination = pagination ?? new Pagination();
            this.clause = clause;
            this.no_hashed_keys = no_hashed_keys;
            this.models = models ?? Array.Empty<string>();
            this.historical = historical;
        }

        public dojo.Query ToNative()
        {
            var nativeQuery = new dojo.Query
            {
                pagination = pagination.ToNative(),
                clause = new dojo.COptionClause { tag = dojo.COptionClause_Tag.NoneClause },
                no_hashed_keys = no_hashed_keys,
                models = models,
                historical = historical
            };

            if (clause.HasValue)
            {
                nativeQuery.clause = new dojo.COptionClause
                {
                    tag = dojo.COptionClause_Tag.SomeClause,
                    some = clause.Value.ToNative()
                };
            }

            return nativeQuery;
        }
    }

    [Serializable]
    public struct OrderBy
    {
        public string field;
        [JsonConverter(typeof(StringEnumConverter))]
        public dojo.OrderDirection direction;

        public OrderBy(string field, dojo.OrderDirection direction)
        {
            this.field = field;
            this.direction = direction;
        }

        public dojo.OrderBy ToNative()
        {
            return new dojo.OrderBy
            {
                field = field,
                direction = direction
            };
        }
    }

    [Serializable]
    public struct Clause
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public KeysClause? Keys;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public MemberClause? Member;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public CompositeClause? Composite;

        public static implicit operator Clause(KeysClause keysClause)
        {
            return new Clause { Keys = keysClause };
        }

        public static implicit operator Clause(MemberClause memberClause)
        {
            return new Clause { Member = memberClause };
        }

        public static implicit operator Clause(CompositeClause compositeClause)
        {
            return new Clause { Composite = compositeClause };
        }

        public dojo.Clause ToNative()
        {
            if (Keys.HasValue)
                return new dojo.Clause { tag = dojo.Clause_Tag.Keys, keys = Keys.Value.ToNative() };
            if (Member.HasValue)
                return new dojo.Clause { tag = dojo.Clause_Tag.CMember, c_member = Member.Value.ToNative() };
            if (Composite.HasValue)
                return new dojo.Clause { tag = dojo.Clause_Tag.Composite, composite = Composite.Value.ToNative() };

            throw new InvalidOperationException("Clause must have one non-null value");
        }
    }

    [Serializable]
    public struct KeysClause
    {
        public FieldElement?[] keys;
        [JsonConverter(typeof(StringEnumConverter))]
        public dojo.PatternMatching pattern_matching;
        public string[] models;

        public KeysClause(FieldElement?[] keys, dojo.PatternMatching pattern_matching, string[] models)
        {
            this.keys = keys;
            this.pattern_matching = pattern_matching;
            this.models = models;
        }

        public dojo.KeysClause ToNative()
        {
            return new dojo.KeysClause
            {
                keys = keys.Select(k => k is null ?
                    new dojo.COptionFieldElement { tag = dojo.COptionFieldElement_Tag.NoneFieldElement }
                    : new dojo.COptionFieldElement { tag = dojo.COptionFieldElement_Tag.SomeFieldElement, some = k.Inner }).ToArray(),
                pattern_matching = pattern_matching,
                models = models
            };
        }
    }

    [Serializable]
    public struct MemberClause
    {
        public string model;
        public string member;
        [JsonConverter(typeof(StringEnumConverter))]
        public dojo.ComparisonOperator @operator;
        public MemberValue value;

        public MemberClause(string model, string member, dojo.ComparisonOperator @operator, MemberValue value)
        {
            this.model = model;
            this.member = member;
            this.@operator = @operator;
            this.value = value;
        }

        public dojo.MemberClause ToNative()
        {
            return new dojo.MemberClause
            {
                model = model,
                member = member,
                operator_ = @operator,
                value = value.ToNative()
            };
        }
    }

    [Serializable]
    public struct CompositeClause
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public dojo.LogicalOperator @operator;
        public Clause[] clauses;

        public CompositeClause(dojo.LogicalOperator @operator, Clause[] clauses)
        {
            this.@operator = @operator;
            this.clauses = clauses;
        }

        public dojo.CompositeClause ToNative()
        {
            return new dojo.CompositeClause
            {
                operator_ = @operator,
                clauses = clauses.Select(c => c.ToNative()).ToArray()
            };
        }
    }


    [Serializable]
    public struct MemberValue
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public Primitive? Primitive;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string? String;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public MemberValue[]? List;

        public MemberValue(string value)
        {
            String = value;
            Primitive = null;
            List = null;

        }

        public MemberValue(Primitive primitive)
        {
            Primitive = primitive;
            String = null;
            List = null;
        }

        public MemberValue(MemberValue[] list)
        {
            List = list;
            Primitive = null;
            String = null;
        }

        public static implicit operator MemberValue(string value)
        {
            return new MemberValue(value);
        }

        public static implicit operator MemberValue(Primitive primitive)
        {
            return new MemberValue(primitive);
        }

        public static implicit operator MemberValue(MemberValue[] list)
        {
            return new MemberValue(list);
        }

        public dojo.MemberValue ToNative()
        {
            if (String != null)
                return new dojo.MemberValue { tag = dojo.MemberValue_Tag.String, @string = String };
            if (Primitive.HasValue)
                return new dojo.MemberValue { tag = dojo.MemberValue_Tag.PrimitiveValue, primitive_value = Primitive.Value.ToNative() };
            if (List != null)
                return new dojo.MemberValue { tag = dojo.MemberValue_Tag.List, list = List.Select(l => l.ToNative()).ToArray() };

            throw new InvalidOperationException("MemberValue must have one non-null value");
        }
    }

    [Serializable]
    public struct Primitive
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public sbyte? I8;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public short? I16;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int? I32;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public long? I64;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public FieldElement? I128;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public byte? U8;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ushort? U16;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public uint? U32;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public ulong? U64;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public FieldElement? U128;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string? U256;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public bool? Bool;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public FieldElement? Felt252;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public FieldElement? ClassHash;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public FieldElement? ContractAddress;
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public FieldElement? EthAddress;

        public dojo.Primitive ToNative()
        {
            if (I8.HasValue)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.I8, i8 = I8.Value };
            if (I16.HasValue)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.I16, i16 = I16.Value };
            if (I32.HasValue)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.I32, i32 = I32.Value };
            if (I64.HasValue)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.I64, i64 = I64.Value };
            if (I128 != null)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.I128, i128 = I128.Inner.data };
            if (U8.HasValue)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.U8, u8 = U8.Value };
            if (U16.HasValue)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.U16, u16 = U16.Value };
            if (U32.HasValue)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.U32, u32 = U32.Value };
            if (U64.HasValue)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.U64, u64 = U64.Value };
            if (U128 != null)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.U128, u128 = U128.Inner.data };
            if (U256 != null)
                throw new NotImplementedException("U256 conversion not implemented");
            if (Bool.HasValue)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.Bool, bool_ = Bool.Value };
            if (Felt252 != null)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.Felt252, felt252 = Felt252.Inner };
            if (ClassHash != null)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.ClassHash, class_hash = ClassHash.Inner };
            if (ContractAddress != null)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.ContractAddress, contract_address = ContractAddress.Inner };
            if (EthAddress != null)
                return new dojo.Primitive { tag = dojo.Primitive_Tag.EthAddress, eth_address = EthAddress.Inner };

            throw new InvalidOperationException("Primitive must have one non-null value");
        }
    }
}