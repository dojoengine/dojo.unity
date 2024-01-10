using System;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using AOT;
using bottlenoselabs.C2CS.Runtime;
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
            public static TaskCompletionSource<string> Tcs { get; } = new TaskCompletionSource<string>();

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string txHash)
            {
                Tcs.SetResult(txHash);
            }
        }

        public static Task<string> WaitForTransactionAsync(string providerStr, string txHash)
        {
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

        [DllImport("__Internal")]
        public static extern string AccountExecuteRaw(CString accountStr, CString contractAddress, CString entrypoint, CString calldata, Action<string> cb);

        private static class AccountExecuteRawHelper
        {
            public static TaskCompletionSource<string> Tcs { get; } = new TaskCompletionSource<string>();

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string result)
            {
                Tcs.SetResult(result);
            }
        }

        public static Task<string> AccountExecuteRawAsync(string accountStr, string contractAddress, string entrypoint, string calldata)
        {
            AccountExecuteRaw(new CString(accountStr), new CString(contractAddress), new CString(entrypoint), new CString(calldata), AccountExecuteRawHelper.Callback);
            return AccountExecuteRawHelper.Tcs.Task;
        }
    }
}