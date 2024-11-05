using dojo_bindings;
using bottlenoselabs.C2CS.Runtime;

namespace Dojo.Starknet
{
    public class Signature
    {
        public dojo.Signature Inner { get; }

        // Create a signature from a compact hex string.
        public Signature(string compactHex)
        {
            if (compactHex.Length != 128)
            {
                throw new System.ArgumentException("Compact hex string must be 128 characters.", nameof(compactHex));
            }

            var r = new FieldElement("0x" + compactHex.Substring(0, 64));
            var s = new FieldElement("0x" + compactHex.Substring(64, 64));

            Inner = new dojo.Signature
            {
                r = r.Inner,
                s = s.Inner
            };
        }

        public Signature(FieldElement r, FieldElement s)
        {
            Inner = new dojo.Signature
            {
                r = r.Inner,
                s = s.Inner
            };
        }

        public Signature(dojo.Signature signature)
        {
            Inner = signature;
        }

        public FieldElement R()
        {
            return new FieldElement(Inner.r);
        }

        public FieldElement S()
        {
            return new FieldElement(Inner.s);
        }

#if UNITY_WEBGL && !UNITY_EDITOR
        // webgl js interop starknet bindings
        public bool Verify(FieldElement verifying_key, FieldElement hash) {
            return StarknetInterop.Verify(new CString(verifying_key.Hex()), new CString(hash.Hex()), new CString(R().Hex()), new CString(S().Hex()));
        }
#else
        // dojo.c starknet-rs bindings
        public bool Verify(FieldElement verifying_key, FieldElement hash)
        {
            var result = dojo.verifying_key_verify(verifying_key.Inner, hash.Inner, Inner);
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new System.Exception(result.err.message);
            }

            return result.ok;
        }
#endif

        public bool Verify(VerifyingKey verifying_key, FieldElement hash)
        {
            return Verify(verifying_key.Inner, hash);
        }

        // Return the signature as a compact hex string. 
        public string ToCompactHex()
        {
            return (R().Hex() + S().Hex()).Replace("0x", "");
        }

        // Return the felts of the signature.
        public FieldElement[] ToFeltArray()
        {
            return new FieldElement[] { R(), S() };
        }
    }
}