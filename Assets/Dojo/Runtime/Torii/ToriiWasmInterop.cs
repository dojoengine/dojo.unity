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
  public struct WasmToken
  {
    public string contract_address;
    public string token_id;
    public string name;
    public string symbol;
    public int decimals;
    public string metadata;
  }

  [Serializable]
  public struct WasmTokenBalance
  {
    public string balance;
    public string account_address;
    public string contract_address;
    public string token_id;
  }

  public class ToriiWasmInterop : MonoBehaviour
  {
#if UNITY_IOS
    // Stub implementations for non-WebGL platforms
    public static void CreateClient(CString toriiUrl, CString relayUrl, CString worldAddress, Action<IntPtr> cb)
    {
      Debug.LogWarning("CreateClient called on non-WebGL platform.");
      cb(IntPtr.Zero);
    }

    public static void GetTokens(IntPtr clientPtr, CString contractAddresses, CString tokenIds, int limit, CString cursor, Action<string> cb)
    {
      Debug.LogWarning("GetTokens called on non-WebGL platform.");
      cb("{}");
    }

    public static void GetTokenBalances(IntPtr clientPtr, CString contractAddresses, CString accountAddresses, CString tokenIds, int limit, CString cursor, Action<string> cb)
    {
      Debug.LogWarning("GetTokenBalances called on non-WebGL platform.");
      cb("{}");
    }

    public static void OnTokenUpdated(IntPtr clientPtr, CString contractAddresses, CString tokenIds, Action<string> cb, Action<IntPtr> subCb)
    {
      Debug.LogWarning("OnTokenUpdated called on non-WebGL platform.");
      subCb(IntPtr.Zero);
    }

    public static void OnTokenBalanceUpdated(IntPtr clientPtr, CString contractAddresses, CString accountAddresses, CString tokenIds, Action<string> cb, Action<IntPtr> subCb)
    {
      Debug.LogWarning("OnTokenBalanceUpdated called on non-WebGL platform.");
      subCb(IntPtr.Zero);
    }

    public static void GetEntities(IntPtr clientPtr, CString query, Action<string> cb)
    {
      Debug.LogWarning("GetEntities called on non-WebGL platform.");
      cb("{}");
    }

    public static void GetEventMessages(IntPtr clientPtr, CString query, Action<string> cb)
    {
      Debug.LogWarning("GetEventMessages called on non-WebGL platform.");
      cb("{}");
    }

    public static string GetModelValue(IntPtr clientPtr, CString model, CString keys)
    {
      Debug.LogWarning("GetModelValue called on non-WebGL platform.");
      return "{}";
    }

    public static void OnEntityUpdated(IntPtr clientPtr, CString clauses, Action<string> cb, Action<IntPtr> subCb)
    {
      Debug.LogWarning("OnEntityUpdated called on non-WebGL platform.");
    }

    public static void UpdateEntitySubscription(IntPtr clientPtr, IntPtr subPtr, CString clauses)
    {
      Debug.LogWarning("UpdateEntitySubscription called on non-WebGL platform.");
    }

    public static void OnEventMessageUpdated(IntPtr clientPtr, CString clause, Action<string> cb, Action<IntPtr> subCb)
    {
      Debug.LogWarning("OnEventMessageUpdated called on non-WebGL platform.");
    }

    public static void UpdateEventMessageSubscription(IntPtr clientPtr, IntPtr subPtr, CString clauses)
    {
      Debug.LogWarning("UpdateEventMessageSubscription called on non-WebGL platform.");
    }

    public static void AddModelsToSync(IntPtr clientPtr, CString models)
    {
      Debug.LogWarning("AddModelsToSync called on non-WebGL platform.");
    }

    public static void RemoveModelsToSync(IntPtr clientPtr, CString models)
    {
      Debug.LogWarning("RemoveModelsToSync called on non-WebGL platform.");
    }

    public static void OnSyncModelChange(IntPtr clientPtr, CString model, CString callbackObjectName, CString callbackMethodName)
    {
      Debug.LogWarning("OnSyncModelChange called on non-WebGL platform.");
    }

    public static string EncodeTypedData(CString typedData, CString address)
    {
      Debug.LogWarning("EncodeTypedData called on non-WebGL platform.");
      return "{}";
    }

    public static void PublishMessage(IntPtr clientPtr, CString typedData, CString signature, Action<string> cb)
    {
      Debug.LogWarning("PublishMessage called on non-WebGL platform.");
      cb("{}");
    }
#else
    // Creates a new client and returns the pointer to it
    [DllImport("__Internal")]
    public static extern void CreateClient(CString toriiUrl, CString relayUrl, CString worldAddress, Action<IntPtr> cb);

    // Returns an array of all tokens
    [DllImport("__Internal")]
    public static extern void GetTokens(IntPtr clientPtr, CString contractAddresses, CString tokenIds, int limit, CString cursor, Action<string> cb);

    // Returns an array of all token balances
    [DllImport("__Internal")]
    public static extern void GetTokenBalances(IntPtr clientPtr, CString contractAddresses, CString accountAddresses, CString tokenIds, int limit, CString cursor, Action<string> cb);

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
#endif
  }
}