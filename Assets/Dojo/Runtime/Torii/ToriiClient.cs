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
        private dojo.ToriiClient* client;
        private dojo.Subscription* entitySubscription;
        private dojo.Subscription* eventMessagesSubscription;

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

            RegisterEntityStateUpdateEvent(new EntityKeysClause[] { }, dispatchEventsToMainThread);
            RegisterEventMessageUpdateEvent(new EntityKeysClause[] { }, dispatchEventsToMainThread);
        }

        // We assume the torii client won't be copied around.
        // So we can free the underlying c client when the managed client is garbage collected.
        ~ToriiClient()
        {
            dojo.subscription_cancel(entitySubscription);
            dojo.subscription_cancel(eventMessagesSubscription);

            // dojo.client_free(client);
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

        public List<Entity> EventMessages(Query query, bool historical = false)
        {
            var nativeQuery = query.ToNative();

            dojo.ResultCArrayEntity result = dojo.client_event_messages(client, &nativeQuery, historical);
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

        private void RegisterEntityStateUpdateEvent(EntityKeysClause[] clauses, bool dispatchToMainThread = true)
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


            dojo.EntityKeysClause* clausesPtr = (dojo.EntityKeysClause*)0;
            if (clauses.Length > 0)
            {
                var mappedClauses = clauses.Select(c => c.ToNative()).ToArray();
                fixed (dojo.EntityKeysClause* ptr = &mappedClauses[0])
                {
                    clausesPtr = ptr;
                }
            }


            dojo.ResultSubscription res = dojo.client_on_entity_state_update(client, clausesPtr, (UIntPtr)clauses.Length, new dojo.FnPtr_FieldElement_CArrayStruct_Void(onEntityStateUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }

            entitySubscription = res._ok;
        }

        public void UpdateEntitySubscription(EntityKeysClause[] clauses)
        {
            var mappedClauses = clauses.Select(c => c.ToNative()).ToArray();
            dojo.EntityKeysClause* clausesPtr;
            fixed (dojo.EntityKeysClause* ptr = &mappedClauses[0])
            {
                clausesPtr = ptr;
            }

            dojo.client_update_entity_subscription(client, entitySubscription, clausesPtr, (UIntPtr)clauses.Length);
        }

        private void RegisterEventMessageUpdateEvent(EntityKeysClause[] clauses, bool historical = false, bool dispatchToMainThread = true)
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


            dojo.EntityKeysClause* clausesPtr = (dojo.EntityKeysClause*)0;
            if (clauses.Length > 0)
            {
                var mappedClauses = clauses.Select(c => c.ToNative()).ToArray();
                fixed (dojo.EntityKeysClause* ptr = &mappedClauses[0])
                {
                    clausesPtr = ptr;
                }
            }

            dojo.ResultSubscription res = dojo.client_on_event_message_update(client, clausesPtr, (UIntPtr)clauses.Length, historical, new dojo.FnPtr_FieldElement_CArrayStruct_Void(onEventMessagesUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }

            eventMessagesSubscription = res._ok;
        }

        public void UpdateEventMessageSubscription(EntityKeysClause[] clauses, bool historical = false)
        {
            var mappedClauses = clauses.Select(c => c.ToNative()).ToArray();
            dojo.EntityKeysClause* clausesPtr;
            fixed (dojo.EntityKeysClause* ptr = &mappedClauses[0])
            {
                clausesPtr = ptr;
            }

            dojo.client_update_event_message_subscription(client, eventMessagesSubscription, clausesPtr, (UIntPtr)clauses.Length, historical);
        }

        public Span<byte> PublishMessage(TypedData typedData, FieldElement[] signature)
        {
            var mappedSignature = signature.Select(s => s.Inner).ToArray();
            dojo.FieldElement* signaturePtr;
            fixed (dojo.FieldElement* ptr = &mappedSignature[0])
            {
                signaturePtr = ptr;
            }

            var result = dojo.client_publish_message(client, new CString(JsonConvert.SerializeObject(typedData)), signaturePtr, (UIntPtr)signature.Length);
            if (result.tag == dojo.ResultCArrayu8_Tag.ErrCArrayu8)
            {
                throw new Exception(result.err.message);
            }

            return result.ok;
        }
    }
}