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
        public DateTime CreatedAt { get; }
        public DateTime UpdatedAt { get; }
        public DateTime ExecutedAt { get; }
        public Entity(FieldElement hashedKeys, Dictionary<string, Model> models, DateTime createdAt, DateTime updatedAt, DateTime executedAt)
        {
            HashedKeys = hashedKeys;
            Models = models;
            CreatedAt = createdAt;
            UpdatedAt = updatedAt;
            ExecutedAt = executedAt;
        }

#if UNITY_WEBGL && !UNITY_EDITOR
        public Entity(WasmEntity entity)
        {
            HashedKeys = new FieldElement(entity.hashed_keys);

            var models = new Dictionary<string, Model>();
            foreach (var model in entity.models)
            {
                models.Add(model.Key, new Model(
                    model.Key,
                    model.Value.ToDictionary(
                        m => m.Key,
                        m => m.Value
                    )
                ));
            }
            Models = models;
            CreatedAt = DateTimeOffset.FromUnixTimeSeconds(entity.created_at).DateTime;
            UpdatedAt = DateTimeOffset.FromUnixTimeSeconds(entity.updated_at).DateTime;
            ExecutedAt = DateTimeOffset.FromUnixTimeSeconds(entity.executed_at).DateTime;
        }
#endif

        public Entity(dojo.Entity entity)
        {
            HashedKeys = new FieldElement(entity.hashed_keys);
            Models = new Dictionary<string, Model>(entity.models.ToArray().Select(m => new KeyValuePair<string, Model>(m.name, new Model(m))));
            CreatedAt = DateTimeOffset.FromUnixTimeSeconds((long)entity.created_at).DateTime;
            UpdatedAt = DateTimeOffset.FromUnixTimeSeconds((long)entity.updated_at).DateTime;
            ExecutedAt = DateTimeOffset.FromUnixTimeSeconds((long)entity.executed_at).DateTime;
        }

        // freeing the entity is naive. if we copy the entity we will double free
        // and seg fault.
        // ~Entity()
        // {
        //     dojo.entity_free(_entity);
        // }
    }
}