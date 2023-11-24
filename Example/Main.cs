using System.Diagnostics;
using System.Runtime.CompilerServices;
using bottlenoselabs.C2CS.Runtime;
using dojo_namespace;

namespace Dojo
{
    unsafe class ToriiClient
    {

        private dojo.ToriiClient* client;
        ToriiClient(string toriiUrl, string rpcUrl, dojo.FieldElement world, dojo.EntityQuery[] entities)
        {
            CString ctoriiUrl = CString.FromString(toriiUrl);
            CString crpcUrl = CString.FromString(rpcUrl);
            dojo.EntityQuery* entitiesPtr;

            fixed (dojo.EntityQuery* ptr = &entities[0])
            {
                entitiesPtr = ptr;
            }

            dojo.Error* error = null;
            client = dojo.client_new(ctoriiUrl, crpcUrl, &world, entitiesPtr, (nuint)entities.Length, error);

            if (error != null)
            {
                throw new Exception(error->message);
            }
        }

        ~ToriiClient()
        {
            dojo.client_free(client);
        }

        public dojo.WorldMetadata WorldMetadata()
        {
            dojo.WorldMetadata worldMetadata = dojo.client_metadata(client);

            return worldMetadata;
        }

        public dojo.Ty Entity(dojo.EntityQuery query)
        {
            dojo.Error* error = null;
            dojo.Ty entity = *dojo.client_entity(client, &query, error);

            if (error != null)
            {
                throw new Exception(error->message);
            }

            return entity;
        }

        public ReadOnlySpan<dojo.EntityQuery> Entities(dojo.EntityQuery query)
        {
            dojo.CArray_EntityQuery* entities = dojo.client_subscribed_entities(client);


            return new Span<dojo.EntityQuery>(entities->data, (int)entities->data_len);
        }

        public void AddEntitiesToSync(dojo.EntityQuery[] entities)
        {
            dojo.EntityQuery* entitiesPtr;

            fixed (dojo.EntityQuery* ptr = &entities[0])
            {
                entitiesPtr = ptr;
            }

            dojo.Error* error = null;
            dojo.client_add_entities_to_sync(client, entitiesPtr, (nuint)entities.Length, error);

            if (error != null)
            {
                throw new Exception(error->message);
            }
        }

        public void RemoveEntitiesToSync(dojo.EntityQuery[] entities)
        {
            dojo.EntityQuery* entitiesPtr;

            fixed (dojo.EntityQuery* ptr = &entities[0])
            {
                entitiesPtr = ptr;
            }

            dojo.Error* error = null;
            dojo.client_remove_entities_to_sync(client, entitiesPtr, (nuint)entities.Length, error);

            if (error != null)
            {
                throw new Exception(error->message);
            }
        }

        public void OnEntityStateUpdate(dojo.EntityQuery query, dojo.FnPtr_Void callback)
        {
            dojo.Error* error = null;
            dojo.client_on_entity_state_update(client, &query, callback, error);

            if (error != null)
            {
                throw new Exception(error->message);
            }
        }

        public void StartSubscription()
        {
            dojo.Error* error = null;
            dojo.client_start_subscription(client, error);

            if (error != null)
            {
                throw new Exception(error->message);
            }
        }
    }
}