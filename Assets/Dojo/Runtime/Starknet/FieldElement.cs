using System;
using System.Linq;
using System.Runtime.InteropServices;
using dojo_bindings;

namespace Dojo.Starknet
{
    public class FieldElement
    {
        private dojo.FieldElement inner;

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
            inner = fieldElement;
        }

        public FieldElement(byte[] bytes)
        {
            if (bytes.Length != 32)
            {
                throw new ArgumentException("Byte array must be 32 bytes.", nameof(bytes));
            }

            unsafe
            {
                fixed (byte* ptr = &inner._data[0])
                {
                    Marshal.Copy(bytes, 0, (IntPtr)ptr, bytes.Length);
                }
            }
        }

        public string Hex()
        {
            unsafe
            {
                byte[] bytes = new byte[32];
                fixed (byte* ptr = &inner._data[0])
                {
                    Marshal.Copy((IntPtr)ptr, bytes, 0, bytes.Length);
                }
                return "0x" + BitConverter.ToString(bytes).Replace("-", "").ToLower();
            }
        }

        public dojo.FieldElement Inner()
        {
            return inner;
        }
    }
}