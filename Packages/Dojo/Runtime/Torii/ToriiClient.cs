using System;
using System.Collections;
using System.Collections.Generic;
using bottlenoselabs.C2CS.Runtime;
using UnityEngine;
using dojo_bindings;
using JetBrains.Annotations;

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

        var result = dojo.client_new(ctoriiUrl, crpcUrl, cworld, entitiesPtr, (nuint)entities.Length);
        if (result.tag == dojo.Result_____ToriiClient_Tag.Err_____ToriiClient)
        {
            throw new Exception(result.err.message);
        }
        
        client = result.ok;
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
    public Ty Entity(dojo.KeysClause query)
    {
        dojo.Result_COption_Ty result = dojo.client_entity(client, &query);
        if (result.tag == dojo.Result_COption_Ty_Tag.Err_COption_Ty)
        {
            throw new Exception(result.err.message);
        }

        // can be None - nullable
        if (result.ok.tag == dojo.COption_Ty_Tag.None_Ty)
        {
            return null;
        }
        
        // we instantiate a new managed Ty object
        // which will free the underlying c ty when it is garbage collected
        return new Ty(&result.ok.some);
    }

    public ReadOnlySpan<dojo.Entity> Entities(dojo.Query query)
    {
        dojo.Result_CArray_Entity result = dojo.client_entities(client, &query);
        if (result.tag == dojo.Result_CArray_Entity_Tag.Err_CArray_Entity)
        {
            throw new Exception(result.err.message);
        }

        return result.ok;
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

        var result = dojo.client_add_entities_to_sync(client, entitiesPtr, (nuint)entities.Length);
        if (result.tag == dojo.Result_bool_Tag.Err_bool)
        {
            throw new Exception(result.err.message);
        }
    }

    public void RemoveEntitiesToSync(dojo.KeysClause[] entities)
    {
        dojo.KeysClause* entitiesPtr;

        fixed (dojo.KeysClause* ptr = &entities[0])
        {
            entitiesPtr = ptr;
        }

        var result = dojo.client_remove_entities_to_sync(client, entitiesPtr, (nuint)entities.Length);
        if  (result.tag == dojo.Result_bool_Tag.Err_bool)
        {
            throw new Exception(result.err.message);
        }
    }

    public void OnEntityStateUpdate(dojo.KeysClause query, dojo.FnPtr_Void callback)
    {
        dojo.client_on_entity_state_update(client, &query, callback);
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