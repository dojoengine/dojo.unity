using System;
using System.Globalization;
using System.Linq;
using System.Numerics;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using dojo_bindings;
using Newtonsoft.Json;
using UnityEngine;

namespace Dojo.Starknet
{
    class FieldElementConverter : JsonConverter {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(FieldElement);
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var fieldElement = (FieldElement)value;
            writer.WriteValue(fieldElement.Hex());
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var hex = (string)reader.Value;
            return new FieldElement(hex);
        }
    }
    [Serializable]
    [JsonConverter(typeof(FieldElementConverter))]
    public class FieldElement : ISerializationCallbackReceiver
    {
        private dojo.FieldElement inner;
        public dojo.FieldElement Inner => inner;
        // Serialized as a hex string.
        [SerializeField] private string hex;

        public static BigInteger StarkField = BigInteger.Parse("3618502788666131213697322783095070105623107215331596699973092056135872020481");

        // These constructors are pretty slow as they involve a lot of copying.
        // TODO: benchmark and optimize
        public FieldElement(string input)
        {
            BigInteger value;

            if (input.StartsWith("0x"))
            {
                if (!BigInteger.TryParse("0" + input.Substring(2), NumberStyles.HexNumber, null, out value))
                {
                    throw new ArgumentException("Invalid hex string.", nameof(input));
                }
            }
            else
            {
                if (!BigInteger.TryParse(input, out value))
                {
                    throw new ArgumentException("Invalid decimal string.", nameof(input));
                }
            }

            inner = new FieldElement(value).inner;
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
            if (bigInteger.Sign < 0) {
                bigInteger = StarkField - bigInteger;
            }

            var bytes = bigInteger.ToByteArray(false, true);
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