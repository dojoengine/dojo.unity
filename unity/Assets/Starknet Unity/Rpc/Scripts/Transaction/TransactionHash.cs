using System.Numerics;
using System.Globalization;
using System.Linq;
using System.Collections.Generic;
using StarkSharp.StarkCurve.Signature;
using Org.BouncyCastle.Utilities.Encoders;
using UnityEngine;
using Constants;

public class TransactionHash : MonoBehaviour
{
    public class Call
    {
        public string To { get; set; } // contract address
        public string Selector { get; set; }
        public string[] Data { get; set; }
    }
    public static class Hash
    {

        public static string[] FormatCalldataOther(Call[] callArray)
        {
            List<string> calldata = new List<string>();
            BigInteger callArrayLength = new(callArray.Length);
            calldata.Add("0x" + callArrayLength.ToString("x"));

            foreach (Call call in callArray)
            {
                calldata.Add(call.To);
                calldata.Add(call.Selector);

                BigInteger dataLength = new(call.Data.Length);
                calldata.Add("0x" + dataLength.ToString("x"));

                foreach (string data in call.Data)
                {
                    calldata.Add(data);
                }
            }

            return calldata.ToArray();
        }

        public static string[] FormatCalldataCairo0(Call[] callArray)
        {
            List<string> calldata = new List<string>();
            List<string> calls = new List<string>();
            BigInteger callArrayLength = new(callArray.Length);
            calldata.Add("0x" + callArrayLength.ToString("x"));

            int offset = 0;
            foreach (Call call in callArray)
            {
                calldata.Add(call.To);
                calldata.Add(call.Selector);

                string dataOffset = offset.ToString("x");
                calldata.Add("0x" + dataOffset);

                BigInteger dataLength = new(call.Data.Length);
                calldata.Add("0x" + dataLength.ToString("x"));

                offset += call.Data.Length;

                foreach (string data in call.Data)
                {
                    calls.Add(data);
                }
            }
            calldata.Add("0x" + offset.ToString("x"));

            calldata.AddRange(calls);

            return calldata.ToArray();
        }

        public static string[] FormatCalldata(Call[] callArray, int cairoVersion)
        {
            if (cairoVersion == 0)
            {
                return FormatCalldataCairo0(callArray);
            }
            else
            {
                return FormatCalldataOther(callArray);
            }
        }

        public static string ComputeCalldataHash(Call[] callArray, int cairoVersion)
        {
            if (cairoVersion == 0)
            {
                return ComputeCalldataHashCairo0(callArray);
            }
            else
            {
                return ComputeCalldataHashOther(callArray);
            }
        }

        public static string ComputeCalldataHashOther(Call[] callArray)
        {
            string[] formattedCallArray = FormatCalldataOther(callArray);
            List<BigInteger> bigCalls = new List<BigInteger>();

            foreach (string call in formattedCallArray)
            {
                bigCalls.Add(HexToBigInteger(call));
            }

            BigInteger calldataHash = ECDSA.PedersenArrayHash(bigCalls.ToArray());

            return calldataHash.ToString("x");
        }

        public static string ComputeCalldataHashCairo0(Call[] callArray)
        {
            string[] formattedCallArray = FormatCalldataCairo0(callArray);
            List<BigInteger> bigCalls = new List<BigInteger>();

            foreach (string call in formattedCallArray)
            {
                bigCalls.Add(HexToBigInteger(call));
            }

            BigInteger calldataHash = ECDSA.PedersenArrayHash(bigCalls.ToArray());

            return calldataHash.ToString("x");
        }

        public static ECDSA.ECSignature SignInvokeTransaction(string version, string senderAddress, string calldataHash, string maxFee, string chainId, string nonce, BigInteger privateKey)
        {
            try
            {
                BigInteger txHash = TransactionHashInvoke(version, senderAddress, calldataHash, maxFee, chainId, nonce);
                return ECDSA.Sign(txHash, privateKey);
            }
            catch (System.Exception e)
            {
                Debug.LogError("Error signing transaction: " + e.Message);
                throw;
            }
        }
        public static BigInteger TransactionHashInvoke(string version, string senderAddress, string calldataHash, string maxFee, string chainId, string nonce)
        {
            string txHashPrefix = TransactionPrefixes.Invoke;
            string zero = "0x0";

            return CalculateTransactionHash(txHashPrefix, version, senderAddress, zero, calldataHash, maxFee, chainId, nonce);
        }
        public static BigInteger CalculateTransactionHash(string txHashPrefix, string version, string contractAddress, string entryPointSelector, string calldata, string maxFee, string chainId, params string[] additionalData)
        {
            List<string> data = new List<string>(7 + additionalData.Length)
            {
                txHashPrefix,
                version,
                contractAddress,
                entryPointSelector,
                calldata,
                maxFee,
                chainId
            };

            // Add the additional data to the list.
            data.AddRange(additionalData);

            // Compute and return the hash.
            return ComputeHashOnElements(data.ToArray());
        }

        private static BigInteger ComputeHashOnElements(string[] data)
        {
            // convert data strings to big integers
            BigInteger[] dataAsBigIntegers = new BigInteger[data.Length];
            for (int i = 0; i < data.Length; i++)
            {
                dataAsBigIntegers[i] = HexToBigInteger(data[i]);
            }

            // compute the hash
            BigInteger hash = ECDSA.PedersenArrayHash(dataAsBigIntegers);

            return hash;
        }

        public static BigInteger HexToBigInteger(string hex)
        {
            BigInteger X = BigInteger.Pow(2, 251) + 17 * BigInteger.Pow(2, 192) + 1;
            BigInteger fieldSize = X * 2;  // The field size is 2X because the range is -X to X - 1.
            try
            {
                var hexNumber = hex.StartsWith("0x") ? hex.Substring(2) : hex; // check if it starts with '0x' and remove it

                // Try to parse the hex string
                if (!BigInteger.TryParse(hexNumber, NumberStyles.AllowHexSpecifier, CultureInfo.InvariantCulture, out BigInteger result))
                {
                    Debug.LogError("Error converting hex to BigInteger: Invalid hex string.");
                }

                // Make the BigInteger positive if it's interpreted as negative
                if (result.Sign < 0)
                {
                    result = new BigInteger(result.ToByteArray().Concat(new byte[] { 0 }).ToArray());
                }

                // Ensure the result is within the range -X < result < X
                if (result >= X)
                {
                    result = (result + X) % fieldSize - X;  // Mapping the value to the range -X to X - 1.
                }

                return result;
            }
            catch (System.Exception e)
            {
                Debug.LogError("Error converting hex to BigInteger: " + e.Message);
                throw;
            }
        }

        public static string BigIntegerToHex(BigInteger bigInteger)
        {
            // Similar to HexToBigInteger, create BigIntegerToHex in the field of order X.
            BigInteger X = BigInteger.Pow(2, 251) + 17 * BigInteger.Pow(2, 192) + 1;
            BigInteger fieldSize = X * 2;  // The field size is 2X because the range is -X to X - 1.

            // Ensure the result is within the range -X < result < X
            if (bigInteger >= X)
            {
                bigInteger = (bigInteger + X) % fieldSize - X;  // Mapping the value to the range -X to X - 1.
            }

            // Make the BigInteger negative if it's interpreted as positive
            if (bigInteger.Sign > 0)
            {
                bigInteger = new BigInteger(bigInteger.ToByteArray().Concat(new byte[] { 0 }).ToArray());
            }

            // Convert the BigInteger to a hex string
            string hex = bigInteger.ToString("x");

            // Add the '0x' prefix
            return "0x" + hex;
        }

    }
}

