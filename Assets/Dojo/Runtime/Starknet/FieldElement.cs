using System;
using System.Linq;
using System.Numerics;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using dojo_bindings;
using UnityEngine;

namespace Dojo.Starknet
{
    [Serializable]
    public class FieldElement : ISerializationCallbackReceiver
    {
        private dojo.FieldElement inner;
        // Serialized as a hex string.
        [SerializeField] private string hex;

        // These constructors are pretty slow as they involve a lot of copying.
        // TODO: benchmark and optimize
        public FieldElement(string hex)
        {

            // Remove the 0x prefix if it exists.
            if (hex.StartsWith("0x"))
            {
                hex = hex.Substring(2);
            }

            // Check that the hex string is 64 characters or less.
            if (hex.Length > 64)
            {
                throw new ArgumentException("Hex string must be 64 characters or less.", nameof(hex));
            }

            // Pad the hex string with leading zeros until it is 64 characters long.
            if (hex.Length < 64)
            {
                hex = hex.PadLeft(64, '0');
            }

            // NOTE: Use BigInteger to parse instead?
            // Convert the hex string to a byte array.
            byte[] bytes = Enumerable.Range(0, hex.Length)
                .Where(x => x % 2 == 0)
                .Select(x => Convert.ToByte(hex.Substring(x, 2), 16))
                .ToArray();

            unsafe
            {
                fixed (byte* ptr = &inner._data[0])
                {
                    Marshal.Copy(bytes, 0, (IntPtr)ptr, bytes.Length);
                }
            }
        }

        public FieldElement(dojo.FieldElement fieldElement)
        {
            // We don't want to refer to the same memory as the original field element.
            // As we might want to free it - potentially slower
            // TODO: benchmark copies?
            fieldElement.data.CopyTo(inner.data);
        }

        public FieldElement(Span<byte> bytes)
        {
            if (bytes.Length != 32)
            {
                throw new ArgumentException("Byte array must be 32 bytes.", nameof(bytes));
            }

            bytes.CopyTo(inner.data);
        }

        // This handles BigIntegers as well as primitive types
        public FieldElement(BigInteger bigInteger)
        {
            var bytes = bigInteger.ToByteArray();

            if (bytes.Length > 32)
            {
                throw new ArgumentException("BigInteger must be 32 bytes or less.", nameof(bigInteger));
            }

            unsafe
            {
                fixed (byte* ptr = &inner._data[0])
                {
                    // we need to account bytes that are less than 32 bytes
                    // and add leading zeros
                    var offset = 32 - bytes.Length;
                    Marshal.Copy(bytes, 0, (IntPtr)ptr + offset, bytes.Length);
                }
            }
        }

        // This convert the enum to a uint64 and uses the BigInteger constructor
        public FieldElement(Enum @enum) : this(Convert.ToUInt64(@enum))
        {
        }

        public string Hex()
        {
            return "0x" + BitConverter.ToString(inner.data.ToArray()).Replace("-", "").ToLower();
        }

        public dojo.FieldElement Inner()
        {
            return inner;
        }

        public void OnAfterDeserialize()
        {
            inner = new FieldElement(hex).inner;
        }

        public void OnBeforeSerialize()
        {
            hex = Hex();
        }
    }
}