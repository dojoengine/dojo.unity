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
            public string name;
            public string option;
            public object value;

            public Enum(string name, string option, object value)
            {
                this.name = name;
                this.option = option;
                this.value = value;
            }
        }

        public struct Struct {
            public string name;
            public Dictionary<string, object> members;

            public Struct(string name, Dictionary<string, object> members)
            {
                this.name = name;
                this.members = members;
            }
        }

        public string Name { get; }
        public Dictionary<string, object> Members { get; }

        public Model(string name, Dictionary<string, WasmValue> members)
        {
            Name = name;

            Members = members.ToDictionary(k => k.Key, v => HandleWasmValue(v.Value));
        }

        public Model(string name, Dictionary<string, object> members)
        {
            Name = name;
            Members = members;
        }

        public Model(dojo.Model model)
        {
            Name = model.name;
            Members = new Dictionary<string, object>(model.members.ToArray().Select(m => new KeyValuePair<string, object>(m.name, HandleCValue(m.ty))));
        }

        private object HandleCValue(dojo.Ty ty)
        {
            return ty.tag switch
            {
                dojo.Ty_Tag.Struct_ => HandleCStruct(ty.struct_),
                dojo.Ty_Tag.Enum_ => HandleCEnum(ty.enum_),
                dojo.Ty_Tag.Tuple_ => ty.tuple.ToArray().Select(m => HandleCValue(m)).ToArray(),
                dojo.Ty_Tag.Array_ => ty.array.ToArray().Select(m => HandleCValue(m)).ToList(),
                dojo.Ty_Tag.Primitive_ => ty.primitive.tag switch
                {
                    dojo.Primitive_Tag.Bool => Convert.ToBoolean(ty.primitive.bool_.Value),
                    dojo.Primitive_Tag.U8 => ty.primitive.u8,
                    dojo.Primitive_Tag.U16 => ty.primitive.u16,
                    dojo.Primitive_Tag.U32 => ty.primitive.u32,
                    dojo.Primitive_Tag.U64 => ty.primitive.u64,
                    dojo.Primitive_Tag.U128 => new BigInteger(ty.primitive.u128.ToArray()),
                    dojo.Primitive_Tag.U256 => new Dictionary<string, object>(){
                        {"high", new BigInteger(MemoryMarshal.Cast<ulong, byte>(ty.primitive.u256).Slice(16, 16).ToArray())},
                        {"low", new BigInteger(MemoryMarshal.Cast<ulong, byte>(ty.primitive.u256).Slice(0, 16).ToArray())}
                    },
                    dojo.Primitive_Tag.USize => ty.primitive.u_size,
                    dojo.Primitive_Tag.Felt252 => new FieldElement(ty.primitive.felt252),
                    dojo.Primitive_Tag.ClassHash => new FieldElement(ty.primitive.class_hash),
                    dojo.Primitive_Tag.ContractAddress => new FieldElement(ty.primitive.contract_address),
                    _ => throw new Exception("Unknown primitive type: " + ty.primitive.tag)
                },
                dojo.Ty_Tag.ByteArray => ty.byte_array,
                _ => throw new Exception("Unknown type: " + ty.tag)
            };
        }

        private object HandleWasmValue(WasmValue value)
        {
            return value.type switch
            {
                // struct
                "struct" => HandleJSStruct(value.type_name, value.value.ToObject<Dictionary<string, WasmValue>>()),
                // enum
                "enum" => HandleJSEnum(value.type_name, value.value.ToObject<WasmEnum>()),
                // tuple
                "tuple" => value.value.ToObject<JArray>().Select(m => HandleWasmValue(m.ToObject<WasmValue>())).ToArray(),
                // array
                "array" => value.value.ToObject<JArray>().Select(m => HandleWasmValue(m.ToObject<WasmValue>())).ToList(),
                "bytearray" => value.value.ToObject<string>(),
                "primitive" => value.type_name switch
                {
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
                    _ => throw new Exception("Unknown primitive type: " + value.type_name)
                },
                _ => throw new Exception("Unknown type: " + value.type)
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

        private Struct HandleCStruct(dojo.Struct str)
        {
            return new Struct(str.name, str.children.ToArray().Select(m => new KeyValuePair<string, object>(m.name, HandleCValue(m.ty))).ToDictionary(k => k.Key, v => v.Value));
        }

        private Enum HandleCEnum(dojo.Enum en)
        {
            var option = en.options[en.option];

            // maybe we should inherit the key?
            return new Enum(en.name, option.name, HandleCValue(option.ty));
        }

        private Struct HandleJSStruct(string name, Dictionary<string, WasmValue> str)
        {
            return new Struct(name, str.Select(m => new KeyValuePair<string, object>(m.Key, HandleWasmValue(m.Value))).ToDictionary(k => k.Key, v => v.Value));
        }

        private Enum HandleJSEnum(string name, WasmEnum en)
        {
            return new Enum(name, en.option, HandleWasmValue(en.value));
        }
    }
}