using System;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{
    public class SigningKey
    {
        private dojo.FieldElement inner;
        
        public SigningKey(string privateKey)
        {
            var result = dojo.felt_from_hex_be(CString.FromString(privateKey));
            if (result.tag == dojo.Result_FieldElement_Tag.Err_FieldElement)
            {
                throw new Exception(result.err.message);
            }
            
            inner = result.ok;
        }
        
        public SigningKey(dojo.FieldElement privateKey)
        {
            inner = privateKey;
        }
        
        public dojo.FieldElement PrivateKey()
        {
            return inner;
        }
        
        public VerifyingKey PublicKey()
        {
            dojo.FieldElement publicKey = dojo.verifying_key_new(inner);
                
            return new VerifyingKey(publicKey);
        }
        
        public dojo.Signature Sign(dojo.FieldElement message)
        {
            var result = dojo.signing_key_sign(inner, message);
            if (result.tag == dojo.Result_Signature_Tag.Err_Signature)
            {
                throw new Exception(result.err.message);
            }
                
            return result.ok;
        }
    }
}