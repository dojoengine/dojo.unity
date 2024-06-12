using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Reflection;
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

        object mapMember(object member)
        {
            return member switch
            {
                Model.Enum enum_ => new Dictionary<string, object>
                {
                    { enum_.option, mapMember(enum_.value) }
                },
                Model.Struct struct_ => struct_.members.Select(child => new KeyValuePair<string, object>(child.Key, mapMember(child.Value))).ToDictionary(k => k.Key, v => v.Value),
                object[] tuple => tuple.Select(mapMember).ToArray(),
                List<object> array => array.Select(mapMember).ToList(),
                _ => member
            };
        }

        TypedDataType[] getMembersTypes(ref Dictionary<string, TypedDataType[]> types, Dictionary<string, object> members)
        {
            var result = new List<TypedDataType>();

            foreach (var member in members)
            {
                switch (member.Value)
                {
                    case string _:
                        result.Add(new TypedDataType(member.Key, "string"));
                        break;
                    case FieldElement _:
                        result.Add(new TypedDataType(member.Key, "felt"));
                        break;
                    case byte:
                        result.Add(new TypedDataType(member.Key, "u8"));
                        break;
                    case ushort:
                        result.Add(new TypedDataType(member.Key, "u16"));
                        break;
                    case uint:
                        result.Add(new TypedDataType(member.Key, "u32"));
                        break;
                    case ulong:
                        result.Add(new TypedDataType(member.Key, "u64"));
                        break;
                    case BigInteger:
                        result.Add(new TypedDataType(member.Key, "u128"));
                        break;
                    case bool:
                        result.Add(new TypedDataType(member.Key, "bool"));
                        break;
                    // Enum
                    // (variantName, variantValue)
                    case Model.Enum enum_:
                        var enumMembers = getMembersTypes(ref types, new Dictionary<string, object>
                        {
                            // for now we only include our selected option
                            // and its value
                            { enum_.option, enum_.value },
                            // TOOD: maybe include all other enum options
                            // and their types?
                        });
                        types.TryAdd(enum_.name, enumMembers);
                        result.Add(new TypedDataType(member.Key, "enum", enum_.name));
                        break;
                    case Model.Struct struct_:
                        var structMembers = getMembersTypes(ref types, struct_.members);
                        // add the struct members to the types. it might already be added from 
                        // other members
                        types.TryAdd(struct_.name, structMembers);
                        result.Add(new TypedDataType(member.Key, struct_.name));
                        break;
                    // tuples are arrays
                    case object[] tuple:
                        var tupleMembers = tuple.Select((v, i) => new KeyValuePair<string, object>(i.ToString(), v)).ToDictionary(k => k.Key, v => v.Value);
                        var tupleMembersTypes = getMembersTypes(ref types, tupleMembers);
                        var formattedTupleName = $"({string.Join(",", tupleMembersTypes.Select(t => t.type))})";

                        result.Add(new TypedDataType(member.Key, formattedTupleName));
                        break;
                    // should be encoded as TypeObject* for arrays
                    case List<object> array:
                        TypedDataType inner = getMembersTypes(ref types, new Dictionary<string, object>
                        {
                            { "inner", array[0] }
                        }).First();

                        result.Add(new TypedDataType(member.Key, $"{inner.type}*"));
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

        static object mapModelInstanceMember(object member) {
            var type = member.GetType();

            // enums
            if (member is Enum) {
                object value;
                if (type.GetProperty("value") is PropertyInfo prop) {
                    value = prop.GetValue(member);
                } else {
                    value = ValueTuple.Create();
                }

                // format name to include generic types, like Option<u32>
                var name = type.BaseType.Name.Split('`')[0];
                if (type.GenericTypeArguments.Length > 0) {
                    name += "<" + string.Join(",", type.GenericTypeArguments.Select(t => t.Name)) + ">";
                }

                return new Model.Enum(name, type.Name, mapModelInstanceMember(value));
            // tuple -> array
            } else if (type.FullName.StartsWith(typeof(ValueTuple).FullName)) {
                // get all fields of the tuple
                // and cast them to object[] array
                var fields = type.GetFields();
                var values = new object[fields.Length];
                for (var i = 0; i < fields.Length; i++) {
                    values[i] = mapModelInstanceMember(fields[i].GetValue(member));
                }

                return values;
            }
            // array -> List
            else if (type.IsArray) {
                var array = (Array)member;
                var list = new List<object>();
                for (var i = 0; i < array.Length; i++) {
                    list.Add(mapModelInstanceMember(array.GetValue(i)));
                }

                return list;
            }
            // struct
            else if (type.IsValueType && !type.IsPrimitive && !type.IsEnum) {
                var fields = type.GetFields();
                var dict = new Dictionary<string, object>();
                foreach (var field in fields) {
                    dict.Add(field.Name, mapModelInstanceMember(field.GetValue(member)));
                }

                return new Model.Struct(type.Name, dict);
            }

            return member;
        }

        public static TypedData From<T>(T model) where T : ModelInstance
        {
            var fields = model.GetType().GetFields();
            var members = new Dictionary<string, object>();

            // map all fields of the model instance
            foreach (var field in fields) {
                // Check if the field has the ModelField attribute
                var attribute = field.GetCustomAttributes(typeof(ModelField), false);
                if (attribute.Length == 0)
                {
                    continue;
                }

                var modelField = (ModelField)attribute[0];
                members.Add(modelField.Name, mapModelInstanceMember(field.GetValue(model)));
            }

            return new TypedData(new Model(model.GetType().Name, members));
        }
    }
}