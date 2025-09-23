#if UNITY_WEBGL && !UNITY_EDITOR
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
    public struct WasmEntity
    {
        public string hashed_keys;
        public Dictionary<string, Dictionary<string, WasmValue>> models;
        public long created_at;
        public long updated_at;
        public long executed_at;
    }

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

    [Serializable]
    public struct WasmFixedSizeArray
    {
        public WasmValue[] array;
        public uint size;
    }

    [Serializable]
    public struct WasmToken
    {
        public string contract_address;
        public string? token_id;
        public string name;
        public string symbol;
        public int decimals;
        public string metadata;
        public string? total_supply;
    }

    [Serializable]
    public struct WasmTokenBalance
    {
        public string balance;
        public string account_address;
        public string contract_address;
        public string? token_id;
    }

    [Serializable]
    public struct WasmController
    {
        public string address;
        public string username;
        public long deployed_at_timestamp;
    }

    public class ToriiWasmInterop : MonoBehaviour
    {
        // Creates a new client and returns the pointer to it
        [DllImport("__Internal")]
        public static extern void CreateClient(CString toriiUrl, CString worldAddress, Action<IntPtr> cb);

        // Returns a page of all controllers
        [DllImport("__Internal")]
        public static extern void GetControllers(IntPtr clientPtr, CString query, Action<string> cb);

        // Returns an array of all tokens
        [DllImport("__Internal")]
        public static extern void GetTokens(IntPtr clientPtr, CString query, Action<string> cb);

        // Returns an array of all token balances
        [DllImport("__Internal")]
        public static extern void GetTokenBalances(IntPtr clientPtr, CString query, Action<string> cb);

        // Returns a dictionary of all of the entities
        [DllImport("__Internal")]
        public static extern void GetEntities(IntPtr clientPtr, CString query, Action<string> cb);

        [DllImport("__Internal")]
        public static extern void GetEventMessages(IntPtr clientPtr, CString query, Action<string> cb);

        [DllImport("__Internal")]
        public static extern void OnEntityUpdated(IntPtr clientPtr, CString clause, Action<string> cb, Action<IntPtr> subCb);

        [DllImport("__Internal")]
        public static extern void UpdateEntitySubscription(IntPtr clientPtr, IntPtr subPtr, CString clause);

        // Calls the callback at [callbackObjectName].[callbackMethodName] on event mnessage updated
        [DllImport("__Internal")]
        public static extern void OnEventMessageUpdated(IntPtr clientPtr, CString clause, Action<string> cb, Action<IntPtr> subCb);

        [DllImport("__Internal")]
        public static extern void UpdateEventMessageSubscription(IntPtr clientPtr, IntPtr subPtr, CString clause);

        [DllImport("__Internal")]
        public static extern void OnTokenUpdated(IntPtr clientPtr, CString contractAddresses, CString tokenIds, Action<string> cb, Action<IntPtr> subCb);

        [DllImport("__Internal")]
        public static extern void OnTokenBalanceUpdated(IntPtr clientPtr, CString contractAddresses, CString accountAddresses, CString tokenIds, Action<string> cb, Action<IntPtr> subCb);

        [DllImport("__Internal")]
        public static extern string EncodeTypedData(CString typedData, CString address);

        [DllImport("__Internal")]
        public static extern void PublishMessage(IntPtr clientPtr, CString typedData, CString signature, Action<string> cb);
    }
}
#endif // UNITY_WEBGL