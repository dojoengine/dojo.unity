using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Runtime.InteropServices;
using Dojo.Starknet;
using dojo_bindings;
using JetBrains.Annotations;
using Newtonsoft.Json;
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

        public struct Struct
        {
            public string name;
            public Dictionary<string, object> members;

            public Struct(string name, Dictionary<string, object> members)
            {
                this.name = name;
                this.members = members;
            }
        }

        public struct FixedSizeArray
        {
            public object[] array;
            public uint size;

            public FixedSizeArray(object[] array, uint size)
            {
                this.array = array;
                this.size = size;
            }
        }

        public string Name { get; }
        public Dictionary<string, object> Members { get; }

#if UNITY_WEBGL && !UNITY_EDITOR
        public Model(string name, Dictionary<string, WasmValue> members)
        {
            Name = name;

            Members = members.ToDictionary(k => k.Key, v => HandleWasmValue(v.Value));
        }
#endif

        public Model(string name, Dictionary<string, object> members)
        {
            Name = name;
            Members = members;
        }

        public Model(dojo.Struct model)
        {
            Name = model.name;
            Members = new Dictionary<string, object>(model.children.ToArray().Select(m => new KeyValuePair<string, object>(m.name, HandleCValue(m.ty))));
        }

        private object HandleCValue(dojo.Ty ty)
        {
            return ty.tag switch
            {
                dojo.Ty_Tag.Struct_ => HandleCStruct(ty.struct_),
                dojo.Ty_Tag.Enum_ => HandleCEnum(ty.enum_),
                dojo.Ty_Tag.FixedSizeArray_ => new FixedSizeArray(ty.fixed_size_array.array.ToArray().Select(m => HandleCValue(m)).ToArray(), ty.fixed_size_array.size),
                dojo.Ty_Tag.Tuple_ => ty.tuple.ToArray().Select(m => HandleCValue(m)).ToArray(),
                dojo.Ty_Tag.Array_ => ty.array.ToArray().Select(m => HandleCValue(m)).ToList(),
                dojo.Ty_Tag.Primitive_ => ty.primitive.tag switch
                {
                    dojo.Primitive_Tag.Bool => Convert.ToBoolean(ty.primitive.bool_.Value),
                    dojo.Primitive_Tag.I8 => ty.primitive.i8,
                    dojo.Primitive_Tag.I16 => ty.primitive.i16,
                    dojo.Primitive_Tag.I32 => ty.primitive.i32,
                    dojo.Primitive_Tag.I64 => ty.primitive.i64,
                    dojo.Primitive_Tag.I128 => ConvertTwosComplementToBigInteger(ty.primitive.i128.ToArray(), bits: 128),
                    dojo.Primitive_Tag.U8 => ty.primitive.u8,
                    dojo.Primitive_Tag.U16 => ty.primitive.u16,
                    dojo.Primitive_Tag.U32 => ty.primitive.u32,
                    dojo.Primitive_Tag.U64 => ty.primitive.u64,
                    dojo.Primitive_Tag.U128 => ConvertTwosComplementToBigInteger(ty.primitive.u128.ToArray(), unsigned: true, bits: 128),
                    dojo.Primitive_Tag.U256_ => new Struct("U256", new Dictionary<string, object>(){
                        {"high", new BigInteger(ty.primitive.u256.data.Slice(16, 16).ToArray())},
                        {"low", new BigInteger(ty.primitive.u256.data.Slice(0, 16).ToArray())}
                    }),
                    dojo.Primitive_Tag.Felt252 => new FieldElement(ty.primitive.felt252),
                    dojo.Primitive_Tag.ClassHash => new FieldElement(ty.primitive.class_hash),
                    dojo.Primitive_Tag.ContractAddress => new FieldElement(ty.primitive.contract_address),
                    dojo.Primitive_Tag.EthAddress => new FieldElement(ty.primitive.eth_address),
                    _ => throw new Exception("Unknown primitive type: " + ty.primitive.tag)
                },
                dojo.Ty_Tag.ByteArray => ty.byte_array,
                _ => throw new Exception("Unknown type: " + ty.tag)
            };
        }

#if UNITY_WEBGL && !UNITY_EDITOR
        private object HandleWasmValue(WasmValue value)
        {
            return value.type.ToLower() switch
            {
                // struct
                "struct" => HandleJSStruct(value.type_name, value.value.ToObject<Dictionary<string, WasmValue>>()),
                // enum
                "enum" => HandleJSEnum(value.type_name, value.value.ToObject<WasmEnum>()),
                // tuple
                "tuple" => value.value.ToObject<JArray>().Select(m => HandleWasmValue(m.ToObject<WasmValue>())).ToArray(),
                // array
                "array" => value.value.ToObject<JArray>().Select(m => HandleWasmValue(m.ToObject<WasmValue>())).ToList(),
                "fixed_size_array" => HandleWasmFixedSizeArray(value.value.ToObject<WasmFixedSizeArray>()),
                "bytearray" => value.value.ToObject<string>(),
                "primitive" => value.type_name.ToLower() switch
                {
                    // primitives
                    "bool" => value.value.ToObject<bool>(),
                    "i8" => value.value.ToObject<sbyte>(),
                    "i16" => value.value.ToObject<short>(),
                    "i32" => value.value.ToObject<int>(),
                    "i64" => long.Parse(value.value.ToObject<string>()),
                    "i128" => BigInteger.Parse(value.value.ToObject<string>()),
                    "u8" => value.value.ToObject<byte>(),
                    "u16" => value.value.ToObject<ushort>(),
                    "u32" => value.value.ToObject<uint>(),
                    "u64" => ulong.Parse(value.value.ToObject<string>()),
                    "u128" => BigInteger.Parse(value.value.ToObject<string>()),
                    // convert a 64 character hex string to a BigInteger
                    // IMPLEMNET
                    "u256" => new Struct("U256", new Dictionary<string, object>(){
                        {"high", new BigInteger(hexStringToByteArray(value.value.ToObject<string>().Substring(2, 32)).Reverse().ToArray())},
                        {"low", new BigInteger(hexStringToByteArray(value.value.ToObject<string>().Substring(34, 32)).Reverse().ToArray())}
                    }),
                    // these should be fine
                    "felt252" => new FieldElement(value.value.ToObject<string>()),
                    "classhash" => new FieldElement(value.value.ToObject<string>()),
                    "contractaddress" => new FieldElement(value.value.ToObject<string>()),
                    "ethaddress" => new FieldElement(value.value.ToObject<string>()),
                    _ => throw new Exception("Unknown primitive type: " + value.type_name)
                },
                _ => throw new Exception("Unknown type: " + value.type)
            };
        }
#endif
        private byte[] hexStringToByteArray(string hex)
        {
            // Remove "0x" prefix if present
            hex = hex.StartsWith("0x", StringComparison.OrdinalIgnoreCase) ? hex[2..] : hex;

            // Ensure even number of characters
            if (hex.Length % 2 != 0)
                hex = "0" + hex;

            byte[] bytes = new byte[hex.Length / 2];

            for (int i = 0; i < bytes.Length; i++)
            {
                string byteValue = hex.Substring(i * 2, 2);
                bytes[i] = Convert.ToByte(byteValue, 16);
            }

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

#if UNITY_WEBGL && !UNITY_EDITOR
        private Struct HandleJSStruct(string name, Dictionary<string, WasmValue> str)
        {
            return new Struct(name, str.Select(m => new KeyValuePair<string, object>(m.Key, HandleWasmValue(m.Value))).ToDictionary(k => k.Key, v => v.Value));
        }

        private Enum HandleJSEnum(string name, WasmEnum en)
        {
            return new Enum(name, en.option, HandleWasmValue(en.value));
        }

        private FixedSizeArray HandleWasmFixedSizeArray(WasmFixedSizeArray fixedSizeArray)
        {
            var processedArray = fixedSizeArray.array.Select(m => HandleWasmValue(m)).ToArray();
            return new FixedSizeArray(processedArray, fixedSizeArray.size);
        }
#endif
        private BigInteger ConvertTwosComplementToBigInteger(byte[] bytes, bool unsigned = false, int bits = 128)
        {
            var reversed = bytes.Reverse().ToArray();
            var n = new BigInteger(reversed);
            if (unsigned) return n;

            // For 128-bit numbers
            BigInteger maxValue = (BigInteger.One << (bits - 1)) - 1;

            // If the number is larger than the maximum positive value,
            // it's negative in two's complement
            if (n > maxValue)
            {
                // Convert from two's complement by subtracting 2^128
                n -= BigInteger.One << bits;
            }

            return n;
        }
    }
}