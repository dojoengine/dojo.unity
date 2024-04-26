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
        private dojo.FnPtr_FieldElement_CArrayModel_Void.@delegate onEntityStateUpdate;
        private dojo.FnPtr_FieldElement_CArrayModel_Void.@delegate onEventMessagesUpdate;
        private dojo.FnPtr_Void.@delegate onSyncModelUpdate;
        private dojo.ToriiClient* client;

        public ToriiClient(string toriiUrl, string rpcUrl, string relayUrl, string world)
        {
            CString ctoriiUrl = CString.FromString(toriiUrl);
            CString crpcUrl = CString.FromString(rpcUrl);
            CString crelayUrl = CString.FromString(relayUrl);
            CString cworld = CString.FromString(world);

            var result = dojo.client_new(ctoriiUrl, crpcUrl, crelayUrl, cworld, (dojo.KeysClause*)0, (UIntPtr)0);
            if (result.tag == dojo.ResultToriiClient_Tag.ErrToriiClient)
            {
                throw new Exception(result.err.message);
            }

            client = result._ok;

            RegisterEntityStateUpdateEvent(new dojo.FieldElement[] { });
            RegisterEventMessageUpdateEvent(new dojo.FieldElement[] { });
        }

        // We assume the torii client won't be copied around.
        // So we can free the underlying c client when the managed client is garbage collected.
        ~ToriiClient()
        {
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

        public List<Entity> Entities(dojo.Query query)
        {
            dojo.ResultCArrayEntity result = dojo.client_entities(client, &query);
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

        public List<Entity> EventMessages(dojo.Query query)
        {
            dojo.ResultCArrayEntity result = dojo.client_event_messages(client, &query);
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

        public ReadOnlySpan<dojo.KeysClause> SubscribedModels()
        {
            dojo.CArrayKeysClause models = dojo.client_subscribed_models(client);
            // NOTE: we could copy the data into a managed array
            // and free the c array from rust.
            // however, it is slower
            // dojo.EntityQuery[] arr = new Span<dojo.EntityQuery>(entities->data, (int)entities->data_len).ToArray();
            // dojo.carray_free(entities);

            // this just returns a span of the carray data
            // freeing the c array is up to the caller
            // dojo.carray_free(entities);
            var arr = new Span<dojo.KeysClause>(models.data, (int)models.data_len).ToArray();
            dojo.carray_free(models.data, models.data_len);
            return arr;
        }

        public void AddModelsToSync(dojo.KeysClause[] models)
        {
            dojo.KeysClause* modelsPtr;

            fixed (dojo.KeysClause* ptr = &models[0])
            {
                modelsPtr = ptr;
            }

            var result = dojo.client_add_models_to_sync(client, modelsPtr, (nuint)models.Length);
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }
        }

        public void RemoveModelsToSync(dojo.KeysClause[] models)
        {
            dojo.KeysClause* modelsPtr;

            fixed (dojo.KeysClause* ptr = &models[0])
            {
                modelsPtr = ptr;
            }

            var result = dojo.client_remove_models_to_sync(client, modelsPtr, (nuint)models.Length);
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }
        }

        public void RegisterSyncModelUpdateEvent(dojo.KeysClause model, bool dispatchToMainThread = true)
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

            dojo.ResultSubscription res = dojo.client_on_sync_model_update(client, model, new dojo.FnPtr_Void(onSyncModelUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }
        }

        private void RegisterEntityStateUpdateEvent(dojo.FieldElement[] entities, bool dispatchToMainThread = true)
        {
            dojo.FieldElement* entitiesPtr;

            fixed (dojo.FieldElement* ptr = entities)
            {
                entitiesPtr = ptr;
            }

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


            // dojo.FnPtr_FieldElement_CArrayModel_Void.@delegate callbackHandler = HandleEntityStateUpdate;
            dojo.ResultSubscription res = dojo.client_on_entity_state_update(client, entitiesPtr, (nuint)entities.Length, new dojo.FnPtr_FieldElement_CArrayModel_Void(onEntityStateUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }
        }

        private void RegisterEventMessageUpdateEvent(dojo.FieldElement[] entities, bool dispatchToMainThread = true)
        {
            dojo.FieldElement* entitiesPtr;

            fixed (dojo.FieldElement* ptr = entities)
            {
                entitiesPtr = ptr;
            }

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


            // dojo.FnPtr_FieldElement_CArrayModel_Void.@delegate callbackHandler = HandleEntityStateUpdate;
            dojo.ResultSubscription res = dojo.client_on_event_message_update(client, entitiesPtr, (nuint)entities.Length, new dojo.FnPtr_FieldElement_CArrayModel_Void(onEventMessagesUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }
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