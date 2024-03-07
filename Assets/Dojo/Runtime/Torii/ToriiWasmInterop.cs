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
        public JToken value;
    }

    [Serializable]
    public struct Message
    {
        public string propagationSource;
        public string source;
        public string messageId;
        public string topic;
        public byte[] data;
    }

    public class ToriiWasmInterop : MonoBehaviour
    {
        // Creates a new client and returns the pointer to it
        [DllImport("__Internal")]
        public static extern void CreateClient(CString rpcUrl, CString toriiUrl, CString relayUrl, CString worldAddress, Action<IntPtr> cb);

        private static class CreateClientHelper
        {
            public static TaskCompletionSource<IntPtr> Tcs;

            [MonoPInvokeCallback(typeof(Action<IntPtr>))]
            public static void Callback(IntPtr clientPtr)
            {
                Tcs.SetResult(clientPtr);
            }
        }

        public static Task<IntPtr> CreateClientAsync(string rpcUrl, string toriiUrl, string relayUrl, string worldAddress)
        {
            CreateClientHelper.Tcs = new TaskCompletionSource<IntPtr>();
            CreateClient(new CString(rpcUrl), new CString(toriiUrl), new CString(relayUrl), new CString(worldAddress), CreateClientHelper.Callback);
            return CreateClientHelper.Tcs.Task;
        }

        // Returns a dictionary of all of the entities
        [DllImport("__Internal")]
        public static extern void GetEntities(IntPtr clientPtr, CString query, Action<string> cb);

        private static class GetEntitiesHelper
        {
            public static TaskCompletionSource<List<Entity>> Tcs;

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

        public static Task<List<Entity>> GetEntitiesAsync(IntPtr clientPtr, Query query)
        {
            GetEntitiesHelper.Tcs = new TaskCompletionSource<List<Entity>>();
            GetEntities(clientPtr, new CString(JsonConvert.SerializeObject(query)), GetEntitiesHelper.Callback);
            return GetEntitiesHelper.Tcs.Task;
        }

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

        [DllImport("__Internal")]
        public static extern void SubscribeTopic(IntPtr clientPtr, CString topic, Action<bool> cb);

        private static class SubscribeTopicHelper
        {
            public static TaskCompletionSource<bool> Tcs;

            [MonoPInvokeCallback(typeof(Action<bool>))]
            public static void Callback(bool success)
            {
                Tcs.SetResult(success);
            }
        }

        public static Task<bool> SubscribeTopicAsync(IntPtr clientPtr, string topic)
        {
            SubscribeTopicHelper.Tcs = new TaskCompletionSource<bool>();
            SubscribeTopic(clientPtr, new CString(topic), SubscribeTopicHelper.Callback);
            return SubscribeTopicHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern void UnsubscribeTopic(IntPtr clientPtr, CString topic, Action<bool> cb);

        private static class UnsubscribeTopicHelper
        {
            public static TaskCompletionSource<bool> Tcs;

            [MonoPInvokeCallback(typeof(Action<bool>))]
            public static void Callback(bool success)
            {
                Tcs.SetResult(success);
            }
        }

        public static Task<bool> UnsubscribeTopicAsync(IntPtr clientPtr, string topic)
        {
            UnsubscribeTopicHelper.Tcs = new TaskCompletionSource<bool>();
            UnsubscribeTopic(clientPtr, new CString(topic), UnsubscribeTopicHelper.Callback);
            return UnsubscribeTopicHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        public static extern void PublishMessage(IntPtr clientPtr, CString topic, CString message, Action<string> cb);

        private static class PublishMessageHelper
        {
            public static TaskCompletionSource<byte[]> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string messageId)
            {
                Tcs.SetResult(JsonConvert.DeserializeObject<byte[]>(messageId));
            }
        }

        public static Task<byte[]> PublishMessageAsync(IntPtr clientPtr, string topic, byte[] message)
        {
            PublishMessageHelper.Tcs = new TaskCompletionSource<byte[]>();
            PublishMessage(clientPtr, new CString(topic), new CString(JsonConvert.SerializeObject(message.Select(b => (int)b).ToArray())), PublishMessageHelper.Callback);
            return PublishMessageHelper.Tcs.Task;
        }

        [DllImport("__Internal")]
        private static extern void OnMessage(IntPtr clientPtr, Action<string> cb);

        private static class OnMessageHelper
        {
            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string message)
            {
                var parsedMessage = JsonConvert.DeserializeObject<Message>(message);
                ToriiEvents.Instance.Message(
                    parsedMessage.propagationSource,
                    parsedMessage.source,
                    parsedMessage.messageId,
                    parsedMessage.topic,
                    parsedMessage.data
                );
            }
        }

        public static void OnMessage(IntPtr clientPtr)
        {
            OnMessage(clientPtr, OnMessageHelper.Callback);
        }
    }
}