using System;
using System.Collections.Generic;
using System.Linq;
using dojo_bindings;

namespace Dojo.Torii
{
    // A managed type for Entity
    // Frees the underlying dojo.Entity when the object is garbage collected
    public unsafe class Entity
    {
        private readonly dojo.Entity* _entity;

        public Entity(dojo.Entity* entity)
        {
            _entity = entity;
        }

        public dojo.FieldElement key => _entity->key;
        public Dictionary<string, Model> models
        {
            get
            {
                _entity->models.ToArray().Select(m => new KeyValuePair<string, Model>(m.name, new Model(m))).ToArray();

                return new Dictionary<string, Model>(models);
            }
        }

        ~Entity()
        {
            dojo.entity_free(_entity);
        }
    }
}