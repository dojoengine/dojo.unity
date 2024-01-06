using System;
using System.Linq;
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
        public int SynchronizeEntities()
        {
            var query = new dojo.Query
            {
                clause = new dojo.COptionClause
                {
                    tag = dojo.COptionClause_Tag.NoneClause,
                },
                limit = limit,
            };

            var entities = worldManager.toriiClient.Entities(query);
            foreach (var entity in entities)
            {
                SpawnEntity(entity.HashedKeys, entity.Models.Values.ToArray());
            }

            return entities.Count;
        }
        
        // Spawn an Entity game object from a dojo.Entity
        private GameObject SpawnEntity(FieldElement felt, Model[] entityModels)
        {
            // bytes to hex string
            var entityGameObject = worldManager.AddEntity(felt.Hex());
            foreach (var entityModel in entityModels)
            {
                var model = models.FirstOrDefault(m => m.GetType().Name == entityModel.Name);
                if (model == null)
                {
                    Debug.LogError($"Model {entityModel.Name} not found");
                    continue;
                }

                var component = (ModelInstance)entityGameObject.AddComponent(model.GetType());
                component.Initialize(entityModel);
            }

            OnEntitySpawned?.Invoke(entityGameObject);
            return entityGameObject;
        }

        // Handles spawning / updating entities as they are updated from the dojo world
        private void HandleEntityUpdate(FieldElement key, Model[] entityModels)
        {
            var entity = GameObject.Find(key.Hex());
            if (entity == null)
            {
                // should we fetch the entity here?
                entity = SpawnEntity(key, entityModels);
            }
            
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
            worldManager.toriiClient.RegisterEntityStateUpdates(new dojo.FieldElement[]{});
            ToriiEvents.Instance.OnEntityUpdated += HandleEntityUpdate;
        }
    }
}