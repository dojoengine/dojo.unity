using System;
using System.Linq;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{
    unsafe public class ByteArray
    {
        public string Inner { get; }

        public ByteArray(string inner)
        {
            Inner = inner;
        }

        public ByteArray(FieldElement[] felts)
        {
            Inner = Deserialize(felts);
        }

        public FieldElement[] Serialize()
        {
            return Serialize(Inner);
        }

        public static string Deserialize(FieldElement[] felts)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            return StarknetInterop.DeserializeByteArray(felts);
#else
            dojo.FieldElement[] inners = felts.Select(felt => felt.Inner).ToArray();
            fixed (dojo.FieldElement* ptr = inners)
            {
                var res = dojo.bytearray_deserialize(ptr, (UIntPtr)inners.Length);
                if (res.tag == dojo.Resultc_char_Tag.Errc_char)
                {
                    throw new Exception(res.err.message);
                }

                return res.ok;
            }
#endif
        }

        public static FieldElement[] Serialize(string str)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
                return StarknetInterop.SerializeByteArray(str);
#else
            var res = dojo.bytearray_serialize(new CString(str));
            if (res.tag == dojo.ResultCArrayFieldElement_Tag.ErrCArrayFieldElement)
            {
                throw new Exception(res.err.message);
            }

            return res.ok.ToArray().Select(felt => new FieldElement(felt)).ToArray();
#endif
        }

        public static implicit operator string(ByteArray inner)
        {
            return inner.Inner;
        }

        public static implicit operator ByteArray(string inner)
        {
            return new ByteArray(inner);
        }

        public override string ToString()
        {
            return Inner;
        }
    }
}