using dojo_bindings;

namespace Dojo.Starknet {
    public class Signature {
        private dojo.Signature inner;

        // Create a signature from a compact hex string.
        public Signature(string compactHex) {
            if (compactHex.Length != 128) {
                throw new System.ArgumentException("Compact hex string must be 128 characters.", nameof(compactHex));
            }

            var r = new FieldElement("0x" + compactHex.Substring(0, 64));
            var s = new FieldElement("0x" + compactHex.Substring(64, 64));

            inner = new dojo.Signature{
                r = r.Inner(),
                s = s.Inner()
            };
        }

        public Signature(FieldElement r, FieldElement s) {
            inner = new dojo.Signature{
                r = r.Inner(),
                s = s.Inner()
            };
        }

        public Signature(dojo.Signature signature) {
            inner = signature;
        }

        public dojo.Signature Inner() {
            return inner;
        }

        public FieldElement R() {
            return new FieldElement(inner.r);
        }

        public FieldElement S() {
            return new FieldElement(inner.s);
        }

        #if UNITY_WEBGL && !UNITY_EDITOR
        // webgl js interop starknet bindings
        public bool Verify(FieldElement message, VerifyingKey verifying_key) {
            return StarknetInterop.Verify(new CString(R().Hex()), new CString(S().Hex()), new CString(message.Hex()), new CString(verifying_key.PublicKey().Hex()));
        }
        #else
        // dojo.c starknet-rs bindings
        public bool Verify(FieldElement verifying_key, FieldElement hash) {
            var result = dojo.verifying_key_verify(verifying_key.Inner(), hash.Inner(), inner);
            if (result.tag == dojo.Resultbool_Tag.Errbool) {
                throw new System.Exception(result.err.message);
            }

            return result.ok;
        }
        #endif

        public bool Verify(VerifyingKey verifying_key, FieldElement hash) {
            return Verify(verifying_key.PublicKey(), hash);
        }

        // Return the signature as a compact hex string. 
        public string ToCompactHex() {
            return (R().Hex() + S().Hex()).Replace("0x", "");
        }
    }
}