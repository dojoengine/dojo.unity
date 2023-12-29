using UnityEngine;
using System;
using System.Runtime.InteropServices;

public class ToriiInterop : MonoBehaviour
{
    [DllImport("__Internal")]
    public static extern void WasmBindgen();

    // Creates a new client and returns the pointer to it
    [DllImport("__Internal")]
    public static extern IntPtr CreateClient(string rpcUrl, string toriiUrl, string worldAddress);

    // Returns a dictionary of all of the entities
    [DllImport("__Internal")]
    public static extern string GetEntities(IntPtr clientPtr, int limit, int offset);

    // Returns a dictionary of all of the entities corresponding
    // to the model and keys
    [DllImport("__Internal")]
    public static extern string GetEntitiesByKeys(IntPtr clientPtr, string model, string keys, int limit, int offset);

    // Get the value of a model for a specific set of keys
    [DllImport("__Internal")]
    public static extern string GetModelValue(IntPtr clientPtr, string model, string keys);

    // Calls the callback at [callbackObjectName].[callbackMethodName] on entity updated
    [DllImport("__Internal")]
    public static extern void OnEntityUpdated(IntPtr clientPtr, string ids, string callbackObjectName, string callbackMethodName);

    // Add models to sync
    [DllImport("__Internal")]
    public static extern void AddModelsToSync(IntPtr clientPtr, string models);

    // Remove models to sync
    [DllImport("__Internal")]
    public static extern void RemoveModelsToSync(IntPtr clientPtr, string models);

    // Calls the callback at [callbackObjectName].[callbackMethodName] on model change
    [DllImport("__Internal")]
    public static extern void OnModelSyncChange(IntPtr clientPtr, string model, string callbackObjectName, string callbackMethodName);
}