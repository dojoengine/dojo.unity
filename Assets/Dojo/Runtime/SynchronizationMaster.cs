using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dojo.Starknet;
using Dojo.Torii;
using dojo_bindings;
using UnityEngine;
using UnityEngine.Events;

namespace Dojo
{
    public class SynchronizationMaster : MonoBehaviour
    {
        public WorldManager worldManager;

        // Maximum number of entities to synchronize
        public uint limit = 100;

        // Handle entities that get synchronized
        public ModelInstance[] models;

        public UnityEvent<List<GameObject>> OnSynchronized;
        public UnityEvent<GameObject> OnEntitySpawned;

        // Start is called before the first frame update
        void Start()
        {
            // We don't want our model definitions to be active.
            // Only used as templates for the actual entities to use.
            foreach (var model in models)
            {
                model.enabled = false;
            }
        }

        // Update is called once per frame
        void Update()
        {
        }

        // Fetch all entities from the dojo world and spawn them.
#if UNITY_WEBGL && !UNITY_EDITOR
        public async Task<int> SynchronizeEntities()
#else
        public int SynchronizeEntities()
#endif
        {
            var query = new dojo.Query
            {
                clause = new dojo.COptionClause
                {
                    tag = dojo.COptionClause_Tag.NoneClause,
                },
                limit = limit,
            };

#if UNITY_WEBGL && !UNITY_EDITOR
            var entities = await worldManager.wasmClient.Entities((int)limit, 0);
#else
            var entities = worldManager.toriiClient.Entities(query);
#endif

            var entityGameObjects = new List<GameObject>();
            foreach (var entity in entities)
            {
                entityGameObjects.Add(SpawnEntity(entity.HashedKeys, entity.Models.Values.ToArray()));
            }

            OnSynchronized?.Invoke(entityGameObjects);
            return entities.Count;
        }

        // Spawn an Entity game object from a dojo.Entity
        private GameObject SpawnEntity(FieldElement hashedKeys, Model[] entityModels)
        {
            // Add the entity to the world.
            var entityGameObject = worldManager.AddEntity(hashedKeys.Hex());
            // Initialize each one of the entity models
            foreach (var entityModel in entityModels)
            {
                // Check if we have a model definition for this entity model
                var model = models.FirstOrDefault(m => m.GetType().Name == entityModel.Name);
                if (model == null)
                {
                    Debug.LogError($"Model {entityModel.Name} not found");
                    continue;
                }

                // Add the model component to the entity
                var component = (ModelInstance)entityGameObject.AddComponent(model.GetType());
                component.Initialize(entityModel);
            }

            OnEntitySpawned?.Invoke(entityGameObject);
            return entityGameObject;
        }

        // Handles spawning / updating entities as they are updated from the dojo world
        private void HandleEntityUpdate(FieldElement hashedKeys, Model[] entityModels)
        {
            // Get the entity game object
            var entity = GameObject.Find(hashedKeys.Hex());
            if (entity == null)
            {
                // should we fetch the entity here?
                entity = SpawnEntity(hashedKeys, entityModels);
            }

            // Update each one of the entity models
            foreach (var entityModel in entityModels)
            {
                var component = entity.GetComponent(entityModel.Name);
                if (component == null)
                {
                    // TODO: decouple?
                    var model = models.FirstOrDefault(m => m.GetType().Name == entityModel.Name);
                    if (model == null)
                    {
                        Debug.LogError($"Model {entityModel.Name} not found");
                        continue;
                    }

                    // we dont need to initialize the component
                    // because it'll get updated
                    component = (ModelInstance)entity.AddComponent(model.GetType());
                }

                // update component with new model data
                ((ModelInstance)component).OnUpdate(entityModel);
            }
        }

        // Register our entity callbacks
        public void RegisterEntityCallbacks()
        {
            #if UNITY_WEBGL && !UNITY_EDITOR
            worldManager.wasmClient.RegisterEntityStateUpdates(new FieldElement[] { });
            #else
            worldManager.toriiClient.RegisterEntityStateUpdates(new dojo.FieldElement[] { });
            #endif
            ToriiEvents.Instance.OnEntityUpdated += HandleEntityUpdate;
        }
    }
}