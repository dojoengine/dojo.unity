using System;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;
using UnityEngine;
using Dojo.Starknet;
using System.Linq;

namespace Dojo
{
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

    public unsafe class ControllerAccount
    {
        private dojo.ControllerAccount* controller;
        public FieldElement Address => new FieldElement(dojo.controller_address(controller));
        public FieldElement ChainId => new FieldElement(dojo.controller_chain_id(controller));
        public string Username => CString.ToString(dojo.controller_username(controller));

        private static dojo.FnPtr_ControllerAccountPtr_Void onConnectCallback;
        private static TaskCompletionSource<ControllerAccount> connectionTask;

        private ControllerAccount(dojo.ControllerAccount* controller)
        {
            this.controller = controller;
        }

        public static ControllerAccount GetAccount(Policy[] policies, FieldElement chainId)
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

            return new ControllerAccount(result._ok);
        }

        public static Task<ControllerAccount> Connect(string rpcUrl, Policy[] policies)
        {
            connectionTask = new TaskCompletionSource<ControllerAccount>();
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
                var controller = new ControllerAccount(controllerPtr);
                connectionTask.TrySetResult(controller);
            });

            dojo.controller_connect(crpcUrl, policiesPtr, (UIntPtr)policies.Length, onConnectCallback);

            return connectionTask.Task;
        }

        public static bool Clear(Policy[] policies, FieldElement chainId)
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

        public FieldElement ExecuteRaw(dojo.Call[] calls)
        {
            dojo.Call* callsPtr;
            fixed (dojo.Call* ptr = &calls[0])
            {
                callsPtr = ptr;
            }

            var result = dojo.controller_execute_raw(controller, callsPtr, (UIntPtr)calls.Length);
            if (result.tag == dojo.ResultFieldElement_Tag.ErrFieldElement)
            {
                throw new Exception(result.err.message);
            }

            return new FieldElement(result.ok);
        }

        public FieldElement ExecuteFromOutside(dojo.Call[] calls)
        {
            dojo.Call* callsPtr;
            fixed (dojo.Call* ptr = &calls[0])
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

        public FieldElement Nonce()
        {
            if (controller == null)
            {
                throw new InvalidOperationException("Controller is not initialized");
            }

            var result = dojo.controller_nonce(controller);
            if (result.tag == dojo.ResultFieldElement_Tag.ErrFieldElement)
            {
                throw new Exception(result.err.message);
            }

            return new FieldElement(result.ok);
        }
    }
}