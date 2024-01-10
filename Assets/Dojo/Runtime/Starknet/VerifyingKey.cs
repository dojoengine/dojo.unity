using System;
using System.Collections.Generic;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;
using Newtonsoft.Json;

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
        
        #if UNITY_WEBGL && !UNITY_EDITOR
        // webgl js interop starknet bindings
        public bool Verify(FieldElement message, Signature signature)
        {
            return StarknetInterop.Verify(new CString(signature.R().Hex()), new CString(signature.S().Hex()), new CString(message.Hex()), new CString(inner.Hex()));
        }
        #else
        // dojo.c starknet-rs bindings
        public bool Verify(FieldElement message, Signature signature)
        {
            var result = dojo.verifying_key_verify(inner.Inner(), message.Inner(), signature.Inner());
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }
            
            return result.ok;
        }
        #endif
    }
}