using System;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{
    // Wraps a FieldElement and provides helper methods for verifying signatures.
    public class VerifyingKey
    {
        private dojo.FieldElement inner;
        
        public VerifyingKey(string publicKey)
        {
            var result = dojo.felt_from_hex_be(CString.FromString(publicKey));
            if (result.tag == dojo.ResultFieldElement_Tag.ErrFieldElement)
            {
                throw new Exception(result.err.message);
            }
            
            inner = result.ok;
        }
        
        public VerifyingKey(dojo.FieldElement publicKey)
        {
            inner = publicKey;
        }
        
        // Return the inner FieldElement.
        public dojo.FieldElement PublicKey()
        {
            return inner;
        }
        
        public bool Verify(dojo.FieldElement message, dojo.Signature signature)
        {
            var result = dojo.verifying_key_verify(inner, message, signature);
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }
            
            return result.ok;
        }
    }
}