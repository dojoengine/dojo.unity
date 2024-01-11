using System;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using AOT;
using bottlenoselabs.C2CS.Runtime;
using Newtonsoft.Json;
using UnityEngine;

namespace Dojo.Starknet
{
    public class StarknetInterop : MonoBehaviour
    {
        [DllImport("__Internal")]
        public static extern string GetPublicKey(CString privateKey);

        // Returns a compact hex string of the signature
        // string(r + s)
        // 0x is not included
        [DllImport("__Internal")]
        public static extern string Sign(CString msgHash, CString privateKey);

        // Returns true if the signature is valid
        // compactHex is a compact hex string of the signature
        [DllImport("__Internal")]
        public static extern bool Verify(CString compactHex, CString msgHash, CString publicKey);

        // Returns a stringified json object of the RpcProvider object
        [DllImport("__Internal")]
        public static extern string NewRpcProvider(CString nodeUrl);

        [DllImport("__Internal")]
        public static extern string WaitForTransaction(CString providerStr, CString txHash, Action<string> cb);

        private static class WaitForTransactionHelper
        {
            public static TaskCompletionSource<string> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string txHash)
            {
                Tcs.SetResult(txHash);
            }
        }

        public static Task<string> WaitForTransactionAsync(string providerStr, string txHash)
        {
            WaitForTransactionHelper.Tcs = new TaskCompletionSource<string>();
            WaitForTransaction(new CString(providerStr), new CString(txHash), WaitForTransactionHelper.Callback);
            return WaitForTransactionHelper.Tcs.Task;
        }

        // Returns a stringified json object of the Account object
        [DllImport("__Internal")]
        public static extern string NewAccount(CString providerStr, CString address, CString privateKey);

        [DllImport("__Internal")]
        public static extern string AccountAddress(CString accountStr);

        [DllImport("__Internal")]
        public static extern string AccountChainId(CString accountStr);

        // Calls should be a stringified array of Call objects
        // Calldata is RawCalladata - should be a stringified array of Felts
        [DllImport("__Internal")]
        public static extern string AccountExecuteRaw(CString accountStr, CString calls, Action<string> cb);

        private static class AccountExecuteRawHelper
        {
            public static TaskCompletionSource<string> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string result)
            {
                Tcs.SetResult(result);
            }
        }

        public struct Call
        {
            public string contractAddress;
            public string entrypoint;
            // array of hex strings
            public string[] calldata;
        }

        public static Task<string> AccountExecuteRawAsync(string accountStr, Call[] calls)
        {
            AccountExecuteRawHelper.Tcs = new TaskCompletionSource<string>();
            AccountExecuteRaw(new CString(accountStr), new CString(JsonConvert.SerializeObject(calls)), AccountExecuteRawHelper.Callback);
            return AccountExecuteRawHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern string AccountDeployBurner(CString accountStr, Action<string> cb);

        private static class AccountDeployBurnerHelper
        {
            public static TaskCompletionSource<string> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string result)
            {
                Tcs.SetResult(result);
            }
        }

        public static Task<string> AccountDeployBurnerAsync(string accountStr)
        {
            AccountDeployBurnerHelper.Tcs = new TaskCompletionSource<string>();
            AccountDeployBurner(new CString(accountStr), AccountDeployBurnerHelper.Callback);
            return AccountDeployBurnerHelper.Tcs.Task;
        }
    }
}