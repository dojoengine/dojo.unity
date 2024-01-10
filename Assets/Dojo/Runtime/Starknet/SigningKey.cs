using System;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;
using JetBrains.Annotations;

namespace Dojo.Starknet
{
    public class SigningKey
    {
        // The inner FieldElement for the private key.
        public FieldElement PrivateKey { get; }
        // Return the public key corresponding to the private key.
        private VerifyingKey PublicKey
        {
            get
            {
                if (PublicKey == null)
                {
                    PublicKey = new VerifyingKey(dojo.verifying_key_new(PrivateKey.Inner()));
                }

                return PublicKey;

            }

            set => PublicKey = value;
        }

        public SigningKey(string privateKey)
        {
            PrivateKey = new FieldElement(privateKey);
        }

        public SigningKey(dojo.FieldElement privateKey)
        {
            PrivateKey = new FieldElement(privateKey);
        }

        public SigningKey(FieldElement privateKey)
        {
            PrivateKey = privateKey;
        }

        // Sign a message.
        #if UNITY_WEBGL && !UNITY_EDITOR
        // webgl js interop starknet bindings
        public Signature Sign(FieldElement message)
        {
            var signature = StarknetInterop.Sign(new CString(PrivateKey.Hex()), new CString(message.Hex()));
            return new Signature(signature);
        }
        #else
        public Signature Sign(FieldElement message)
        {
            var result = dojo.signing_key_sign(PrivateKey.Inner(), message.Inner());
            if (result.tag == dojo.ResultSignature_Tag.ErrSignature)
            {
                throw new Exception(result.err.message);
            }

            return new Signature(result.ok);
        }
        #endif
    }
}