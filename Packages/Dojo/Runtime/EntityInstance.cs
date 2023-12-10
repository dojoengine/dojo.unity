using System.Collections;
using System.Collections.Generic;
using Dojo.Torii;
using dojo_bindings;
using UnityEngine;

namespace Dojo
{
    public class EntityInstance : MonoBehaviour
    {
        public string key;
        public Dictionary<string, Model> models;

        // Start is called before the first frame update
        void Start()
        {
            
        }

        // Update is called once per frame
        void Update()
        {
        }

        // Called when the entity state is updated
        // model: the model that was updated
        public virtual void OnEntityStateUpdate()
        {
            Debug.Log("EntityInstance.OnEntityStateUpdate");
        }
    }
}