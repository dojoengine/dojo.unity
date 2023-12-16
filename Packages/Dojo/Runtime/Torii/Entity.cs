using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using dojo_bindings;

namespace Dojo.Torii
{
    // A managed type for Entity
    // Frees the underlying dojo.Entity when the object is garbage collected
    public class Entity
    {
        private Dictionary<string, Model> _models;
        private dojo.FieldElement _id;
        
        public Entity(dojo.Entity entity)
        {
            _id = entity.id;
            _models = new Dictionary<string, Model>(entity.models.ToArray().Select(m => new KeyValuePair<string, Model>(m.name, new Model(m))));
            
        }

        public dojo.FieldElement id => _id;
        public Dictionary<string, Model> models => _models;

        ~Entity()
        {
            // dojo.entity_free(_entity);
        }
    }
}