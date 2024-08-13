using UnityEngine;
using System;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using AOT;
using System.Collections.Generic;
using dojo_bindings;
using Dojo.Starknet;
using Newtonsoft.Json;
using System.Linq;
using Newtonsoft.Json.Linq;


namespace Dojo.Torii
{
    [Serializable]
    public struct WasmValue
    {
        public string type;
        public string type_name;
        public JToken value;
        public bool key;
    }

    [Serializable]
    public struct WasmEnum
    {
        public string option;
        public WasmValue value;
    }

    public class ToriiWasmInterop : MonoBehaviour
    {
        // Creates a new client and returns the pointer to it
        [DllImport("__Internal")]
        public static extern void CreateClient(CString rpcUrl, CString toriiUrl, CString relayUrl, CString worldAddress, Action<IntPtr> cb);

        // Returns a dictionary of all of the entities
        [DllImport("__Internal")]
        public static extern void GetEntities(IntPtr clientPtr, CString query, Action<string> cb);

        [DllImport("__Internal")]
        public static extern void GetEventMessages(IntPtr clientPtr, CString query, Action<string> cb);

        // Get the value of a model for a specific set of keys
        [DllImport("__Internal")]
        public static extern string GetModelValue(IntPtr clientPtr, CString model, CString keys);

        // Calls the callback at [callbackObjectName].[callbackMethodName] on entity updated
        [DllImport("__Internal")]
        public static extern void OnEntityUpdated(IntPtr clientPtr, CString clauses, Action<string, string> cb, Action<IntPtr> subCb);

        [DllImport("__Internal")]
        public static extern void UpdateEntitySubscription(IntPtr clientPtr, IntPtr subPtr, CString clauses);

        // Calls the callback at [callbackObjectName].[callbackMethodName] on event mnessage updated
        [DllImport("__Internal")]
        public static extern void OnEventMessageUpdated(IntPtr clientPtr, CString clauses, Action<string, string> cb, Action<IntPtr> subCb);

        [DllImport("__Internal")]
        public static extern void UpdateEventMessageSubscription(IntPtr clientPtr, IntPtr subPtr, CString clauses);

        // Add models to sync
        [DllImport("__Internal")]
        public static extern void AddModelsToSync(IntPtr clientPtr, CString models);

        // Remove models to sync
        [DllImport("__Internal")]
        public static extern void RemoveModelsToSync(IntPtr clientPtr, CString models);

        // Calls the callback at [callbackObjectName].[callbackMethodName] on model change
        [DllImport("__Internal")]
        public static extern void OnSyncModelChange(IntPtr clientPtr, CString model, CString callbackObjectName, CString callbackMethodName);

        [DllImport("__Internal")]
        public static extern string EncodeTypedData(CString typedData, CString address);


        [DllImport("__Internal")]
        public static extern void PublishMessage(IntPtr clientPtr, CString typedData, CString signature, Action<string> cb);
    }
}