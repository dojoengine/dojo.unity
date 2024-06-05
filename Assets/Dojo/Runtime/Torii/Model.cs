using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Runtime.InteropServices;
using Dojo.Starknet;
using dojo_bindings;
using JetBrains.Annotations;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace Dojo.Torii
{
    public class Model
    {
        public struct Enum
        {
            public string option;
            public Ty value;

            public Enum(string option, Ty value)
            {
                this.option = option;
                this.value = value;
            }
        }

        public struct Ty
        {
            public dojo.Ty_Tag type;
            public string name;
            public object value;
            public bool key;

            public Ty(dojo.Ty_Tag type, string name, object value, bool key)
            {
                this.type = type;
                this.name = name;
                this.value = value;
                this.key = key;
            }
        }

        public string Name { get; }
        public Dictionary<string, Ty> Members { get; }

        public Model(string name, Dictionary<string, WasmValue> members)
        {
            Name = name;

            Members = members.ToDictionary(k => k.Key, v => HandleWasmValue(v.Value));
        }

        public Model(string name, Dictionary<string, Ty> members)
        {
            Name = name;
            Members = members;
        }

        public Model(dojo.Model model)
        {
            Name = model.name;
            Members = new Dictionary<string, Ty>(model.members.ToArray().Select(m => new KeyValuePair<string, Ty>(m.name, HandleCValue(m.ty, false))));
        }

        private Ty HandleCValue(dojo.Ty ty, bool key)
        {
            return ty.tag switch
            {
                dojo.Ty_Tag.Struct_ => new Ty(ty.tag, ty.struct_.name, HandleCStruct(ty.struct_), key),
                dojo.Ty_Tag.Enum_ => new Ty(ty.tag, ty.enum_.name, HandleCEnum(ty.enum_), key),
                dojo.Ty_Tag.Tuple_ => new Ty(ty.tag, "tuple", ty.tuple.ToArray().Select(m => HandleCValue(m, key)).ToArray(), key),
                dojo.Ty_Tag.Array_ => new Ty(ty.tag, "array", ty.array.ToArray().Select(m => HandleCValue(m, key)).ToList(), key),
                dojo.Ty_Tag.Primitive_ => ty.primitive.tag switch
                {
                    dojo.Primitive_Tag.Bool => new Ty(ty.tag, "bool", Convert.ToBoolean(ty.primitive.bool_.Value), key),
                    dojo.Primitive_Tag.U8 => new Ty(ty.tag, "u8", ty.primitive.u8, key),
                    dojo.Primitive_Tag.U16 => new Ty(ty.tag, "u16", ty.primitive.u16, key),
                    dojo.Primitive_Tag.U32 => new Ty(ty.tag, "u32", ty.primitive.u32, key),
                    dojo.Primitive_Tag.U64 => new Ty(ty.tag, "u64", ty.primitive.u64, key),
                    dojo.Primitive_Tag.U128 => new Ty(ty.tag, "u128", new BigInteger(ty.primitive.u128.ToArray()), key),
                    dojo.Primitive_Tag.U256 => new Ty(ty.tag, "u256", new Dictionary<string, object>(){
                        {"high", new BigInteger(MemoryMarshal.Cast<ulong, byte>(ty.primitive.u256).Slice(16, 16).ToArray())},
                        {"low", new BigInteger(MemoryMarshal.Cast<ulong, byte>(ty.primitive.u256).Slice(0, 16).ToArray())}
                    }, key),
                    dojo.Primitive_Tag.USize => new Ty(ty.tag, "usize", ty.primitive.u_size, key),
                    dojo.Primitive_Tag.Felt252 => new Ty(ty.tag, "felt252", new FieldElement(ty.primitive.felt252), key),
                    dojo.Primitive_Tag.ClassHash => new Ty(ty.tag, "class_hash", new FieldElement(ty.primitive.class_hash), key),
                    dojo.Primitive_Tag.ContractAddress => new Ty(ty.tag, "contract_address", new FieldElement(ty.primitive.contract_address), key),
                    _ => throw new Exception("Unknown primitive type: " + ty.primitive.tag)
                },
                dojo.Ty_Tag.ByteArray => new Ty(ty.tag, "bytearray", ty.byte_array, key),
                _ => throw new Exception("Unknown type: " + ty.tag)
            };
        }

        private Ty HandleWasmValue(WasmValue value)
        {
            return value.type switch
            {
                // struct
                "struct" => new Ty(dojo.Ty_Tag.Struct_, value.value.ToObject<WasmStruct>().name, HandleJSStruct(value.value.ToObject<WasmStruct>()), value.key),
                // enum
                "enum" => new Ty(dojo.Ty_Tag.Enum_, value.value.ToObject<WasmEnum>().name, HandleJSEnum(value.value.ToObject<WasmEnum>()), value.key),
                // tuple
                "tuple" => new Ty(dojo.Ty_Tag.Tuple_, "tuple", value.value.ToObject<JArray>().Select(m => HandleWasmValue(m.ToObject<WasmValue>())).ToArray(), value.key),
                // array
                "array" => new Ty(dojo.Ty_Tag.Array_, "array", value.value.ToObject<JArray>().Select(m => HandleWasmValue(m.ToObject<WasmValue>())).ToList(), value.key),
                // primitives
                "bool" => new Ty(dojo.Ty_Tag.Primitive_, "bool", value.value.ToObject<bool>(), value.key),
                "u8" => new Ty(dojo.Ty_Tag.Primitive_, "u8", value.value.ToObject<byte>(), value.key),
                "u16" => new Ty(dojo.Ty_Tag.Primitive_, "u16", value.value.ToObject<ushort>(), value.key),
                "u32" => new Ty(dojo.Ty_Tag.Primitive_, "u32", value.value.ToObject<uint>(), value.key),
                "u64" => new Ty(dojo.Ty_Tag.Primitive_, "u64", value.value.ToObject<ulong>(), value.key),
                // NOTE: UNTESTED
                // NOTE: slow?
                // use BigInteger parse instead maybe but seems a bit
                // uninconvenient to use
                "u128" => new Ty(dojo.Ty_Tag.Primitive_, "u128", new BigInteger(hexStringToByteArray(value.value.ToObject<string>()).Reverse().ToArray()), value.key),
                // convert a 64 character hex string to a BigInteger
                // IMPLEMNET
                "u256" => new Ty(dojo.Ty_Tag.Primitive_, "u256", new Dictionary<string, object>(){
                    {"high", new BigInteger(hexStringToByteArray(value.value.ToObject<string>().Substring(0, 32)).Reverse().ToArray())},
                    {"low", new BigInteger(hexStringToByteArray(value.value.ToObject<string>().Substring(32, 32)).Reverse().ToArray())}
                }, value.key),
                "usize" => new Ty(dojo.Ty_Tag.Primitive_, "usize", value.value.ToObject<uint>(), value.key),
                // these should be fine
                "felt252" => new Ty(dojo.Ty_Tag.Primitive_, "felt252", new FieldElement(value.value.ToObject<string>()), value.key),
                "class_hash" => new Ty(dojo.Ty_Tag.Primitive_, "class_hash", new FieldElement(value.value.ToObject<string>()), value.key),
                "contract_address" => new Ty(dojo.Ty_Tag.Primitive_, "contract_address", new FieldElement(value.value.ToObject<string>()), value.key),
                "bytearray" => new Ty(dojo.Ty_Tag.ByteArray, "bytearray", value.value.ToObject<string>(), value.key),
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

        private Dictionary<string, Ty> HandleCStruct(dojo.Struct str)
        {
            return str.children.ToArray().Select(m => new KeyValuePair<string, Ty>(m.name, HandleCValue(m.ty, m.key))).ToDictionary(k => k.Key, v => v.Value);
        }

        private Enum HandleCEnum(dojo.Enum en)
        {
            var option = en.options[en.option];

            // maybe we should inherit the key?
            return new Enum(option.name, HandleCValue(option.ty, false));
        }

        private Dictionary<string, Ty> HandleJSStruct(WasmStruct str)
        {
            return str.children.Select(m => new KeyValuePair<string, Ty>(m.Key, HandleWasmValue(m.Value))).ToDictionary(k => k.Key, v => v.Value);
        }

        private Enum HandleJSEnum(WasmEnum en)
        {
            return new Enum(en.option, HandleWasmValue(en.value));
        }
    }
}