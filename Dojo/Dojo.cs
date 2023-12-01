using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo
{
    public unsafe class ToriiClient
    {
        private dojo.ToriiClient* client;
        public ToriiClient(string toriiUrl, string rpcUrl, string world, dojo.Keys[] entities)
        {
            CString ctoriiUrl = CString.FromString(toriiUrl);
            CString crpcUrl = CString.FromString(rpcUrl);
            CString cworld = CString.FromString(world);
            dojo.Keys* entitiesPtr;

            fixed (dojo.Keys* ptr = &entities[0])
            {
                entitiesPtr = ptr;
            }

            dojo.Error error;
            client = dojo.client_new(ctoriiUrl, crpcUrl, cworld, entitiesPtr, (nuint)entities.Length, &error);

            if (client == null)
            {
                throw new Exception(error.message);
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

        public dojo.Ty Entity(dojo.Keys query)
        {
            dojo.Error error;
            // NOTE: this returns a complex data type
            // there are multiple allocated carrays
            // which means that they need to be fred.

            // NOTE: we could copy the data into a managed structure
            // and free the original structure from rust.
            dojo.Ty entity = *dojo.client_entity(client, &query, &error);

            if (error.message != string.Empty)
            {
                throw new Exception(error.message);
            }

            // freeing the c array is up to the caller
            // dojo.ty_free(entity);
            return entity;
        }

        public ReadOnlySpan<dojo.KeysClause> Entities()
        {
            dojo.CArray_KeysClause* entities = dojo.client_subscribed_entities(client);
            // NOTE: we could copy the data into a managed array
            // and free the c array from rust.
            // however, it is slower
            // dojo.EntityQuery[] arr = new Span<dojo.EntityQuery>(entities->data, (int)entities->data_len).ToArray();
            // dojo.carray_free(entities);

            // this just returns a span of the carray data
            // freeing the c array is up to the caller
            // dojo.carray_free(entities);
            return new Span<dojo.KeysClause>(entities->data, (int)entities->data_len);
        }

        public void AddEntitiesToSync(dojo.Keys[] entities)
        {
            dojo.Keys* entitiesPtr;

            fixed (dojo.Keys* ptr = &entities[0])
            {
                entitiesPtr = ptr;
            }

            dojo.Error error;
            dojo.client_add_entities_to_sync(client, entitiesPtr, (nuint)entities.Length, &error);

            if (error.message != string.Empty)
            {
                throw new Exception(error.message);
            }
        }

        public void RemoveEntitiesToSync(dojo.Keys[] entities)
        {
            dojo.Keys* entitiesPtr;

            fixed (dojo.Keys* ptr = &entities[0])
            {
                entitiesPtr = ptr;
            }

            dojo.Error error;
            dojo.client_remove_entities_to_sync(client, entitiesPtr, (nuint)entities.Length, &error);

            if (error.message != string.Empty)
            {
                throw new Exception(error.message);
            }
        }

        public void OnEntityStateUpdate(dojo.Keys query, dojo.FnPtr_Void callback)
        {
            dojo.client_on_entity_state_update(client, &query, callback);
        }

        public void StartSubscription()
        {
            dojo.Error error;
            dojo.client_start_subscription(client, &error);

            if (error.message != string.Empty)
            {
                throw new Exception(error.message);
            }
        }
    }
}