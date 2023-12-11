using System.Collections;
using System.Collections.Generic;
using Dojo.Torii;
using JetBrains.Annotations;
using UnityEngine;

namespace Dojo
{
    public class EntityHandler : MonoBehaviour
    {
        // Start is called before the first frame update
        void Start()
        {
        
        }

        // Update is called once per frame
        void Update()
        {
        
        }

        [CanBeNull]
        public virtual EntityInstance HandleEntityInstance(GameObject entity, string key, Dictionary<string, Model> models)
        {
            var instance = entity.AddComponent<EntityInstance>();
            instance.key = key;
            instance.models = models;

            return instance;
        }
    }
}
