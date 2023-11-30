
// <auto-generated>
//  This code was generated by the following tool on 2023-11-30 14:47:43 GMT-05:00:
//      https://github.com/bottlenoselabs/c2cs (v0.0.0.0)
//
//  Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
// </auto-generated>
// ReSharper disable All

#region Template
#nullable enable
#pragma warning disable CS1591
#pragma warning disable CS8981
using bottlenoselabs.C2CS.Runtime;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Runtime.InteropServices;
using System.Runtime.CompilerServices;
#endregion

namespace dojo_bindings
{

    public static unsafe partial class dojo
    {
        private const string LibraryName = "libtorii_c.dylib";

        #region API

        [CNode(Kind = "Function")]
        [LibraryImport(LibraryName, EntryPoint = "client_add_entities_to_sync")]
        [UnmanagedCallConv(CallConvs = new[] { typeof(CallConvCdecl) })]
        public static partial void client_add_entities_to_sync(ToriiClient* client, Keys* entities, UIntPtr entities_len, Error* error);

        [CNode(Kind = "Function")]
        [LibraryImport(LibraryName, EntryPoint = "client_entity")]
        [UnmanagedCallConv(CallConvs = new[] { typeof(CallConvCdecl) })]
        public static partial Ty* client_entity(ToriiClient* client, Keys* keys, Error* error);

        [CNode(Kind = "Function")]
        [LibraryImport(LibraryName, EntryPoint = "client_free")]
        [UnmanagedCallConv(CallConvs = new[] { typeof(CallConvCdecl) })]
        public static partial void client_free(ToriiClient* client);

        [CNode(Kind = "Function")]
        [LibraryImport(LibraryName, EntryPoint = "client_metadata")]
        [UnmanagedCallConv(CallConvs = new[] { typeof(CallConvCdecl) })]
        public static partial WorldMetadata client_metadata(ToriiClient* client);

        [CNode(Kind = "Function")]
        [LibraryImport(LibraryName, EntryPoint = "client_new")]
        [UnmanagedCallConv(CallConvs = new[] { typeof(CallConvCdecl) })]
        public static partial ToriiClient* client_new(CString torii_url, CString rpc_url, CString world, Keys* entities, UIntPtr entities_len, Error* error);

        [CNode(Kind = "Function")]
        [LibraryImport(LibraryName, EntryPoint = "client_on_entity_state_update")]
        [UnmanagedCallConv(CallConvs = new[] { typeof(CallConvCdecl) })]
        public static partial void client_on_entity_state_update(ToriiClient* client, Keys* entity, FnPtr_Void callback);

        [CNode(Kind = "Function")]
        [LibraryImport(LibraryName, EntryPoint = "client_remove_entities_to_sync")]
        [UnmanagedCallConv(CallConvs = new[] { typeof(CallConvCdecl) })]
        public static partial void client_remove_entities_to_sync(ToriiClient* client, Keys* entities, UIntPtr entities_len, Error* error);

        [CNode(Kind = "Function")]
        [LibraryImport(LibraryName, EntryPoint = "client_start_subscription")]
        [UnmanagedCallConv(CallConvs = new[] { typeof(CallConvCdecl) })]
        public static partial void client_start_subscription(ToriiClient* client, Error* error);

        [CNode(Kind = "Function")]
        [LibraryImport(LibraryName, EntryPoint = "client_subscribed_entities")]
        [UnmanagedCallConv(CallConvs = new[] { typeof(CallConvCdecl) })]
        public static partial CArray_KeysClause* client_subscribed_entities(ToriiClient* client);

        [CNode(Kind = "Function")]
        [LibraryImport(LibraryName, EntryPoint = "keys_free")]
        [UnmanagedCallConv(CallConvs = new[] { typeof(CallConvCdecl) })]
        public static partial void keys_free(CArray_KeysClause* array);

        [CNode(Kind = "Function")]
        [LibraryImport(LibraryName, EntryPoint = "ty_free")]
        [UnmanagedCallConv(CallConvs = new[] { typeof(CallConvCdecl) })]
        public static partial void ty_free(Ty* ty);

        #endregion

        #region Types

        [CNode(Kind = "FunctionPointer")]
        [StructLayout(LayoutKind.Sequential)]
        public struct FnPtr_Void
        {
            [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
            public unsafe delegate void @delegate();

            public IntPtr Pointer;

            public FnPtr_Void(@delegate d)
            {
                Pointer = Marshal.GetFunctionPointerForDelegate(d);
            }
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 16, Pack = 8)]
        public struct CArray_CHashItem______c_char__ModelMetadata
        {
            [FieldOffset(0)] // size = 8
            public CHashItem______c_char__ModelMetadata* data;

            [FieldOffset(8)] // size = 8
            public UIntPtr data_len;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 16, Pack = 8)]
        public struct CArray_EnumOption
        {
            [FieldOffset(0)] // size = 8
            public EnumOption* data;

            [FieldOffset(8)] // size = 8
            public UIntPtr data_len;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 16, Pack = 8)]
        public struct CArray_FieldElement
        {
            [FieldOffset(0)] // size = 8
            public FieldElement* data;

            [FieldOffset(8)] // size = 8
            public UIntPtr data_len;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 16, Pack = 8)]
        public struct CArray_KeysClause
        {
            [FieldOffset(0)] // size = 8
            public KeysClause* data;

            [FieldOffset(8)] // size = 8
            public UIntPtr data_len;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 16, Pack = 8)]
        public struct CArray_Member
        {
            [FieldOffset(0)] // size = 8
            public Member* data;

            [FieldOffset(8)] // size = 8
            public UIntPtr data_len;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 16, Pack = 8)]
        public struct CArray_Ty
        {
            [FieldOffset(0)] // size = 8
            public Ty* data;

            [FieldOffset(8)] // size = 8
            public UIntPtr data_len;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 16, Pack = 8)]
        public struct CArray______c_char
        {
            [FieldOffset(0)] // size = 8
            public CString* data;

            [FieldOffset(8)] // size = 8
            public UIntPtr data_len;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 120, Pack = 8)]
        public struct CHashItem______c_char__ModelMetadata
        {
            [FieldOffset(0)] // size = 8
            public CString _key;

            public string key
            {
                get
                {
                    return CString.ToString(_key);
                }
                set
                {
                    _key = CString.FromString(value);
                }
            }

            [FieldOffset(8)] // size = 112
            public ModelMetadata value;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 32, Pack = 8)]
        public struct Enum
        {
            [FieldOffset(0)] // size = 8
            public CString _name;

            public string name
            {
                get
                {
                    return CString.ToString(_name);
                }
                set
                {
                    _name = CString.FromString(value);
                }
            }

            [FieldOffset(8)] // size = 1
            public byte option;

            [FieldOffset(16)] // size = 16
            public CArray_EnumOption _options;

            public Span<EnumOption> options
            {
                get
                {
                    fixed (Enum* @this = &this)
                    {
                        var span = new Span<EnumOption>(@this->_options.data, (int)@this->_options.data_len);
                        return span;
                    }
                }

                set
                {
                    _options = new CArray_EnumOption();
                    _options.data_len = (UIntPtr)value.Length;
                    fixed (EnumOption* ptr = &value[0])
                    {
                        _options.data = ptr;
                    }
                }
            }

        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 16, Pack = 8)]
        public struct EnumOption
        {
            [FieldOffset(0)] // size = 8
            public CString _name;

            public string name
            {
                get
                {
                    return CString.ToString(_name);
                }
                set
                {
                    _name = CString.FromString(value);
                }
            }

            [FieldOffset(8)] // size = 8
            public Ty* ty;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 8, Pack = 8)]
        public struct Error
        {
            [FieldOffset(0)] // size = 8
            public CString _message;

            public string message
            {
                get
                {
                    return CString.ToString(_message);
                }
                set
                {
                    _message = CString.FromString(value);
                }
            }
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 32, Pack = 1)]
        public struct FieldElement
        {
            [FieldOffset(0)] // size = 32
            public fixed byte _data[32]; // uint8_t[32]

            public readonly Span<byte> data
            {
                get
                {
                    fixed (FieldElement* @this = &this)
                    {
                        var pointer = &@this->_data[0];
                        var span = new Span<byte>(pointer, 32);
                        return span;
                    }
                }
            }
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 24, Pack = 8)]
        public struct Keys
        {
            [FieldOffset(0)] // size = 8
            public CString _model;

            public string model
            {
                get
                {
                    return CString.ToString(_model);
                }
                set
                {
                    _model = CString.FromString(value);
                }
            }

            [FieldOffset(8)] // size = 16
            public CArray______c_char _keys;

            public Span<CString> keys
            {
                get
                {
                    fixed (Keys* @this = &this)
                    {
                        var span = new Span<CString>(@this->_keys.data, (int)@this->_keys.data_len);
                        return span;
                    }
                }

                set
                {
                    _keys = new CArray______c_char();
                    _keys.data_len = (UIntPtr)value.Length;
                    fixed (CString* ptr = &value[0])
                    {
                        _keys.data = ptr;
                    }
                }
            }

        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 24, Pack = 8)]
        public struct KeysClause
        {
            [FieldOffset(0)] // size = 8
            public CString _model;

            public string model
            {
                get
                {
                    return CString.ToString(_model);
                }
                set
                {
                    _model = CString.FromString(value);
                }
            }

            [FieldOffset(8)] // size = 16
            public CArray_FieldElement _keys;

            public Span<FieldElement> keys
            {
                get
                {
                    fixed (KeysClause* @this = &this)
                    {
                        var span = new Span<FieldElement>(@this->_keys.data, (int)@this->_keys.data_len);
                        return span;
                    }
                }

                set
                {
                    _keys = new CArray_FieldElement();
                    _keys.data_len = (UIntPtr)value.Length;
                    fixed (FieldElement* ptr = &value[0])
                    {
                        _keys.data = ptr;
                    }
                }
            }

        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 24, Pack = 8)]
        public struct Member
        {
            [FieldOffset(0)] // size = 8
            public CString _name;

            public string name
            {
                get
                {
                    return CString.ToString(_name);
                }
                set
                {
                    _name = CString.FromString(value);
                }
            }

            [FieldOffset(8)] // size = 8
            public Ty* ty;

            [FieldOffset(16)] // size = 1
            public CBool key;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 112, Pack = 8)]
        public struct ModelMetadata
        {
            [FieldOffset(0)] // size = 48
            public Ty schema;

            [FieldOffset(48)] // size = 8
            public CString _name;

            public string name
            {
                get
                {
                    return CString.ToString(_name);
                }
                set
                {
                    _name = CString.FromString(value);
                }
            }

            [FieldOffset(56)] // size = 4
            public uint packed_size;

            [FieldOffset(60)] // size = 4
            public uint unpacked_size;

            [FieldOffset(64)] // size = 32
            public FieldElement class_hash;

            [FieldOffset(96)] // size = 16
            public CArray_FieldElement _layout;

            public Span<FieldElement> layout
            {
                get
                {
                    fixed (ModelMetadata* @this = &this)
                    {
                        var span = new Span<FieldElement>(@this->_layout.data, (int)@this->_layout.data_len);
                        return span;
                    }
                }

                set
                {
                    _layout = new CArray_FieldElement();
                    _layout.data_len = (UIntPtr)value.Length;
                    fixed (FieldElement* ptr = &value[0])
                    {
                        _layout.data = ptr;
                    }
                }
            }

        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 40, Pack = 8)]
        public struct Primitive
        {
            [FieldOffset(0)] // size = 4
            public Primitive_Tag tag;

            [FieldOffset(0)] // size = 1
            public byte u8;

            [FieldOffset(0)] // size = 2
            public ushort u16;

            [FieldOffset(0)] // size = 4
            public uint u32;

            [FieldOffset(0)] // size = 8
            public ulong u64;

            [FieldOffset(0)] // size = 16
            public fixed byte _u128[16]; // uint8_t[16]

            public readonly Span<byte> u128
            {
                get
                {
                    fixed (Primitive* @this = &this)
                    {
                        var pointer = &@this->_u128[0];
                        var span = new Span<byte>(pointer, 16);
                        return span;
                    }
                }
            }

            [FieldOffset(0)] // size = 32
            public fixed byte _u256[32]; // uint64_t[4]

            public readonly Span<ulong> u256
            {
                get
                {
                    fixed (Primitive* @this = &this)
                    {
                        var pointer = &@this->_u256[0];
                        var span = new Span<ulong>(pointer, 4);
                        return span;
                    }
                }
            }

            [FieldOffset(0)] // size = 4
            public uint u_size;

            [FieldOffset(0)] // size = 1
            public CBool p_bool;

            [FieldOffset(0)] // size = 32
            public FieldElement felt252;

            [FieldOffset(0)] // size = 32
            public FieldElement class_hash;

            [FieldOffset(0)] // size = 32
            public FieldElement contract_address;
        }

        [CNode(Kind = "Union")]
        [StructLayout(LayoutKind.Explicit, Size = 32, Pack = 8)]
        public struct Primitive_ANONYMOUS_FIELD1
        {
            [FieldOffset(0)] // size = 1
            public byte u8;

            [FieldOffset(0)] // size = 2
            public ushort u16;

            [FieldOffset(0)] // size = 4
            public uint u32;

            [FieldOffset(0)] // size = 8
            public ulong u64;

            [FieldOffset(0)] // size = 16
            public fixed byte _u128[16]; // uint8_t[16]

            public readonly Span<byte> u128
            {
                get
                {
                    fixed (Primitive_ANONYMOUS_FIELD1* @this = &this)
                    {
                        var pointer = &@this->_u128[0];
                        var span = new Span<byte>(pointer, 16);
                        return span;
                    }
                }
            }

            [FieldOffset(0)] // size = 32
            public fixed byte _u256[32]; // uint64_t[4]

            public readonly Span<ulong> u256
            {
                get
                {
                    fixed (Primitive_ANONYMOUS_FIELD1* @this = &this)
                    {
                        var pointer = &@this->_u256[0];
                        var span = new Span<ulong>(pointer, 4);
                        return span;
                    }
                }
            }

            [FieldOffset(0)] // size = 4
            public uint u_size;

            [FieldOffset(0)] // size = 1
            public CBool p_bool;

            [FieldOffset(0)] // size = 32
            public FieldElement felt252;

            [FieldOffset(0)] // size = 32
            public FieldElement class_hash;

            [FieldOffset(0)] // size = 32
            public FieldElement contract_address;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 1, Pack = 1)]
        public struct Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD0
        {
            [FieldOffset(0)] // size = 1
            public byte u8;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 2, Pack = 2)]
        public struct Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD1
        {
            [FieldOffset(0)] // size = 2
            public ushort u16;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 32, Pack = 1)]
        public struct Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD10
        {
            [FieldOffset(0)] // size = 32
            public FieldElement contract_address;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 4, Pack = 4)]
        public struct Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD2
        {
            [FieldOffset(0)] // size = 4
            public uint u32;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 8, Pack = 8)]
        public struct Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD3
        {
            [FieldOffset(0)] // size = 8
            public ulong u64;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 16, Pack = 1)]
        public struct Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD4
        {
            [FieldOffset(0)] // size = 16
            public fixed byte _u128[16]; // uint8_t[16]

            public readonly Span<byte> u128
            {
                get
                {
                    fixed (Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD4* @this = &this)
                    {
                        var pointer = &@this->_u128[0];
                        var span = new Span<byte>(pointer, 16);
                        return span;
                    }
                }
            }
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 32, Pack = 8)]
        public struct Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD5
        {
            [FieldOffset(0)] // size = 32
            public fixed byte _u256[32]; // uint64_t[4]

            public readonly Span<ulong> u256
            {
                get
                {
                    fixed (Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD5* @this = &this)
                    {
                        var pointer = &@this->_u256[0];
                        var span = new Span<ulong>(pointer, 4);
                        return span;
                    }
                }
            }
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 4, Pack = 4)]
        public struct Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD6
        {
            [FieldOffset(0)] // size = 4
            public uint u_size;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 1, Pack = 1)]
        public struct Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD7
        {
            [FieldOffset(0)] // size = 1
            public CBool p_bool;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 32, Pack = 1)]
        public struct Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD8
        {
            [FieldOffset(0)] // size = 32
            public FieldElement felt252;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 32, Pack = 1)]
        public struct Primitive_ANONYMOUS_FIELD1_ANONYMOUS_FIELD9
        {
            [FieldOffset(0)] // size = 32
            public FieldElement class_hash;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 24, Pack = 8)]
        public struct Struct
        {
            [FieldOffset(0)] // size = 8
            public CString _name;

            public string name
            {
                get
                {
                    return CString.ToString(_name);
                }
                set
                {
                    _name = CString.FromString(value);
                }
            }

            [FieldOffset(8)] // size = 16
            public CArray_Member _children;

            public Span<Member> children
            {
                get
                {
                    fixed (Struct* @this = &this)
                    {
                        var span = new Span<Member>(@this->_children.data, (int)@this->_children.data_len);
                        return span;
                    }
                }

                set
                {
                    _children = new CArray_Member();
                    _children.data_len = (UIntPtr)value.Length;
                    fixed (Member* ptr = &value[0])
                    {
                        _children.data = ptr;
                    }
                }
            }

        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 48, Pack = 8)]
        public struct Ty
        {
            [FieldOffset(0)] // size = 4
            public Ty_Tag tag;

            [FieldOffset(0)] // size = 40
            public Primitive ty_primitive;

            [FieldOffset(0)] // size = 24
            public Struct ty_struct;

            [FieldOffset(0)] // size = 32
            public Enum ty_enum;

            [FieldOffset(0)] // size = 16
            public CArray_Ty _ty_tuple;

            public Span<Ty> ty_tuple
            {
                get
                {
                    fixed (Ty* @this = &this)
                    {
                        var span = new Span<Ty>(@this->_ty_tuple.data, (int)@this->_ty_tuple.data_len);
                        return span;
                    }
                }

                set
                {
                    _ty_tuple = new CArray_Ty();
                    _ty_tuple.data_len = (UIntPtr)value.Length;
                    fixed (Ty* ptr = &value[0])
                    {
                        _ty_tuple.data = ptr;
                    }
                }
            }

        }

        [CNode(Kind = "Union")]
        [StructLayout(LayoutKind.Explicit, Size = 40, Pack = 8)]
        public struct Ty_ANONYMOUS_FIELD1
        {
            [FieldOffset(0)] // size = 40
            public Primitive ty_primitive;

            [FieldOffset(0)] // size = 24
            public Struct ty_struct;

            [FieldOffset(0)] // size = 32
            public Enum ty_enum;

            [FieldOffset(0)] // size = 16
            public CArray_Ty _ty_tuple;

            public Span<Ty> ty_tuple
            {
                get
                {
                    fixed (Ty_ANONYMOUS_FIELD1* @this = &this)
                    {
                        var span = new Span<Ty>(@this->_ty_tuple.data, (int)@this->_ty_tuple.data_len);
                        return span;
                    }
                }

                set
                {
                    _ty_tuple = new CArray_Ty();
                    _ty_tuple.data_len = (UIntPtr)value.Length;
                    fixed (Ty* ptr = &value[0])
                    {
                        _ty_tuple.data = ptr;
                    }
                }
            }

        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 40, Pack = 8)]
        public struct Ty_ANONYMOUS_FIELD1_ANONYMOUS_FIELD0
        {
            [FieldOffset(0)] // size = 40
            public Primitive ty_primitive;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 24, Pack = 8)]
        public struct Ty_ANONYMOUS_FIELD1_ANONYMOUS_FIELD1
        {
            [FieldOffset(0)] // size = 24
            public Struct ty_struct;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 32, Pack = 8)]
        public struct Ty_ANONYMOUS_FIELD1_ANONYMOUS_FIELD2
        {
            [FieldOffset(0)] // size = 32
            public Enum ty_enum;
        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 16, Pack = 8)]
        public struct Ty_ANONYMOUS_FIELD1_ANONYMOUS_FIELD3
        {
            [FieldOffset(0)] // size = 16
            public CArray_Ty _ty_tuple;

            public Span<Ty> ty_tuple
            {
                get
                {
                    fixed (Ty_ANONYMOUS_FIELD1_ANONYMOUS_FIELD3* @this = &this)
                    {
                        var span = new Span<Ty>(@this->_ty_tuple.data, (int)@this->_ty_tuple.data_len);
                        return span;
                    }
                }

                set
                {
                    _ty_tuple = new CArray_Ty();
                    _ty_tuple.data_len = (UIntPtr)value.Length;
                    fixed (Ty* ptr = &value[0])
                    {
                        _ty_tuple.data = ptr;
                    }
                }
            }

        }

        [CNode(Kind = "Struct")]
        [StructLayout(LayoutKind.Explicit, Size = 144, Pack = 8)]
        public struct WorldMetadata
        {
            [FieldOffset(0)] // size = 32
            public FieldElement world_address;

            [FieldOffset(32)] // size = 32
            public FieldElement world_class_hash;

            [FieldOffset(64)] // size = 32
            public FieldElement executor_address;

            [FieldOffset(96)] // size = 32
            public FieldElement executor_class_hash;

            [FieldOffset(128)] // size = 16
            public CArray_CHashItem______c_char__ModelMetadata _models;

            public Span<CHashItem______c_char__ModelMetadata> models
            {
                get
                {
                    fixed (WorldMetadata* @this = &this)
                    {
                        var span = new Span<CHashItem______c_char__ModelMetadata>(@this->_models.data, (int)@this->_models.data_len);
                        return span;
                    }
                }

                set
                {
                    _models = new CArray_CHashItem______c_char__ModelMetadata();
                    _models.data_len = (UIntPtr)value.Length;
                    fixed (CHashItem______c_char__ModelMetadata* ptr = &value[0])
                    {
                        _models.data = ptr;
                    }
                }
            }

        }

        [CNode(Kind = "Enum")]
        public enum Primitive_Tag : int
        {
            U8 = 0,
            U16 = 1,
            U32 = 2,
            U64 = 3,
            U128 = 4,
            U256 = 5,
            USize = 6,
            PBool = 7,
            Felt252 = 8,
            ClassHash = 9,
            ContractAddress = 10
        }

        [CNode(Kind = "Enum")]
        public enum Ty_Tag : int
        {
            TyPrimitive = 0,
            TyStruct = 1,
            TyEnum = 2,
            TyTuple = 3
        }

        [CNode(Kind = "OpaqueType")]
        [StructLayout(LayoutKind.Sequential)]
        public struct ToriiClient
        {
        }

        #endregion
    }

}
