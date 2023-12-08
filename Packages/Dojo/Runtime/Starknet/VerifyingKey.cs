using System;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{
    public class VerifyingKey
    {
        private dojo.FieldElement inner;
        
        public VerifyingKey(string publicKey)
        {
            var result = dojo.felt_from_hex_be(CString.FromString(publicKey));
            if (result.tag == dojo.Result_FieldElement_Tag.Err_FieldElement)
            {
                throw new Exception(result.err.message);
            }
            
            inner = result.ok;
        }
        
        public VerifyingKey(dojo.FieldElement publicKey)
        {
            inner = publicKey;
        }
        
        public dojo.FieldElement PublicKey()
        {
            return inner;
        }
        
        public bool Verify(dojo.FieldElement message, dojo.Signature signature)
        {
            var result = dojo.verifying_key_verify(inner, message, signature);
            if (result.tag == dojo.Result_bool_Tag.Err_bool)
            {
                throw new Exception(result.err.message);
            }
            
            return result.ok;
        }
    }
}