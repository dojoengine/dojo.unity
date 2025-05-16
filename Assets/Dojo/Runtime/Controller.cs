using System;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;
using UnityEngine;
using Dojo.Starknet;
using System.Linq;

namespace Dojo
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

    [Serializable]
    public struct ControllerCall {
        public FieldElement contractAddress;
        public string entrypoint;
        public FieldElement[] calldata;

        public ControllerCall(FieldElement contractAddress, string entrypoint, FieldElement[] calldata)
        {
            this.contractAddress = contractAddress;
            this.entrypoint = entrypoint;
            this.calldata = calldata;
        }

        public dojo.Call ToNative()
        {
            return new dojo.Call {
                to = contractAddress.Inner,
                selector = entrypoint,
                calldata = calldata.Select(c => c.Inner).ToArray()
            };
        }
    }

    public unsafe class Controller
    {
        private dojo.ControllerAccount* controller;
        public FieldElement Address => new FieldElement(dojo.controller_address(controller));
        public FieldElement ChainId => new FieldElement(dojo.controller_chain_id(controller));
        public string Username => CString.ToString(dojo.controller_username(controller));

        private static dojo.FnPtr_ControllerAccountPtr_Void onConnectCallback;
        private static TaskCompletionSource<Controller> connectionTask;

        private Controller(dojo.ControllerAccount* controller)
        {
            this.controller = controller;
        }

        public static Controller GetAccount(Policy[] policies, FieldElement chainId)
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

        public static Task<Controller> Connect(string rpcUrl, Policy[] policies)
        {
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

        public FieldElement ExecuteRaw(ControllerCall[] calls)
        {
            var nativeCalls = calls.Select(c => c.ToNative()).ToArray();
            dojo.Call* callsPtr;
            fixed (dojo.Call* ptr = &nativeCalls[0])
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

        public FieldElement ExecuteFromOutside(ControllerCall[] calls)
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