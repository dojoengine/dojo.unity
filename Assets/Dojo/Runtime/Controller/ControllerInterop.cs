#if UNITY_WEBGL && !UNITY_EDITOR

using System;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using AOT;
using bottlenoselabs.C2CS.Runtime;
using Newtonsoft.Json;
using UnityEngine;
using System.Linq;
using Dojo.Starknet;

namespace Dojo.Controller
{
    public static class ControllerInterop
    {
        [DllImport("__Internal")]
        private static extern void ControllerProbe(Action<bool> cb);

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
            ControllerProbe(ProbeHelper.Callback);
            return ProbeHelper.Tcs.Task;
        }


        [DllImport("__Internal")]
        private static extern void ControllerConnect(CString rpcUrl, CString policies, CString chainId, Action<bool> cb);

        private static class ConnectHelper
        {
            public static TaskCompletionSource<bool> Tcs;

            [MonoPInvokeCallback(typeof(Action<bool>))]
            public static void Callback(bool result)
            {
                Tcs.SetResult(result);
            }
        }

        public static Task<bool> Connect(string rpcUrl, Policy[] policies, FieldElement chainId = null)
        {
            ConnectHelper.Tcs = new TaskCompletionSource<bool>();
            ControllerConnect(new CString(rpcUrl), new CString(JsonConvert.SerializeObject(policies)), chainId != null ? new CString(chainId.ToString()) : new CString(""), ConnectHelper.Callback);
            return ConnectHelper.Tcs.Task;
        }


        [DllImport("__Internal")]
        private static extern void ControllerDisconnect(Action cb);

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
            ControllerDisconnect(DisconnectHelper.Callback);
            return DisconnectHelper.Tcs.Task;
        }


        [DllImport("__Internal")]
        private static extern void ControllerExecute(Action<string> cb, CString calls);

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


        public static Task<string> Execute(Call[] calls)
        {
            ExecuteHelper.Tcs = new TaskCompletionSource<string>();
            ControllerExecute(ExecuteHelper.Callback, new CString(JsonConvert.SerializeObject(calls)));
            return ExecuteHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        private static extern string ControllerUsername();

        public static string Username()
        {
            return ControllerUsername();
        }

        [DllImport("__Internal")]
        private static extern string ControllerAddress();

        public static string Address()
        {
            return ControllerAddress();
        }

        [DllImport("__Internal")]
        private static extern void ControllerChainId(Action<string> cb);

        private static class ChainIdHelper
        {
            public static TaskCompletionSource<FieldElement> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string result)
            {
                Tcs.SetResult(new FieldElement(result));
            }
        }

        public static Task<FieldElement> ChainId()
        {
            ChainIdHelper.Tcs = new TaskCompletionSource<FieldElement>();
            ControllerChainId(ChainIdHelper.Callback);
            return ChainIdHelper.Tcs.Task;
        }
    }
}

#endif // UNITY_WEBGL && !UNITY_EDITOR 