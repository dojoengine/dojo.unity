using System;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{
    // Wraps a FieldElement and provides helper methods for verifying signatures.
    public class VerifyingKey
    {
        private FieldElement inner;
        
        public VerifyingKey(string publicKey)
        {
            inner = new FieldElement(publicKey);
        }

        public VerifyingKey(dojo.FieldElement publicKey)
        {
            inner = new FieldElement(publicKey);
        }
        
        public VerifyingKey(FieldElement publicKey)
        {
            inner = publicKey;
        }
        
        // Return the inner FieldElement.
        public FieldElement PublicKey()
        {
            return inner;
        }
        
        public bool Verify(FieldElement message, dojo.Signature signature)
        {
            var result = dojo.verifying_key_verify(inner.Inner(), message.Inner(), signature);
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }
            
            return result.ok;
        }
    }
}