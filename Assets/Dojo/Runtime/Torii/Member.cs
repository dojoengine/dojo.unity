using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Dojo.Starknet;
using dojo_bindings;
using Newtonsoft.Json.Linq;
using UnityEngine;
using Debug = UnityEngine.Debug;

namespace Dojo.Torii
{
    public class Member
    {
        public string Name { get; }

        public dojo.Ty Value { get; }

        // public bool Key { get; }
        

        public Member(dojo.Member member)
        {
            Name = member.name;
            Value = member.ty;
            // Key = member.key;
            
            // Dynamically sets the value of the member
            // Not supported in AOT
            // Value = member.ty.tag switch
            // {
            //     dojo.Ty_Tag.TyStruct => HandleStruct(member.ty.ty_struct),
            //     dojo.Ty_Tag.TyEnum => member.ty.ty_enum.option,
            //     dojo.Ty_Tag.TyPrimitive => member.ty.ty_primitive.tag switch {
            //         dojo.Primitive_Tag.PBool => member.ty.ty_primitive.p_bool,
            //         dojo.Primitive_Tag.U8 => member.ty.ty_primitive.u8,
            //         dojo.Primitive_Tag.U16 => member.ty.ty_primitive.u16,
            //         dojo.Primitive_Tag.U32 => member.ty.ty_primitive.u32,
            //         dojo.Primitive_Tag.U64 => member.ty.ty_primitive.u64,
            //         dojo.Primitive_Tag.U128 => member.ty.ty_primitive.u128.ToArray(),
            //         dojo.Primitive_Tag.U256 => member.ty.ty_primitive.u256.ToArray(),
            //         dojo.Primitive_Tag.USize => member.ty.ty_primitive.u_size,
            //         dojo.Primitive_Tag.Felt252 => member.ty.ty_primitive.felt252,
            //         dojo.Primitive_Tag.ClassHash => member.ty.ty_primitive.class_hash,
            //         dojo.Primitive_Tag.ContractAddress => member.ty.ty_primitive.contract_address,
            //         _ => throw new Exception("Unknown primitive type")
                
            //     },
            //     dojo.Ty_Tag.TyTuple => throw new Exception("Tuple not supported"),
            //     _ => throw new Exception("Unknown type")
            // };

        }

        public Member(string name, string type, JToken value) {
            Name = name;
            Value = type switch {
                // struct
                // "struct" => 
                // enum
                "enum" => new dojo.Ty { tag = dojo.Ty_Tag.Enum_, enum_ = new dojo.Enum { option = value.ToObject<byte>() } },
                // primitives
                "bool" => new dojo.Ty { tag = dojo.Ty_Tag.Primitive_, primitive = new dojo.Primitive { tag = dojo.Primitive_Tag.Bool, bool_ = value.ToObject<bool>() } },
                "u8" => new dojo.Ty { tag = dojo.Ty_Tag.Primitive_, primitive = new dojo.Primitive { tag = dojo.Primitive_Tag.U8, u8 = value.ToObject<byte>() } },
                "u16" => new dojo.Ty { tag = dojo.Ty_Tag.Primitive_, primitive = new dojo.Primitive { tag = dojo.Primitive_Tag.U16, u16 = value.ToObject<ushort>() } },
                "u32" => new dojo.Ty { tag = dojo.Ty_Tag.Primitive_, primitive = new dojo.Primitive { tag = dojo.Primitive_Tag.U32, u32 = value.ToObject<uint>() } },
                "u64" => new dojo.Ty { tag = dojo.Ty_Tag.Primitive_, primitive = new dojo.Primitive { tag = dojo.Primitive_Tag.U64, u64 = value.ToObject<ulong>() } },
                "u128" => new dojo.Ty { tag = dojo.Ty_Tag.Primitive_, primitive = new dojo.Primitive { tag = dojo.Primitive_Tag.U128, u128 = hexToU128(value.ToObject<string>()) } },
                "u256" => new dojo.Ty { tag = dojo.Ty_Tag.Primitive_, primitive = new dojo.Primitive { tag = dojo.Primitive_Tag.U256, u256 = hexToU256(value.ToObject<string>()) } },
                "usize" => new dojo.Ty { tag = dojo.Ty_Tag.Primitive_, primitive = new dojo.Primitive { tag = dojo.Primitive_Tag.USize, u_size = value.ToObject<uint>() } },
                "felt252" => new dojo.Ty { tag = dojo.Ty_Tag.Primitive_, primitive = new dojo.Primitive { tag = dojo.Primitive_Tag.Felt252, felt252 = new FieldElement(value.ToObject<string>()).Inner() } },
                "class_hash" => new dojo.Ty { tag = dojo.Ty_Tag.Primitive_, primitive = new dojo.Primitive { tag = dojo.Primitive_Tag.ClassHash, class_hash = new FieldElement(value.ToObject<string>()).Inner() } },
                "contract_address" => new dojo.Ty { tag = dojo.Ty_Tag.Primitive_, primitive = new dojo.Primitive { tag = dojo.Primitive_Tag.ContractAddress, contract_address = new FieldElement(value.ToObject<string>()).Inner() } },
            };
        }

        private Span<byte> hexToU128(string hex) {
            // remove 0x
            hex = hex.Substring(2);
            // add leading zeros
            hex = hex.PadLeft(32, '0');

            var bytes = new byte[16];
            for (var i = 0; i < 16; i++) {
                bytes[i] = Convert.ToByte(hex.Substring(i * 2, 2), 16);
            }
            return bytes;
        }

        private Span<ulong> hexToU256(string hex) {
            // remove 0x
            hex = hex.Substring(2);
            // add leading zeros
            hex = hex.PadLeft(64, '0');

            var bytes = new ulong[4];
            for (var i = 0; i < 4; i++) {
                bytes[i] = Convert.ToUInt64(hex.Substring(i * 16, 16), 16);
            }
            return bytes;
        }

        // Dynamic is not supported in AOT
        private Dictionary<string, Member> HandleStruct(dojo.Struct str)
        {
            return str.children.ToArray().Select(m => new KeyValuePair<string, Member>(m.name, new Member(m))).ToDictionary(k => k.Key, v => v.Value);
        }

        // public dynamic value => _ty.tag switch
        // {
        //     dojo.Ty_Tag.TyStruct => _ty.ty_struct,
        //     dojo.Ty_Tag.TyEnum => new Enum(_ty.ty_enum),
        //     dojo.Ty_Tag.TyPrimitive => _ty.ty_primitive,
        //     dojo.Ty_Tag.TyTuple => _ty.ty_tuple.ToArray().Select(t => new Member(t)).ToArray(),
        //     _ => throw new Exception("Unknown type")
        // };

        // freeing the member is naive. if we copy the member we will double free
        // and seg fault.
        // ~Member()
        // {
        //     dojo.ty_free(_ty);
        // }
    }
}