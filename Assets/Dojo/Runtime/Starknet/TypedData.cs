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

        struct ModelMemberTypedData
        {
            public string type;
            public object value;
            public bool key;
        }

        public TypedData(Model model)
        {
            types = new Dictionary<string, object[]>();
            primaryType = "Message";
            // wip
            domain = new Domain("Dojo", "1", "1");
            message = new Dictionary<string, object>
            {
                // model name
                { "model", model.Name }
            };
            // model members
            var members = new Dictionary<string, ModelMemberTypedData>();
            foreach (var member in model.Members)
            {
                members.Add(member.Key, new ModelMemberTypedData
                {
                    type = member.Value.cairoType,
                    value = member.Value.value,
                    key = member.Value.key
                });
            }

            message.Add(model.Name, members);
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