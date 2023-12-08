using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using dojo_bindings;
using UnityEditor.PackageManager;
using UnityEngine;

namespace Dojo
{
    public class WorldManager : MonoBehaviour
    {
        [Header("RPC")]
        public string toriiUrl = "http://localhost:8080";
        public string rpcUrl = "http://localhost:5050";
        [Header("World")]
        public string worldAddress;
        private ToriiClient toriiClient;

        // Start is called before the first frame update
        void Start()
        {
            // we make a dictionary of our models and the keys that use them
            Dictionary<string, string[]> keys = new Dictionary<string, string[]>();
            foreach (var entity in Entities())
            {
                var instance = entity.GetComponent<EntityInstance>();
                // check if the model is in keys already and add it if its not
                foreach (var model in instance.models)
                {
                    if (!keys.ContainsKey(model))
                    {
                        keys.Add(model, new[] {instance.key});
                    }
                    keys[model].Append(instance.key);
                }
            }

            // convert the dictionary to a KeysClause array
            var entities = new List<dojo.KeysClause>();
            foreach (var model in keys)
            {
                entities.Add(new dojo.KeysClause{
                    model = model.Key,
                    keys = model.Value
                });
            }
            
            // create the torii client and start subscription service
            toriiClient = new ToriiClient(toriiUrl, rpcUrl, worldAddress, entities.ToArray());
            toriiClient.StartSubscription();

            // add entities to sync
            toriiClient.AddEntitiesToSync(entities.ToArray());

            // register entity callbacks
            foreach (var entity in Entities())
            {
                RegisterEntityCallback(entity.name);
            }
        }

        // Update is called once per frame
        void Update()
        {

        }

        public void RegisterEntityCallback(string name) {
            var entity = Entity(name);
            var instance = entity.GetComponent<EntityInstance>();

            foreach (var model in instance.models)
            {
                toriiClient.OnEntityStateUpdate(new dojo.KeysClause{
                    model = model,
                    keys = new[] {instance.key}
                }, new dojo.FnPtr_Void(instance.OnEntityStateUpdate));
            }
        }

        public GameObject Entity(string name)
        {
            var entity = transform.Find(name);
            if (entity == null)
            {
                Debug.LogError($"Entity {name} not found");
                return null;
            }

            var instance = entity.GetComponent<EntityInstance>();
            if (instance == null)
            {
                Debug.LogError($"Entity {name} does not have an EntityInstance component");
                return null;
            }

            return entity.gameObject;
        }

        // return all children that have the EntityInstance component
        public GameObject[] Entities()
        {
            var entities = new List<GameObject>();
            foreach (Transform child in transform)
            {
                if (child.GetComponent<EntityInstance>() != null)
                {
                    entities.Add(child.gameObject);
                } else {
                    Debug.LogWarning($"Child {child.name} does not have an EntityInstance component");
                }
            }
            return entities.ToArray();
        }

        public GameObject AddEntity(string key, string[] models)
        {
            var entity = new GameObject(key);
            var instance = entity.AddComponent<EntityInstance>();
            instance.key = key;
            instance.models = models;

            entity.transform.parent = transform;
            return entity;
        }

        public void RemoveEntity(string key)
        {
            var entity = transform.Find(key);
            if (entity != null)
            {
                Destroy(entity.gameObject);
            }
        }
    }
}
