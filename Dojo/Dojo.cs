using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo
{
    // A managed type for the Ty structure
    // Frees the underlying dojo.Ty when the object is garbage collected
    public unsafe class Ty(dojo.Ty* ty)
    {
        public dojo.Ty_Tag tag => ty->tag;
        public dojo.Struct struct_ => ty->ty_struct;
        public dojo.Enum enum_ => ty->ty_enum;
        public dojo.Primitive primitive => ty->ty_primitive;
        public Span<dojo.Ty> tuple => ty->ty_tuple;

        ~Ty()
        {
            dojo.ty_free(ty);
        }
    }
    
    // A managed type for Entity
    // Frees the underlying dojo.Entity when the object is garbage collected
    public unsafe class Entity(dojo.Entity* entity)
    {
        public dojo.FieldElement key => entity->key;
        public Span<dojo.Model> models => entity->models;

        ~Entity()
        {
            dojo.entity_free(entity);
        }
    }
    
    public unsafe class ToriiClient
    {
        private dojo.ToriiClient* client;
        public ToriiClient(string toriiUrl, string rpcUrl, string world, dojo.KeysClause[] entities)
        {
            CString ctoriiUrl = CString.FromString(toriiUrl);
            CString crpcUrl = CString.FromString(rpcUrl);
            CString cworld = CString.FromString(world);
            dojo.KeysClause* entitiesPtr;

            fixed (dojo.KeysClause* ptr = &entities[0])
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
            // TODO: implement a managed type for WorldMetadata too
            dojo.WorldMetadata worldMetadata = dojo.client_metadata(client);

            return worldMetadata;
        }

        public Ty Entity(dojo.KeysClause query)
        {
            dojo.Error error;
            dojo.Ty* entity = dojo.client_entity(client, &query, &error);

            if (error.message != string.Empty)
            {
                throw new Exception(error.message);
            }

            // we instantiate a new managed Ty object
            // which will free the underlying c ty when it is garbage collected
            return new Ty(entity);
        }

        public ReadOnlySpan<dojo.Entity> Entities(dojo.Query query)
        {
            dojo.Error error;
            dojo.CArray_Entity entities = dojo.client_entities(client, &query, &error);
            if (error.message != string.Empty)
            {
                throw new Exception(error.message);
            }
            
            return new Span<dojo.Entity>(entities.data, (int)entities.data_len);
        }
        
        public ReadOnlySpan<dojo.KeysClause> SubscribedEntities()
        {
            dojo.CArray_KeysClause entities = dojo.client_subscribed_entities(client);
            // NOTE: we could copy the data into a managed array
            // and free the c array from rust.
            // however, it is slower
            // dojo.EntityQuery[] arr = new Span<dojo.EntityQuery>(entities->data, (int)entities->data_len).ToArray();
            // dojo.carray_free(entities);

            // this just returns a span of the carray data
            // freeing the c array is up to the caller
            // dojo.carray_free(entities);
            return new Span<dojo.KeysClause>(entities.data, (int)entities.data_len);
        }

        public void AddEntitiesToSync(dojo.KeysClause[] entities)
        {
            dojo.KeysClause* entitiesPtr;

            fixed (dojo.KeysClause* ptr = &entities[0])
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

        public void RemoveEntitiesToSync(dojo.KeysClause[] entities)
        {
            dojo.KeysClause* entitiesPtr;

            fixed (dojo.KeysClause* ptr = &entities[0])
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

        public void OnEntityStateUpdate(dojo.KeysClause query, dojo.FnPtr_Void callback)
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