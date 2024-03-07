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
    public class Model
    {
        public string Name { get; }
        public Dictionary<string, object> Members { get; }

        public Model(string name, Dictionary<string, WasmValue> members)
        {
            Name = name;

            Members = members.ToDictionary(k => k.Key, v => HandleWasmValue(v.Value));
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
                dojo.Ty_Tag.Enum_ => ty.enum_.option,
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

        private Dictionary<string, object> HandleCStruct(dojo.Struct str)
        {
            return str.children.ToArray().Select(m => new KeyValuePair<string, object>(m.name, HandleCValue(m.ty))).ToDictionary(k => k.Key, v => v.Value);
        }

        private Dictionary<string, object> HandleJSStruct(Dictionary<string, WasmValue> str)
        {
            return str.Select(m => new KeyValuePair<string, object>(m.Key, HandleWasmValue(m.Value))).ToDictionary(k => k.Key, v => v.Value);
        }
    }
}