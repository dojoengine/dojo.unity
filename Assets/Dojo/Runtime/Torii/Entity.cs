using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Dojo.Starknet;
using dojo_bindings;

namespace Dojo.Torii
{
    // A managed type for Entity
    // Frees the underlying dojo.Entity when the object is garbage collected
    public class Entity
    {
        public Dictionary<string, Model> Models { get; }
        public FieldElement HashedKeys { get; }
        public Entity(FieldElement hashedKeys, Dictionary<string, Model> models)
        {
            HashedKeys = hashedKeys;
            Models = models;
        }

        public Entity(dojo.Entity entity)
        {
            HashedKeys = new FieldElement(entity.hashed_keys);
            Models = new Dictionary<string, Model>(entity.models.ToArray().Select(m => new KeyValuePair<string, Model>(m.name, new Model(m))));

        }

        // freeing the entity is naive. if we copy the entity we will double free
        // and seg fault.
        // ~Entity()
        // {
        //     dojo.entity_free(_entity);
        // }
    }
}