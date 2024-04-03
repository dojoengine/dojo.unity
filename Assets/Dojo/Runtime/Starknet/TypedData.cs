using System.Collections.Generic;
using bottlenoselabs.C2CS.Runtime;
using Dojo.Torii;
using dojo_bindings;
using log4net.Config;
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
            types = new Dictionary<string, object[]>() {
            { "StarknetDomain", new object[] {
                new TypedDataType("name", "shortstring"),
                new TypedDataType("version", "shortstring"),
                new TypedDataType("chainId", "shortstring"),
                new TypedDataType("revision", "shortstring")
             } },
            };

            // main type
            types.Add("OffchainMessage", new object[] {
                new TypedDataType("model", "shortstring"),
                new TypedDataType(model.Name, "Model")
            });

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
                members.Add(member.Key, member.Value.value);
            }

            message.Add(model.Name, members);
        }

        object[] getMembersTypes(ref Dictionary<string, object[]> types, Dictionary<string, Member> members)
        {
            var result = new List<object>();

            foreach (var member in members)
            {
                string type = member.Value.cairoType;

                switch (type)
                {
                    case "struct":
                        var structMembers = getMembersTypes(ref types, member.Value.value as Dictionary<string, Member>);
                        types.Add(member.Key, structMembers);
                        type = member.Key;
                        break;
                    case "array":
                        throw new System.Exception("Array type not supported");
                    case "enum":
                        type = "u8";
                        break;
                    case "felt252":
                        type = "felt";
                        break;
                    case "class_hash":
                        type = "ClassHash";
                        break;
                    case "contract_address":
                        type = "ContractAddress";
                        break;
                }

                result.Add(new TypedDataType(member.Key, type));
            }

            return result.ToArray();
        }

        public FieldElement encode(FieldElement address)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
// TODO
#else
            var result = dojo.typed_data_encode(new CString(JsonConvert.SerializeObject(this)), address.Inner);
            if (result.tag == dojo.ResultFieldElement_Tag.ErrFieldElement)
            {
                throw new System.Exception(result.err.message);
            }

            return new FieldElement(result.ok);
#endif
        }
    }
}