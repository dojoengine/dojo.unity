using System;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;
using UnityEngine;
using Dojo.Starknet;
using System.Linq;

namespace Dojo.Controller
{
    [Serializable]
    public struct Policy
    {
        public FieldElement target;
        public string method;
        public string description;

        public Policy(FieldElement target, string method, string description)
        {
            this.target = target;
            this.method = method;
            this.description = description;
        }

        public dojo.Policy ToNative()
        {
            return new dojo.Policy { target = target.Inner, method = method, description = description };
        }
    }

    public class Controller
    {
        unsafe private dojo.ControllerAccount* controller;
#if UNITY_WEBGL && !UNITY_EDITOR
        public FieldElement Address => new FieldElement(ControllerInterop.Address());
        public string Username => ControllerInterop.Username();
#else
        unsafe public FieldElement Address => new FieldElement(dojo.controller_address(controller));
        unsafe public string Username => CString.ToString(dojo.controller_username(controller));
#endif

        private static dojo.FnPtr_ControllerAccountPtr_Void onConnectCallback;
        private static TaskCompletionSource<Controller> connectionTask;

        unsafe private Controller(dojo.ControllerAccount* controller)
        {
            this.controller = controller;
        }

        private Controller() {}

#if UNITY_WEBGL && !UNITY_EDITOR
        public static async Task<Controller> Connect(string rpcUrl, Policy[] policies, FieldElement chainId = null)
        {
            if (await ControllerInterop.Connect(rpcUrl, policies, chainId))
            {
                return new Controller();
            }

            Debug.LogWarning("Failed to connect to controller");
            return null;
        }
#else
        unsafe private static Controller GetAccount(Policy[] policies, FieldElement chainId)
        {
            var nativePolicies = policies.Select(p => p.ToNative()).ToArray();
            dojo.Policy* policiesPtr = null;
            if (nativePolicies.Length > 0)
            {
                fixed (dojo.Policy* ptr = &nativePolicies[0])
                {
                    policiesPtr = ptr;
                }
            }

            var result = dojo.controller_account(policiesPtr, (UIntPtr)policies.Length, chainId.Inner);
            if (result.tag == dojo.ResultControllerAccount_Tag.ErrControllerAccount)
            {
                Debug.LogWarning(result.err.message);
                return null;
            }

            return new Controller(result._ok);
        }

        unsafe public static Task<Controller> Connect(string rpcUrl, Policy[] policies, FieldElement chainId = null)
        {
            if (chainId != null) {
                var account = GetAccount(policies, chainId);
                if (account != null) {
                    return Task.FromResult(account);
                }
            }

            connectionTask = new TaskCompletionSource<Controller>();
            var nativePolicies = policies.Select(p => p.ToNative()).ToArray();
            CString crpcUrl = CString.FromString(rpcUrl);

            dojo.Policy* policiesPtr = null;
            if (nativePolicies.Length > 0)
            {
                fixed (dojo.Policy* ptr = &nativePolicies[0])
                {
                    policiesPtr = ptr;
                }
            }

            onConnectCallback = new dojo.FnPtr_ControllerAccountPtr_Void((controllerPtr) =>
            {
                var controller = new Controller(controllerPtr);
                connectionTask.TrySetResult(controller);
            });

            dojo.controller_connect(crpcUrl, policiesPtr, (UIntPtr)policies.Length, onConnectCallback);

            return connectionTask.Task;
        }
#endif

#if UNITY_WEBGL && !UNITY_EDITOR
#else
        unsafe public static bool Clear(Policy[] policies, FieldElement chainId)
        {
            var nativePolicies = policies.Select(p => p.ToNative()).ToArray();
            dojo.Policy* policiesPtr = null;
            if (nativePolicies.Length > 0)
            {
                fixed (dojo.Policy* ptr = &nativePolicies[0])
                {
                    policiesPtr = ptr;
                }
            }

            var result = dojo.controller_clear(policiesPtr, (UIntPtr)policies.Length, chainId.Inner);
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }

            return result.ok;
        }
#endif

#if UNITY_WEBGL && !UNITY_EDITOR
        public async Task<FieldElement> Execute(Call[] calls)
        {
            var txHash = await ControllerInterop.Execute(calls);
            return new FieldElement(txHash);
        }
#else
        unsafe private FieldElement ExecuteSync(Call[] calls)
        {
            var nativeCalls = calls.Select(c => c.ToNative()).ToArray();
            dojo.Call* callsPtr;
            fixed (dojo.Call* ptr = &nativeCalls[0])
            {
                callsPtr = ptr;
            }

            var result = dojo.controller_execute_from_outside(controller, callsPtr, (UIntPtr)calls.Length);
            if (result.tag == dojo.ResultFieldElement_Tag.ErrFieldElement)
            {
                throw new Exception(result.err.message);
            }

            return new FieldElement(result.ok);
        }

        public async Task<FieldElement> Execute(Call[] calls)
        {
            return await Task.Run(() => ExecuteSync(calls));
        }
#endif
    }
}