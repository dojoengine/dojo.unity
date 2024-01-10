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
    [System.Serializable]
    public struct WasmValue {
        public string type;
        public JToken value;
    }

    public class ToriiWasmInterop : MonoBehaviour
    {
        // Creates a new client and returns the pointer to it
        [DllImport("__Internal")]
        public static extern void CreateClient(CString rpcUrl, CString toriiUrl, CString worldAddress, Action<IntPtr> cb);

        private static class CreateClientHelper
        {
            public static TaskCompletionSource<IntPtr> Tcs { get; } = new TaskCompletionSource<IntPtr>();

            [MonoPInvokeCallback(typeof(Action<IntPtr>))]
            public static void Callback(IntPtr clientPtr)
            {
                Tcs.SetResult(clientPtr);
            }
        }

        public static Task<IntPtr> CreateClientAsync(string rpcUrl, string toriiUrl, string worldAddress)
        {
            CreateClient(new CString(rpcUrl), new CString(toriiUrl), new CString(worldAddress), CreateClientHelper.Callback);
            return CreateClientHelper.Tcs.Task;
        }

        // Returns a dictionary of all of the entities
        [DllImport("__Internal")]
        public static extern void GetEntities(IntPtr clientPtr, int limit, int offset, Action<string> cb);

        private static class GetEntitiesHelper
        {
            public static TaskCompletionSource<List<Entity>> Tcs { get; } = new TaskCompletionSource<List<Entity>>();

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string entities)
            {
                var parsedEntities = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, Dictionary<string, WasmValue>>>>(entities);
                var entityList = new List<Entity>();

                foreach (var entity in parsedEntities)
                {
                    var models = new Dictionary<string, Model>();
                    foreach (var model in entity.Value)
                    {
                        models.Add(model.Key, new Model(
                            model.Key,
                            model.Value.ToDictionary(
                                m => m.Key,
                                m => m.Value
                            )
                        ));
                    }

                    entityList.Add(new Entity(new FieldElement(entity.Key), models));
                }

                Tcs.SetResult(entityList);
            }
        }

        public static Task<List<Entity>> GetEntitiesAsync(IntPtr clientPtr, int limit, int offset)
        {
            GetEntities(clientPtr, limit, offset, GetEntitiesHelper.Callback);
            return GetEntitiesHelper.Tcs.Task;
        }

        // Returns a dictionary of all of the entities corresponding
        // to the model and keys
        [DllImport("__Internal")]
        public static extern string GetEntitiesByKeys(IntPtr clientPtr, string model, string keys, int limit, int offset);

        // Get the value of a model for a specific set of keys
        [DllImport("__Internal")]
        public static extern string GetModelValue(IntPtr clientPtr, string model, string keys);

        // Calls the callback at [callbackObjectName].[callbackMethodName] on entity updated
        [DllImport("__Internal")]
        private static extern void OnEntityUpdated(IntPtr clientPtr, IntPtr ids, Action<string> cb);

        private static class OnEntityUpdatedHelper
        {

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string entity)
            {
                var parsedEntity = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, Dictionary<string, WasmValue>>>>(entity).First();
                var models = new Dictionary<string, Model>();
                
                foreach (var model in parsedEntity.Value)
                {
                    models.Add(model.Key, new Model(
                        model.Key,
                        model.Value
                    ));
                }

                ToriiEvents.Instance.EntityUpdated(new FieldElement(parsedEntity.Key), models.Values.ToArray());
            }
        }

        public static void OnEntityUpdated(IntPtr clientPtr, FieldElement[] ids)
        {
            OnEntityUpdated(clientPtr, new CString(JsonConvert.SerializeObject(ids)), OnEntityUpdatedHelper.Callback);
        }

        // Add models to sync
        [DllImport("__Internal")]
        public static extern void AddModelsToSync(IntPtr clientPtr, string models);

        // Remove models to sync
        [DllImport("__Internal")]
        public static extern void RemoveModelsToSync(IntPtr clientPtr, string models);

        // Calls the callback at [callbackObjectName].[callbackMethodName] on model change
        [DllImport("__Internal")]
        public static extern void OnSyncModelChange(IntPtr clientPtr, string model, string callbackObjectName, string callbackMethodName);
    }
}