using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AOT;
using bottlenoselabs.C2CS.Runtime;
using Dojo.Starknet;
using dojo_bindings;
using Newtonsoft.Json;
using UnityEngine;

namespace Dojo.Torii
{
    public class ToriiWasmClient
    {
        private string toriiUrl;
        private string rpcUrl;
        private string relayUrl;
        private FieldElement world;
        public IntPtr clientPtr;

        public ToriiWasmClient(string toriiUrl, string rpcUrl, string relayUrl, FieldElement world)
        {
            this.toriiUrl = toriiUrl;
            this.rpcUrl = rpcUrl;
            this.relayUrl = relayUrl;
            this.world = world;
        }

        private static class CreateClientHelper
        {
            public static TaskCompletionSource<IntPtr> Tcs;

            [MonoPInvokeCallback(typeof(Action<IntPtr>))]
            public static void Callback(IntPtr clientPtr)
            {
                Tcs.SetResult(clientPtr);
            }
        }

        public async Task CreateClient()
        {
            CreateClientHelper.Tcs = new TaskCompletionSource<IntPtr>();
            ToriiWasmInterop.CreateClient(new CString(rpcUrl), new CString(toriiUrl), new CString(relayUrl), new CString(world.Hex()), CreateClientHelper.Callback);
            clientPtr = await CreateClientHelper.Tcs.Task;

            RegisterEntityStateUpdateEvent();
            RegisterEventMessageUpdateEvent();
        }

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

        public Task<List<Entity>> Entities(Query query)
        {
            GetEntitiesHelper.Tcs = new TaskCompletionSource<List<Entity>>();
            ToriiWasmInterop.GetEntities(clientPtr, new CString(JsonConvert.SerializeObject(query)), GetEntitiesHelper.Callback);
            return GetEntitiesHelper.Tcs.Task;
        }

        public Task<List<Entity>> EventMessages(Query query)
        {
            GetEntitiesHelper.Tcs = new TaskCompletionSource<List<Entity>>();
            ToriiWasmInterop.GetEventMessages(clientPtr, new CString(JsonConvert.SerializeObject(query)), GetEntitiesHelper.Callback);
            return GetEntitiesHelper.Tcs.Task;
        }

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

        public void RegisterEntityStateUpdateEvent(KeysClause? clause = null)
        {
            ToriiWasmInterop.OnEntityUpdated(clientPtr, clause.HasValue ? new CString(JsonConvert.SerializeObject(clause)) : (IntPtr)0, OnEntityUpdatedHelper.Callback);
        }

        private static class OnEventMessageUpdatedHelper
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

                ToriiEvents.Instance.EventMessageUpdated(new FieldElement(parsedEntity.Key), models.Values.ToArray());
            }
        }

        public void RegisterEventMessageUpdateEvent(KeysClause? clause = null)
        {
            ToriiWasmInterop.OnEventMessageUpdated(clientPtr, clause.HasValue ? new CString(JsonConvert.SerializeObject(clause)) : (IntPtr)0, OnEventMessageUpdatedHelper.Callback);
        }

        private static class PublishMessageHelper
        {
            public static TaskCompletionSource<byte[]> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string messageId)
            {
                Tcs.SetResult(JsonConvert.DeserializeObject<byte[]>(messageId));
            }
        }

        public Task<byte[]> PublishMessage(TypedData typedData, Signature signature)
        {
            PublishMessageHelper.Tcs = new TaskCompletionSource<byte[]>();
            ToriiWasmInterop.PublishMessage(clientPtr, new CString(JsonConvert.SerializeObject(typedData)), new CString(JsonConvert.SerializeObject(new
            {
                r = signature.R().Hex(),
                s = signature.S().Hex()
            })), PublishMessageHelper.Callback);
            return PublishMessageHelper.Tcs.Task;
        }

    }
}