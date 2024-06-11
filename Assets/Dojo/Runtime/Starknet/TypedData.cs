using System;
using System.Collections.Generic;
using System.Linq;
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
        public Dictionary<string, TypedDataType[]> types;
        public string primaryType;
        public Domain domain;
        public Dictionary<string, object> message;

        public TypedData(Dictionary<string, TypedDataType[]> types, string primaryType, Domain domain, Dictionary<string, object> message)
        {
            this.types = types;
            this.primaryType = primaryType;
            this.domain = domain;
            this.message = message;
        }

        public struct TypedDataType
        {
            public string name;
            public string type;
            [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
            public string contains;

            public TypedDataType(string name, string type, string contains = null)
            {
                this.name = name;
                this.type = type;
                this.contains = contains;
            }
        }

        public TypedData(Model model)
        {
            types = new Dictionary<string, TypedDataType[]>
            {
                // starknet domain type
                {
                    "StarknetDomain",
                    new TypedDataType[] {
                        new TypedDataType("name", "shortstring"),
                        new TypedDataType("version", "shortstring"),
                        new TypedDataType("chainId", "shortstring"),
                        new TypedDataType("revision", "shortstring")
                    }
                },
                // primary type
                {
                    "OffchainMessage",
                    new TypedDataType[] {
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
                members.Add(member.Key, mapMember(member.Value));
            }

            message.Add(model.Name, members);
        }

        object mapMember(Model.Ty member)
        {
            return member.value switch
            {
                Model.Enum enum_ => new Dictionary<string, object>
                {
                    { enum_.option, mapMember(enum_.value) }
                },
                Dictionary<string, Model.Ty> struct_ => struct_.Select(child => new KeyValuePair<string, object>(child.Key, mapMember(child.Value))).ToDictionary(k => k.Key, v => v.Value),
                Model.Ty[] tuple => tuple.Select(mapMember).ToArray(),
                List<Model.Ty> array => array.Select(mapMember).ToList(),
                _ => member.value
            };
        }

        TypedDataType[] getMembersTypes(ref Dictionary<string, TypedDataType[]> types, Dictionary<string, Model.Ty> members)
        {
            var result = new List<TypedDataType>();

            foreach (var member in members)
            {
                switch (member.Value.value)
                {
                    case string _:
                        result.Add(new TypedDataType(member.Key, "string"));
                        break;
                    case FieldElement _:
                        var type_name = member.Value.name switch
                        {
                            "felt252" => "felt",
                            "contract_address" => "ContractAddress",
                            "class_hash" => "ClassHash",
                            _ => member.Value.name
                        };
                        result.Add(new TypedDataType(member.Key, type_name));
                        break;
                    // Enum
                    // (variantName, variantValue)
                    case Model.Enum enum_:
                        var enumMembers = getMembersTypes(ref types, new Dictionary<string, Model.Ty>
                        {
                            // for now we only include our selected option
                            // and its value
                            { enum_.option, enum_.value },
                            // TOOD: maybe include all other enum options
                            // and their types?
                        });
                        types.TryAdd(member.Value.name, enumMembers);
                        result.Add(new TypedDataType(member.Key, "enum", member.Value.name));
                        break;
                    case Dictionary<string, Model.Ty> struct_:
                        var structMembers = getMembersTypes(ref types, struct_);
                        // add the struct members to the types. it might already be added from 
                        // other members
                        types.TryAdd(member.Value.name, structMembers);
                        result.Add(new TypedDataType(member.Key, member.Value.name));
                        break;
                    // tuples are arrays
                    case Model.Ty[] tuple:
                        var tupleMembers = tuple.Select((v, i) => new KeyValuePair<string, Model.Ty>(i.ToString(), v)).ToDictionary(k => k.Key, v => v.Value);
                        var tupleMembersTypes = getMembersTypes(ref types, tupleMembers);
                        var formattedTupleName = $"({string.Join(",", tupleMembersTypes.Select(t => t.type))})";

                        types.Add(formattedTupleName, tupleMembersTypes);
                        result.Add(new TypedDataType(member.Key, formattedTupleName));
                        break;
                    // should be encoded as TypeObject* for arrays
                    case List<Model.Ty> array:
                        var inner = getMembersTypes(ref types, new Dictionary<string, Model.Ty>
                        {
                            { "inner", array[0] }
                        }).First();

                        result.Add(new TypedDataType(member.Key, member.Value.name));
                        break;
                    default:
                        result.Add(new TypedDataType(member.Key, member.Value.name));
                        break;
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
            return new TypedData(model.Model);
        }
    }
}