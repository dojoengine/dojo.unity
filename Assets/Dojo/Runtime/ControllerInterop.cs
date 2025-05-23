#if UNITY_WEBGL && !UNITY_EDITOR

using System;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using AOT;
using bottlenoselabs.C2CS.Runtime;
using Newtonsoft.Json;
using UnityEngine;
using System.Linq;

namespace Dojo
{
    public static class ControllerInterop
    {
        [DllImport("__Internal")]
        private static extern void NewController(CString rpcUrl, CString chainId, CString policies);

        [DllImport("__Internal")]
        private static extern void Probe(Action<bool> cb);

        private static class ProbeHelper
        {
            public static TaskCompletionSource<bool> Tcs;

            [MonoPInvokeCallback(typeof(Action<bool>))]
            public static void Callback(bool result)
            {
                Tcs.SetResult(result);
            }
        }

        public static Task<bool> Probe()
        {
            ProbeHelper.Tcs = new TaskCompletionSource<bool>();
            Probe(ProbeHelper.Callback);
            return ProbeHelper.Tcs.Task;
        }


        [DllImport("__Internal")]
        private static extern void Connect(Action<bool> cb);

        private static class ConnectHelper
        {
            public static TaskCompletionSource<bool> Tcs;

            [MonoPInvokeCallback(typeof(Action<bool>))]
            public static void Callback(bool result)
            {
                Tcs.SetResult(result);
            }
        }

        public static Task<bool> Connect()
        {
            ConnectHelper.Tcs = new TaskCompletionSource<bool>();
            Connect(ConnectHelper.Callback);
            return ConnectHelper.Tcs.Task;
        }


        [DllImport("__Internal")]
        private static extern void Disconnect(Action cb);

        private static class DisconnectHelper
        {
            public static TaskCompletionSource<bool> Tcs; // Using bool to signal completion

            [MonoPInvokeCallback(typeof(Action))]
            public static void Callback()
            {
                Tcs.SetResult(true); // Signal completion
            }
        }

        public static Task Disconnect()
        {
            DisconnectHelper.Tcs = new TaskCompletionSource<bool>();
            Disconnect(DisconnectHelper.Callback);
            return DisconnectHelper.Tcs.Task;
        }


        [DllImport("__Internal")]
        private static extern void Execute(Action<string> cb, CString calls);

        private static class ExecuteHelper
        {
            public static TaskCompletionSource<string> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string result)
            {
                 // The result is the transaction hash from the JS side
                Tcs.SetResult(result);
            }
        }


        // Takes ControllerCall structs, serializes them into the expected JSON format
        public static Task<string> Execute(ControllerCall[] calls)
        {
            ExecuteHelper.Tcs = new TaskCompletionSource<string>();
             var serializedCalls = calls.Select(call => new SerializedCall(
                new FieldElement(call.to),
                call.selector,
                // Ensure dojo.FieldElement can be converted to Dojo.Starknet.FieldElement if they differ
                // Assuming direct conversion or access to underlying data works:
                call.calldata.ToArray().Select(f => new FieldElement(f)).ToArray()
            )).ToArray();

            var jsonCalls = JsonConvert.SerializeObject(serializedCalls);
            Execute(ExecuteHelper.Callback, new CString(jsonCalls));
            return ExecuteHelper.Tcs.Task;
        }
    }
}

#endif // UNITY_WEBGL && !UNITY_EDITOR 