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
        public SynchronizationMaster synchronizationMaster;
        public ToriiClient toriiClient;
        
        // Start is called before the first frame update
        void Start()
        {
            // generate the keys clauses for all 
            // of our entities and their models
            var entities = new dojo.KeysClause[]
            {
                new dojo.KeysClause
                {
                    model = "Moves",
                    keys = new string[]{"0x0"}
                }
            };
            // foreach (var entity in Entities())
            // {
            //     if (!entity.activeSelf) continue;
            //
            //     var instance = entity.GetComponent<EntityInstance>();
            //     // check if the model is in keys already and add it if its not
            //     foreach (var model in instance.models)
            //     {
            //         entities.Add(new dojo.KeysClause{
            //             model = model,
            //             keys = new[] {instance.key}
            //         });
            //     }
            // }
            
            // create the torii client and start subscription service
            toriiClient = new ToriiClient(toriiUrl, rpcUrl, worldAddress, entities);
            toriiClient.StartSubscription();

            var subEntities = toriiClient.SubscribedEntities();

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
