using System;
using System.Collections.Generic;
using bottlenoselabs.C2CS.Runtime;
using UnityEngine;
using dojo_bindings;
using Dojo.Starknet;
using Newtonsoft.Json;
using System.Linq;
namespace Dojo.Torii
{
    public unsafe class ToriiClient
    {
        private dojo.FnPtr_FieldElement_CArrayStruct_Void.@delegate onEntityStateUpdate;
        private dojo.FnPtr_FieldElement_CArrayStruct_Void.@delegate onEventMessagesUpdate;
        private dojo.FnPtr_Void.@delegate onSyncModelUpdate;
        private dojo.ToriiClient* client;
        private List<IntPtr> subscriptions = new List<IntPtr>();

        public ToriiClient(string toriiUrl, string rpcUrl, string relayUrl, FieldElement worldAddress, bool dispatchEventsToMainThread = true)
        {
            CString ctoriiUrl = CString.FromString(toriiUrl);
            CString crpcUrl = CString.FromString(rpcUrl);
            CString crelayUrl = CString.FromString(relayUrl);

            var result = dojo.client_new(ctoriiUrl, crpcUrl, crelayUrl, worldAddress.Inner);
            if (result.tag == dojo.ResultToriiClient_Tag.ErrToriiClient)
            {
                throw new Exception(result.err.message);
            }

            client = result._ok;
            dojo.client_set_logger(client, new dojo.FnPtr_CString_Void((msg) => Debug.Log(msg)));

            RegisterEntityStateUpdateEvent(null, dispatchEventsToMainThread);
            RegisterEventMessageUpdateEvent(null, dispatchEventsToMainThread);
        }

        // We assume the torii client won't be copied around.
        // So we can free the underlying c client when the managed client is garbage collected.
        ~ToriiClient()
        {
            for (var i = 0; i < subscriptions.Count; i++)
            {
                dojo.subscription_cancel((dojo.Subscription*)subscriptions[i]);
            }

            dojo.client_free(client);
        }

        public dojo.WorldMetadata WorldMetadata()
        {
            // TODO: implement a managed type for WorldMetadata too
            dojo.WorldMetadata worldMetadata = dojo.client_metadata(client);

            return worldMetadata;
        }

        // NOT USED? potentially deprecated
        // [CanBeNull]
        // public Model Model(dojo.KeysClause query)
        // {
        //     dojo.ResultCOptionTy result = dojo.client_model(client, &query);
        //     if (result.tag == dojo.ResultCOptionTy_Tag.ErrCOptionTy)
        //     {
        //         throw new Exception(result.err.message);
        //     }

        //     // can be None - nullable
        //     if (result.ok.tag == dojo.COptionTy_Tag.NoneTy)
        //     {
        //         return null;
        //     }

        //     // we instantiate a new managed Ty object
        //     // which will free the underlying c ty when it is garbage collected
        //     return new Ty(result.ok._some.);
        // }

        public List<Entity> Entities(Query query)
        {
            var nativeQuery = query.ToNative();

            dojo.ResultCArrayEntity result = dojo.client_entities(client, &nativeQuery);
            if (result.tag == dojo.ResultCArrayEntity_Tag.ErrCArrayEntity)
            {
                throw new Exception(result.err.message);
            }

            var entities = new List<Entity>();
            for (var i = 0; i < (int)result._ok.data_len; i++)
            {
                entities.Add(new Entity(result._ok.data[i]));
            }

            dojo.carray_free(result._ok.data, result._ok.data_len);
            return entities;
        }

        public List<Entity> EventMessages(Query query)
        {
            var nativeQuery = query.ToNative();

            dojo.ResultCArrayEntity result = dojo.client_event_messages(client, &nativeQuery);
            if (result.tag == dojo.ResultCArrayEntity_Tag.ErrCArrayEntity)
            {
                throw new Exception(result.err.message);
            }

            var entities = new List<Entity>();
            for (var i = 0; i < (int)result._ok.data_len; i++)
            {
                entities.Add(new Entity(result._ok.data[i]));
            }

            dojo.carray_free(result._ok.data, result._ok.data_len);
            return entities;
        }

        public ReadOnlySpan<dojo.ModelKeysClause> SubscribedModels()
        {
            dojo.CArrayModelKeysClause models = dojo.client_subscribed_models(client);
            // NOTE: we could copy the data into a managed array
            // and free the c array from rust.
            // however, it is slower
            // dojo.EntityQuery[] arr = new Span<dojo.EntityQuery>(entities->data, (int)entities->data_len).ToArray();
            // dojo.carray_free(entities);

            // this just returns a span of the carray data
            // freeing the c array is up to the caller
            // dojo.carray_free(entities);
            var arr = new Span<dojo.ModelKeysClause>(models.data, (int)models.data_len).ToArray();
            dojo.carray_free(models.data, models.data_len);
            return arr;
        }

        public void AddModelsToSync(ModelKeysClause[] models)
        {
            var mappedModels = models.ToArray().Select(m => m.ToNative()).ToArray();

            dojo.ModelKeysClause* modelsPtr;
            fixed (dojo.ModelKeysClause* ptr = &mappedModels[0])
            {
                modelsPtr = ptr;
            }

            var result = dojo.client_add_models_to_sync(client, modelsPtr, (nuint)models.Length);
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }
        }

        public void RemoveModelsToSync(ModelKeysClause[] models)
        {
            var mappedModels = models.ToArray().Select(m => m.ToNative()).ToArray();

            dojo.ModelKeysClause* modelsPtr;
            fixed (dojo.ModelKeysClause* ptr = &mappedModels[0])
            {
                modelsPtr = ptr;
            }

            var result = dojo.client_remove_models_to_sync(client, modelsPtr, (nuint)models.Length);
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }
        }

        public void RegisterSyncModelUpdateEvent(ModelKeysClause model, bool dispatchToMainThread = true)
        {
            onSyncModelUpdate = () =>
            {
                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(() => ToriiEvents.Instance.SyncModelUpdated());
                }
                else
                {
                    ToriiEvents.Instance.SyncModelUpdated();
                }
            };

            dojo.ResultSubscription res = dojo.client_on_sync_model_update(client, model.ToNative(), new dojo.FnPtr_Void(onSyncModelUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }

            subscriptions.Add((IntPtr)res._ok);
        }

        private void RegisterEntityStateUpdateEvent(EntityKeysClause? clause = null, bool dispatchToMainThread = true)
        {
            onEntityStateUpdate = (key, models) =>
            {
                var mappedModels = new Model[(int)models.data_len];
                for (var i = 0; i < (int)models.data_len; i++)
                {
                    mappedModels[i] = new Model(models.data[i]);
                    // cleanup model
                    // dojo.model_free(&models.data[i]);
                }

                // only run this when in unity play mode
                // we need our unity main thread dispatcher to run this on the main thread
                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(() => ToriiEvents.Instance.EntityUpdated(new FieldElement(key), mappedModels));
                }
                else
                {
                    ToriiEvents.Instance.EntityUpdated(new FieldElement(key), mappedModels);
                }

                // cleanup
                dojo.carray_free(models.data, models.data_len);
                // TODO: free field element
            };


            dojo.EntityKeysClause* ptr = (dojo.EntityKeysClause*)0;
            if (clause.HasValue)
            {
                var c = clause.Value.ToNative();
                ptr = &c;
            }
            dojo.ResultSubscription res = dojo.client_on_entity_state_update(client, ptr, new dojo.FnPtr_FieldElement_CArrayStruct_Void(onEntityStateUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }

            subscriptions.Add((IntPtr)res._ok);
        }

        private void RegisterEventMessageUpdateEvent(EntityKeysClause? clause = null, bool dispatchToMainThread = true)
        {
            onEventMessagesUpdate = (key, models) =>
            {
                var mappedModels = new Model[(int)models.data_len];
                for (var i = 0; i < (int)models.data_len; i++)
                {
                    mappedModels[i] = new Model(models.data[i]);
                    // cleanup model
                    // dojo.model_free(&models.data[i]);
                }

                // only run this when in unity play mode
                // we need our unity main thread dispatcher to run this on the main thread
                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(() => ToriiEvents.Instance.EventMessageUpdated(new FieldElement(key), mappedModels));
                }
                else
                {
                    ToriiEvents.Instance.EventMessageUpdated(new FieldElement(key), mappedModels);
                }

                // cleanup
                dojo.carray_free(models.data, models.data_len);
                // TODO: free field element
            };


            dojo.EntityKeysClause* ptr = (dojo.EntityKeysClause*)0;
            if (clause.HasValue)
            {
                var c = clause.Value.ToNative();
                ptr = &c;
            }
            dojo.ResultSubscription res = dojo.client_on_event_message_update(client, ptr, new dojo.FnPtr_FieldElement_CArrayStruct_Void(onEventMessagesUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }

            subscriptions.Add((IntPtr)res._ok);
        }

        public Span<byte> PublishMessage(TypedData typedData, Signature signature)
        {
            var result = dojo.client_publish_message(client, new CString(JsonConvert.SerializeObject(typedData)), signature.Inner);
            if (result.tag == dojo.ResultCArrayu8_Tag.ErrCArrayu8)
            {
                throw new Exception(result.err.message);
            }

            return result.ok;
        }
    }
}