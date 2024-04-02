using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Runtime.InteropServices;
using Dojo.Starknet;
using dojo_bindings;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace Dojo.Torii
{
    public struct Member
    {
        public object value;
        public bool key;
        public string cairoType;
    }

    public class Model
    {
        public string Name { get; }
        public Dictionary<string, Member> Members { get; }

        public Model(string name, Dictionary<string, WasmValue> members)
        {
            Name = name;

            Members = members.ToDictionary(k => k.Key, v => new Member
            {
                value = HandleWasmValue(v.Value),
                cairoType = v.Value.type,
                key = v.Value.key
            });
        }

        public Model(dojo.Model model)
        {
            Name = model.name;
            Members = new Dictionary<string, Member>(model.members.ToArray().Select(m => new KeyValuePair<string, Member>(m.name, HandleCValue(m))));
        }

        private Member HandleCValue(dojo.Member member)
        {
            return member.ty.tag switch
            {
                dojo.Ty_Tag.Struct_ => new Member
                {
                    value = HandleCStruct(member.ty.struct_),
                    cairoType = "struct",
                    key = member.key
                },
                dojo.Ty_Tag.Enum_ => new Member
                {
                    value = member.ty.enum_.option,
                    cairoType = "enum",
                    key = member.key
                },
                dojo.Ty_Tag.Primitive_ => member.ty.primitive.tag switch
                {
                    dojo.Primitive_Tag.Bool => new Member
                    {
                        value = Convert.ToBoolean(member.ty.primitive.bool_.Value),
                        cairoType = "bool",
                        key = member.key
                    },
                    dojo.Primitive_Tag.U8 => new Member
                    {
                        value = member.ty.primitive.u8,
                        cairoType = "u8",
                        key = member.key
                    },
                    dojo.Primitive_Tag.U16 => new Member
                    {
                        value = member.ty.primitive.u16,
                        cairoType = "u16",
                        key = member.key
                    },
                    dojo.Primitive_Tag.U32 => new Member
                    {
                        value = member.ty.primitive.u32,
                        cairoType = "u32",
                        key = member.key
                    },
                    dojo.Primitive_Tag.U64 => new Member
                    {
                        value = member.ty.primitive.u64,
                        cairoType = "u64",
                        key = member.key
                    },
                    dojo.Primitive_Tag.U128 => new Member
                    {
                        value = new BigInteger(member.ty.primitive.u128.ToArray()),
                        cairoType = "u128",
                        key = member.key
                    },
                    dojo.Primitive_Tag.U256 => new Member
                    {
                        value = new Dictionary<string, object>(){
                        {"high", new BigInteger(MemoryMarshal.Cast<ulong, byte>(member.ty.primitive.u256).Slice(16, 16).ToArray())},
                        {"low", new BigInteger(MemoryMarshal.Cast<ulong, byte>(member.ty.primitive.u256).Slice(0, 16).ToArray())}
                    },
                        cairoType = "u256",
                        key = member.key
                    },
                    dojo.Primitive_Tag.USize => new Member
                    {
                        value = member.ty.primitive.u_size,
                        cairoType = "usize",
                        key = member.key
                    },
                    dojo.Primitive_Tag.Felt252 => new Member
                    {
                        value = new FieldElement(member.ty.primitive.felt252),
                        cairoType = "felt252",
                        key = member.key
                    },
                    dojo.Primitive_Tag.ClassHash => new Member
                    {
                        value = new FieldElement(member.ty.primitive.class_hash),
                        cairoType = "class_hash",
                        key = member.key
                    },
                    dojo.Primitive_Tag.ContractAddress => new Member
                    {
                        value = new FieldElement(member.ty.primitive.contract_address),
                        cairoType = "contract_address",
                        key = member.key
                    },
                    _ => throw new Exception("Unknown primitive type")

                },
                dojo.Ty_Tag.Tuple_ => throw new Exception("Tuple not supported"),
                _ => throw new Exception("Unknown type")
            };
        }

        private object HandleWasmValue(WasmValue value)
        {
            return value.type switch
            {
                // struct
                "struct" => HandleJSStruct(value.value.ToObject<Dictionary<string, WasmValue>>()),
                // enum
                "enum" => value.value.ToObject<byte>(),
                // primitives
                "bool" => value.value.ToObject<bool>(),
                "u8" => value.value.ToObject<byte>(),
                "u16" => value.value.ToObject<ushort>(),
                "u32" => value.value.ToObject<uint>(),
                "u64" => value.value.ToObject<ulong>(),
                // NOTE: UNTESTED
                // NOTE: slow?
                // use BigInteger parse instead maybe but seems a bit
                // uninconvenient to use
                "u128" => new BigInteger(hexStringToByteArray(value.value.ToObject<string>()).Reverse().ToArray()),
                // convert a 64 character hex string to a BigInteger
                // IMPLEMNET
                "u256" => new Dictionary<string, object>(){
                    {"high", new BigInteger(hexStringToByteArray(value.value.ToObject<string>().Substring(0, 32)).Reverse().ToArray())},
                    {"low", new BigInteger(hexStringToByteArray(value.value.ToObject<string>().Substring(32, 32)).Reverse().ToArray())}
                },
                "usize" => value.value.ToObject<uint>(),
                // these should be fine
                "felt252" => new FieldElement(value.value.ToObject<string>()),
                "class_hash" => new FieldElement(value.value.ToObject<string>()),
                "contract_address" => new FieldElement(value.value.ToObject<string>()),
                _ => throw new Exception("Unknown primitive type")
            };
        }

        private byte[] hexStringToByteArray(string hex)
        {
            var bytes = Enumerable.Range(0, hex.Length)
                .Where(x => x % 2 == 0)
                .Select(x => Convert.ToByte(hex.Substring(x, 2), 16))
                .ToArray();

            return bytes;
        }

        private Dictionary<string, Member> HandleCStruct(dojo.Struct str)
        {
            return str.children.ToArray().Select(m => new KeyValuePair<string, Member>(m.name, HandleCValue(m))).ToDictionary(k => k.Key, v => v.Value);
        }

        private Dictionary<string, object> HandleJSStruct(Dictionary<string, WasmValue> str)
        {
            return str.Select(m => new KeyValuePair<string, object>(m.Key, HandleWasmValue(m.Value))).ToDictionary(k => k.Key, v => v.Value);
        }
    }
}