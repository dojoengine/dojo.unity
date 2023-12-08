using System;
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
        public Span<dojo.Model> models => _entity->models;

        ~Entity()
        {
            dojo.entity_free(_entity);
        }
    }
}