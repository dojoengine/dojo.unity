using System.Collections;
using System.Collections.Generic;
using Dojo.Torii;
using UnityEngine;

namespace Dojo
{
    public class ModelHandler
    {
        public virtual EntityInstance HandleModel(GameObject entity, string key, Dictionary<string, Model> models) {
            var instance = entity.AddComponent<EntityInstance>();
            instance.key = key;
            instance.models = models;

            return instance;
        }
    }
}
