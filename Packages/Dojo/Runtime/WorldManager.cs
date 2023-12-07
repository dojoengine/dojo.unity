using System;
using System.Collections;
using System.Collections.Generic;
using UnityEditor.PackageManager;
using UnityEngine;

namespace Dojo
{
    public class WorldManager : MonoBehaviour
    {
        public string worldAddress;
        public ClientManager clientManager;

        // Start is called before the first frame update
        void Start()
        {
            
        }

        // Update is called once per frame
        void Update()
        {
        
        }

        public void AddEntity(string key, string[] models)
        {
            var entity = new GameObject(key);
            var instance = entity.AddComponent<EntityInstance>();
            instance.key = key;
            instance.models = models;
        }

        public void RemoveEntity(string key)
        {
            var entity = GameObject.Find(key);
            if (entity != null)
            {
                Destroy(entity);
            }
        }
    }
}
