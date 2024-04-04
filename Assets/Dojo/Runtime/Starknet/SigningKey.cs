using System;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;
using JetBrains.Annotations;

namespace Dojo.Starknet
{
    public class SigningKey
    {
        // The inner FieldElement for the private key.
        public FieldElement Inner
        {
            get;
        }
        // Return the public key corresponding to the private key.
        public VerifyingKey PublicKey
        {
            get
            {
#if UNITY_WEBGL && !UNITY_EDITOR
                return new VerifyingKey(StarknetInterop.NewVerifyingKey(new CString(Inner.Hex())));
#else
                return new VerifyingKey(dojo.verifying_key_new(Inner.Inner));
#endif
            }
        }

        public SigningKey()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            Inner = new FieldElement(StarknetInterop.NewSigningKey());
#else
            Inner = new FieldElement(dojo.signing_key_new());
#endif
        }

        public SigningKey(string privateKey)
        {
            Inner = new FieldElement(privateKey);
        }

        public SigningKey(dojo.FieldElement privateKey)
        {
            Inner = new FieldElement(privateKey);
        }

        public SigningKey(FieldElement privateKey)
        {
            Inner = privateKey;
        }

        // Sign a message.
#if UNITY_WEBGL && !UNITY_EDITOR
        // webgl js interop starknet bindings
        public Signature Sign(FieldElement message)
        {
            var signature = StarknetInterop.Sign(new CString(Inner.Hex()), new CString(message.Hex()));
            return new Signature(signature);
        }
#else
        public Signature Sign(FieldElement message)
        {
            var result = dojo.signing_key_sign(Inner.Inner, message.Inner);
            if (result.tag == dojo.ResultSignature_Tag.ErrSignature)
            {
                throw new Exception(result.err.message);
            }

            return new Signature(result.ok);
        }
#endif
    }
}