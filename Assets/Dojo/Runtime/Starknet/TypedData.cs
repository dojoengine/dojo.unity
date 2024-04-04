using System;
using System.Collections.Generic;
using System.Numerics;
using bottlenoselabs.C2CS.Runtime;
using Dojo.Torii;
using dojo_bindings;
using Newtonsoft.Json;

namespace Dojo.Starknet
{
    public class Domain
    {
        public string name;
        public string version;
        public string chainId;
        public string revision = "1";

        public Domain(string name, string version, string chainId)
        {
            this.name = name;
            this.version = version;
            this.chainId = chainId;
        }
    }

    public class TypedData
    {
        public Dictionary<string, object[]> types;
        public string primaryType;
        public Domain domain;
        public Dictionary<string, object> message;

        public TypedData(Dictionary<string, object[]> types, string primaryType, Domain domain, Dictionary<string, object> message)
        {
            this.types = types;
            this.primaryType = primaryType;
            this.domain = domain;
            this.message = message;
        }

        struct TypedDataType
        {
            public string name;
            public string type;

            public TypedDataType(string name, string type)
            {
                this.name = name;
                this.type = type;
            }
        }

        public TypedData(Model model)
        {
            types = new Dictionary<string, object[]>
            {
                // starknet domain type
                {
                    "StarknetDomain",
                    new object[] {
                        new TypedDataType("name", "shortstring"),
                        new TypedDataType("version", "shortstring"),
                        new TypedDataType("chainId", "shortstring"),
                        new TypedDataType("revision", "shortstring")
                    }
                },
                // primary type
                {
                    "OffchainMessage",
                    new object[] {
                        // model name
                        new TypedDataType("model", "shortstring"),
                        // model type
                        new TypedDataType(model.Name, "Model")
                    }
                }
            };

            // model members types
            types.Add("Model", getMembersTypes(ref types, model.Members));

            primaryType = "OffchainMessage";

            // wip
            domain = new Domain("Dojo", "1", "1");
            message = new Dictionary<string, object>
            {
                // model name
                { "model", model.Name }
            };
            // model members
            var members = new Dictionary<string, object>();
            foreach (var member in model.Members)
            {
                members.Add(member.Key, member.Value);
            }

            message.Add(model.Name, members);
        }

        object[] getMembersTypes(ref Dictionary<string, object[]> types, Dictionary<string, object> members)
        {
            var result = new List<object>();

            foreach (var member in members)
            {
                switch (member.Value)
                {
                    case byte _:
                        result.Add(new TypedDataType(member.Key, "u8"));
                        break;
                    case bool _:
                        result.Add(new TypedDataType(member.Key, "bool"));
                        break;
                    case ushort _:
                        result.Add(new TypedDataType(member.Key, "u16"));
                        break;
                    case uint _:
                        result.Add(new TypedDataType(member.Key, "u32"));
                        break;
                    case ulong _:
                        result.Add(new TypedDataType(member.Key, "u64"));
                        break;
                    case BigInteger _:
                        result.Add(new TypedDataType(member.Key, "u128"));
                        break;
                    case FieldElement _:
                        result.Add(new TypedDataType(member.Key, "felt"));
                        break;
                    case Enum _:
                        result.Add(new TypedDataType(member.Key, "u8"));
                        break;
                    case Dictionary<string, object> struct_:
                        var structMembers = getMembersTypes(ref types, struct_);
                        types.Add(member.Key, structMembers);
                        result.Add(new TypedDataType(member.Key, member.Key));
                        break;
                    default:
                        throw new System.Exception($"Unknown type {member.Value.GetType()}");
                }

            }

            return result.ToArray();
        }

        public FieldElement encode(FieldElement address)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            return new FieldElement(ToriiWasmInterop.EncodeTypedData(new CString(JsonConvert.SerializeObject(this)), new CString(address.Hex())));
#else
            var result = dojo.typed_data_encode(new CString(JsonConvert.SerializeObject(this)), address.Inner);
            if (result.tag == dojo.ResultFieldElement_Tag.ErrFieldElement)
            {
                throw new System.Exception(result.err.message);
            }

            return new FieldElement(result.ok);
#endif
        }

        public static TypedData From<T>(T model) where T : ModelInstance
        {
            return new TypedData(model.ToModel());
        } 
    }
}