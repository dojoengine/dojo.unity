using System;
using System.Collections;
using System.Collections.Generic;
using bottlenoselabs.C2CS.Runtime;
using UnityEngine;
using dojo_bindings;
using JetBrains.Annotations;
using System.Linq;

namespace Dojo.Torii
{
    public unsafe class ToriiClient
    {
        public delegate void OnSyncModelUpdateDelegate();
        public delegate void OnEntityStateUpdateDelegate(dojo.FieldElement key, Model[] models);

        private dojo.ToriiClient* client;

        public ToriiClient(string toriiUrl, string rpcUrl, string world, dojo.KeysClause[] entities)
        {
            CString ctoriiUrl = CString.FromString(toriiUrl);
            CString crpcUrl = CString.FromString(rpcUrl);
            CString cworld = CString.FromString(world);
            dojo.KeysClause* entitiesPtr;

            fixed (dojo.KeysClause* ptr = entities)
            {
                entitiesPtr = ptr;
            }

            var result = dojo.client_new(ctoriiUrl, crpcUrl, cworld, entitiesPtr, (nuint)entities.Length);
            if (result.tag == dojo.Result_____ToriiClient_Tag.Err_____ToriiClient)
            {
                throw new Exception(result.err.message);
            }

            client = result._ok;
        }

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

        [CanBeNull]
        public Ty Model(dojo.KeysClause query)
        {
            dojo.Result_COption_____Ty result = dojo.client_model(client, &query);
            if (result.tag == dojo.Result_COption_____Ty_Tag.Err_COption_____Ty)
            {
                throw new Exception(result.err.message);
            }

            // can be None - nullable
            if (result.ok.tag == dojo.COption_____Ty_Tag.None_____Ty)
            {
                return null;
            }

            // we instantiate a new managed Ty object
            // which will free the underlying c ty when it is garbage collected
            return new Ty(result.ok._some);
        }

        public List<Entity> Entities(dojo.Query query)
        {
            dojo.Result_CArray_Entity result = dojo.client_entities(client, &query);
            if (result.tag == dojo.Result_CArray_Entity_Tag.Err_CArray_Entity)
            {
                throw new Exception(result.err.message);
            }

            var entities = new List<Entity>();
            foreach (var entity in result.ok)
            {
                entities.Add(new Entity(&entity));
            }

            return entities;
        }

        public ReadOnlySpan<dojo.KeysClause> SubscribedModels()
        {
            dojo.CArray_KeysClause models = dojo.client_subscribed_models(client);
            // NOTE: we could copy the data into a managed array
            // and free the c array from rust.
            // however, it is slower
            // dojo.EntityQuery[] arr = new Span<dojo.EntityQuery>(entities->data, (int)entities->data_len).ToArray();
            // dojo.carray_free(entities);

            // this just returns a span of the carray data
            // freeing the c array is up to the caller
            // dojo.carray_free(entities);
            return new Span<dojo.KeysClause>(models.data, (int)models.data_len);
        }

        public void AddModelsToSync(dojo.KeysClause[] models)
        {
            dojo.KeysClause* modelsPtr;

            fixed (dojo.KeysClause* ptr = &models[0])
            {
                modelsPtr = ptr;
            }

            var result = dojo.client_add_models_to_sync(client, modelsPtr, (nuint)models.Length);
            if (result.tag == dojo.Result_bool_Tag.Err_bool)
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
            if (result.tag == dojo.Result_bool_Tag.Err_bool)
            {
                throw new Exception(result.err.message);
            }
        }

        public void OnSyncModelUpdate(dojo.KeysClause model, OnSyncModelUpdateDelegate callback)
        {
            dojo.FnPtr_Void.@delegate handler = () =>
            {
                callback();
            };

            dojo.client_on_sync_model_update(client, model, new dojo.FnPtr_Void(handler));
        }

        public void OnEntityStateUpdate(dojo.FieldElement[] entities, OnEntityStateUpdateDelegate callback)
        {
            dojo.FieldElement* entitiesPtr;

            fixed (dojo.FieldElement* ptr = &entities[0])
            {
                entitiesPtr = ptr;
            }

            dojo.FnPtr_FieldElement_CArrayModel_Void.@delegate handler = (key, models) =>
            {
                var mappedModels = new Model[(uint)models.data_len];
                for (var i = 0; i < (uint)models.data_len; i++)
                {
                    mappedModels[i] = new Model(
                        models.data[i]);
                    // TODO: free model
                }

                callback(key, mappedModels);
            };

            dojo.client_on_entity_state_update(client, entitiesPtr, (nuint)entities.Length, new dojo.FnPtr_FieldElement_CArrayModel_Void(handler));
        }

        public void StartSubscription()
        {
            var result = dojo.client_start_subscription(client);
            if (result.tag == dojo.Result_bool_Tag.Err_bool)
            {
                throw new Exception(result.err.message);
            }
        }
    }
}