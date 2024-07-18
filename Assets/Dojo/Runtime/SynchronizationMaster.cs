using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
        private ModelInstance[] _models;
        // Returns all of the model definitions
        private ModelInstance[] models => _models ??= LoadModels();

        public UnityEvent<List<GameObject>> OnSynchronized;
        public UnityEvent<GameObject> OnEntitySpawned;
        public UnityEvent<ModelInstance> OnEventMessage;

        // Awake is called when the script instance is being loaded.
        void Awake()
        {
            // We don't want our model definitions to be active.
            // Only used as templates for the actual entities to use.
            foreach (var model in models)
            {
                model.enabled = false;
            }
        }

        // Fetch all entities from the dojo world and spawn them.
        public async Task<int> SynchronizeEntities()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            var entities = await worldManager.wasmClient.Entities(worldManager.dojoConfig.query);
#else
            var entities = await Task.Run(() => worldManager.toriiClient.Entities(worldManager.dojoConfig.query));
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
                string[] parts = entityModel.Name.Split('-');
                string @namespace = parts[0];
                string name = parts[1];

                // Check if we have a model definition for this entity model
                var model = models.FirstOrDefault(m => m.GetType().Name == name && m.GetType().Namespace == @namespace);
                if (model == null)
                {
                    Debug.LogWarning($"Model {entityModel.Name} not found");
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
                entity = SpawnEntity(hashedKeys, entityModels);
                // We don't need to update the entity models
                return;
            }

            // Update each one of the entity models
            foreach (var entityModel in entityModels)
            {
                var component = entity.GetComponent(entityModel.Name);
                if (component == null)
                {
                    string[] parts = entityModel.Name.Split('-');
                    string @namespace = parts[0];
                    string name = parts[1];

                    // TODO: decouple?
                    var model = models.FirstOrDefault(m => m.GetType().Name == name && m.GetType().Namespace == @namespace);
                    if (model == null)
                    {
                        Debug.LogWarning($"Model {entityModel.Name} not found");
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

        private void HandleEventMessage(FieldElement hashedKeys, Model[] entityModels)
        {
            foreach (var entityModel in entityModels)
            {
                var model = models.FirstOrDefault(m => m.GetType().Name == entityModel.Name);
                if (model == null)
                {
                    Debug.LogWarning($"Model {entityModel.Name} not found");
                    continue;
                }

                model.OnUpdate(entityModel);
                OnEventMessage?.Invoke(model);
            }
        }

        // Register our entity callbacks
        public void RegisterEntityCallbacks()
        {
            ToriiEvents.Instance.OnEntityUpdated += HandleEntityUpdate;
        }

        // Register event message callbacks
        public void RegisterEventMessageCallbacks()
        {
            ToriiEvents.Instance.OnEventMessageUpdated += HandleEventMessage;
        }

        private ModelInstance[] LoadModels()
        {
            List<ModelInstance> models = new();

            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

            foreach (Assembly assembly in assemblies)
            {
                var modelTypes = assembly.GetTypes()
                    .Where(t => typeof(ModelInstance).IsAssignableFrom(t) && !t.IsAbstract);

                foreach (Type modelType in modelTypes)
                {
                    models.Add((ModelInstance)gameObject.AddComponent(modelType));
                }
            }

            return models.ToArray();
        }
    }
}