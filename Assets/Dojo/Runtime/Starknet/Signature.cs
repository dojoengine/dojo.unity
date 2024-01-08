using dojo_bindings;

namespace Dojo.Starknet {
    public class Signature {
        private dojo.Signature inner;

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

        public bool Verify(FieldElement verifying_key, FieldElement hash) {
            var result = dojo.verifying_key_verify(verifying_key.Inner(), hash.Inner(), inner);
            if (result.tag == dojo.Resultbool_Tag.Errbool) {
                throw new System.Exception(result.err.message);
            }

            return result.ok;
        }

        public bool Verify(VerifyingKey verifying_key, FieldElement hash) {
            return Verify(verifying_key.PublicKey(), hash);
        }
    }
}