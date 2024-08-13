using System;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using AOT;
using bottlenoselabs.C2CS.Runtime;
using Newtonsoft.Json;
using Debug = UnityEngine.Debug;
using dojo_bindings;
using System.Text.RegularExpressions;

namespace Dojo.Starknet
{
    public class StarknetInterop
    {
        [DllImport("__Internal")]
        public static extern IntPtr NewProvider(CString nodeUrl);

        [DllImport("__Internal")]
        public static extern IntPtr NewAccount(IntPtr provider, CString privateKey, CString address, Action<IntPtr> cb);

        public class NewAccountHelper
        {
            public static TaskCompletionSource<IntPtr> Tcs;

            [MonoPInvokeCallback(typeof(Action<IntPtr>))]
            public static void Callback(IntPtr result)
            {
                Tcs.SetResult(result);
            }
        }

        public static Task<IntPtr> NewAccountAsync(IntPtr provider, SigningKey privateKey, FieldElement address)
        {
            NewAccountHelper.Tcs = new TaskCompletionSource<IntPtr>();
            NewAccount(provider, new CString(privateKey.Inner.Hex()), new CString(address.Hex()), NewAccountHelper.Callback);
            return NewAccountHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern string AccountAddress(IntPtr account);

        [DllImport("__Internal")]
        public static extern string AccountChainId(IntPtr account);
        
        [DllImport("__Internal")]
        public static extern void AccountNonce(IntPtr account, Action<string> cb);

        public class AccountNonceHelper
        {
            public static TaskCompletionSource<FieldElement> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string result)
            {
                Tcs.SetResult(new FieldElement(result));
            }
        }

        public static Task<FieldElement> AccountNonceAsync(IntPtr account)
        {
            AccountNonceHelper.Tcs = new TaskCompletionSource<FieldElement>();
            AccountNonce(account, AccountNonceHelper.Callback);
            return AccountNonceHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern void AccountExecuteRaw(IntPtr account, CString calls, Action<string> cb);

        public class AccountExecuteRawHelper
        {
            public static TaskCompletionSource<FieldElement> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string result)
            {
                Tcs.SetResult(new FieldElement(result));
            }
        }

        struct SerializedCall
        {
            public SerializedCall(FieldElement to, string selector, FieldElement[] calldata)
            {
                this.to = to.Hex();
                this.selector = selector;
                this.calldata = calldata.Select(f => f.Hex()).ToArray();
            }

            // hex string of address
            public string to;
            // the unhashed selector
            public string selector;
            // array of hex strings
            public string[] calldata;
        }

        class SerializedBlockId
        {
            public static object Serialize(dojo.BlockId blockId)
            {
                return blockId.tag switch
                {
                    dojo.BlockId_Tag.Hash => new BlockIdHash { Hash = new FieldElement(blockId.hash).Hex() },
                    dojo.BlockId_Tag.Number => new BlockIdNumber { Number = blockId.number.ToString() },
                    dojo.BlockId_Tag.BlockTag_ => new BlockIdTag
                    {
                        BlockTag = blockId.block_tag switch
                        {
                            dojo.BlockTag.Latest => "Latest",
                            dojo.BlockTag.Pending => "Pending",
                            _ => throw new Exception("Unknown block tag")
                        }
                    },
                    _ => throw new Exception("Unknown block id type")
                };
            }

            public struct BlockIdHash
            {
                public string Hash;
            }

            public struct BlockIdNumber
            {
                public string Number;
            }

            public struct BlockIdTag
            {
                public string BlockTag;
            }
        }

        public static Task<FieldElement> AccountExecuteRawAsync(IntPtr account, dojo.Call[] calls)
        {
            AccountExecuteRawHelper.Tcs = new TaskCompletionSource<FieldElement>();
            AccountExecuteRaw(account, new CString(JsonConvert.SerializeObject(calls.Select(call => new SerializedCall(new FieldElement(call.to), call.selector, call.calldata.ToArray().Select(f => new FieldElement(f)).ToArray())).ToArray())), AccountExecuteRawHelper.Callback);
            return AccountExecuteRawHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern void AccountDeployBurner(IntPtr account, CString privateKey, Action<IntPtr> cb);

        public class AccountDeployBurnerHelper
        {
            public static TaskCompletionSource<IntPtr> Tcs;

            [MonoPInvokeCallback(typeof(Action<IntPtr>))]
            public static void Callback(IntPtr result)
            {
                Tcs.SetResult(result);
            }
        }

        public static Task<IntPtr> AccountDeployBurnerAsync(IntPtr account, SigningKey signingKey)
        {
            AccountDeployBurnerHelper.Tcs = new TaskCompletionSource<IntPtr>();
            AccountDeployBurner(account, new CString(signingKey.Inner.Hex()), AccountDeployBurnerHelper.Callback);
            return AccountDeployBurnerHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern void Call(IntPtr provider, CString call, CString blockId, Action<string> cb);

        public class CallHelper
        {
            public static TaskCompletionSource<FieldElement[]> Tcs;

            [MonoPInvokeCallback(typeof(Action<FieldElement[]>))]
            public static void Callback(string result)
            {
                Tcs.SetResult(JsonConvert.DeserializeObject<string[]>(result).Select(f => new FieldElement(f)).ToArray());
            }
        }

        public static Task<FieldElement[]> CallAsync(IntPtr provider, dojo.Call call, dojo.BlockId blockId)
        {
            WaitForTransactionHelper.Tcs = new TaskCompletionSource<bool>();
            var serializedCall = new SerializedCall(new FieldElement(call.to), call.selector, call.calldata.ToArray().Select(f => new FieldElement(f)).ToArray());
            object serializedBlockId = SerializedBlockId.Serialize(blockId);

            Call(provider, new CString(JsonConvert.SerializeObject(serializedCall)), new CString(JsonConvert.SerializeObject(serializedBlockId)), CallHelper.Callback);
            return CallHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern void WaitForTransaction(IntPtr provider, CString transactionHash, Action<bool> cb);

        public class WaitForTransactionHelper
        {
            public static TaskCompletionSource<bool> Tcs;

            [MonoPInvokeCallback(typeof(Action<bool>))]
            public static void Callback(bool result)
            {
                Tcs.SetResult(result);
            }
        }

        public static Task<bool> WaitForTransactionAsync(IntPtr provider, FieldElement transactionHash)
        {
            WaitForTransactionHelper.Tcs = new TaskCompletionSource<bool>();
            WaitForTransaction(provider, new CString(transactionHash.Hex()), WaitForTransactionHelper.Callback);
            return WaitForTransactionHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern string NewSigningKey();

        [DllImport("__Internal")]
        public static extern string Sign(CString privateKey, CString hash);

        [DllImport("__Internal")]
        public static extern string NewVerifyingKey(CString privateKey);

        [DllImport("__Internal")]
        public static extern bool Verify(CString publicKey, CString hash, CString r, CString s);

        [DllImport("__Internal")]
        private static extern string SerializeByteArray(CString byteArray);

        public static FieldElement[] SerializeByteArray(string byteArray)
        {
            return JsonConvert.DeserializeObject<string[]>(SerializeByteArray(new CString(byteArray))).Select(f => new FieldElement(f)).ToArray();
        }

        [DllImport("__Internal")]
        private static extern string DeserializeByteArray(CString felts);

        public static string DeserializeByteArray(FieldElement[] felts)
        {
            return DeserializeByteArray(new CString(JsonConvert.SerializeObject(felts.Select(f => f.Hex()).ToArray())));
        }

        [DllImport("__Internal")]
        public static extern string PoseidonHash(CString str);
    }
}