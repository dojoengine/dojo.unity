using System;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using AOT;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;
using Newtonsoft.Json;
using Debug = UnityEngine.Debug;

namespace Dojo.Starknet {
    public class StarknetInterop {
        [DllImport("__Internal")]
        public static extern IntPtr NewProvider(CString nodeUrl);

        [DllImport("__Internal")]
        public static extern IntPtr NewAccount(IntPtr provider, CString privateKey, CString address, Action<IntPtr> cb);

        public class NewAccountHelper {
            public static TaskCompletionSource<IntPtr> Tcs;

            [MonoPInvokeCallback(typeof(Action<IntPtr>))]
            public static void Callback(IntPtr result) {
                Tcs.SetResult(result);
            }
        }

        public static Task<IntPtr> NewAccountAsync(IntPtr provider, SigningKey privateKey, string address) {
            NewAccountHelper.Tcs = new TaskCompletionSource<IntPtr>();
            NewAccount(provider, new CString(privateKey.PrivateKey.Hex()), new CString(address), NewAccountHelper.Callback);
            return NewAccountHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern string AccountAddress(IntPtr account);

        [DllImport("__Internal")]
        public static extern string AccountChainId(IntPtr account);

        [DllImport("__Internal")]
        public static extern void AccountExecuteRaw(IntPtr account, CString calls, Action<string> cb);

        public class AccountExecuteRawHelper {
            public static TaskCompletionSource<FieldElement> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string result) {
                Tcs.SetResult(new FieldElement(result));
            }
        }

        public struct Call
        {
            public string to;
            public string selector;
            // array of hex strings
            public string[] calldata;
        }

        public static Task<FieldElement> AccountExecuteRawAsync(IntPtr account, dojo.Call[] calls) {
            AccountExecuteRawHelper.Tcs = new TaskCompletionSource<FieldElement>();
            AccountExecuteRaw(account, new CString(JsonConvert.SerializeObject(calls.Select(call => new StarknetInterop.Call{
                to = call.to.ToString(),
                selector = call.selector.ToString(),
                calldata = call.calldata.ToArray().Select(f => new FieldElement(f).Hex()).ToArray(),
            }).ToArray())), AccountExecuteRawHelper.Callback);
            return AccountExecuteRawHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern void AccountDeployBurner(IntPtr account, Action<IntPtr> cb);

        public class AccountDeployBurnerHelper {
            public static TaskCompletionSource<IntPtr> Tcs;

            [MonoPInvokeCallback(typeof(Action<IntPtr>))]
            public static void Callback(IntPtr result) {
                Tcs.SetResult(result);
            }
        }

        public static Task<IntPtr> AccountDeployBurnerAsync(IntPtr account) {
            AccountDeployBurnerHelper.Tcs = new TaskCompletionSource<IntPtr>();
            AccountDeployBurner(account, AccountDeployBurnerHelper.Callback);
            return AccountDeployBurnerHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern void WaitForTransaction(IntPtr provider, CString transactionHash, Action<bool> cb);

        public class WaitForTransactionHelper {
            public static TaskCompletionSource<bool> Tcs;

            [MonoPInvokeCallback(typeof(Action<bool>))]
            public static void Callback(bool result) {
                Tcs.SetResult(result);
            }
        }

        public static Task<bool> WaitForTransactionAsync(IntPtr provider, FieldElement transactionHash) {
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
    }
}