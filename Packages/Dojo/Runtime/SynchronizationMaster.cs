using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Dojo.Torii;
using dojo_bindings;
using PlasticGui;
using UnityEngine;

namespace Dojo
{
    public class SynchronizationMaster : MonoBehaviour
    {
        public WorldManager worldManager;

        // Maximum number of entities to synchronize
        public uint limit = 100;

        // Handle entities that get synchronized
        public ModelInstance[] models;

        // Start is called before the first frame update
        void Start()
        {
        }

        // Update is called once per frame
        void Update()
        {
        }

        public int SynchronizeEntities()
        {
            var query = new dojo.Query
            {
                clause = new dojo.COption_Clause
                {
                    tag = dojo.COption_Clause_Tag.None_Clause,
                },
                limit = limit,
            };

            var entities = worldManager.toriiClient.Entities(query);
            // TODO: cleanup
            foreach (var entity in entities)
            {
                // bytes to hex string
                var key = "0x" + BitConverter.ToString(entity.key.data.ToArray()).Replace("-", "").ToLower();
                var entityGameObject = worldManager.AddEntity(key);
                foreach (var entityModel in entity.models.Values)
                {
                    var model = models.FirstOrDefault(m => m.GetType().Name == entityModel.name);
                    if (model == null)
                    {
                        Debug.LogError($"Model {entityModel.name} not found");
                        continue;
                    }

                    var component = (ModelInstance)entityGameObject.AddComponent(model.GetType());
                    component.Initialize(entityModel);
                }
            }

            return entities.Count;
        }

        public void RegisterEntityCallbacks()
        {
            Dojo.Torii.ToriiClient.OnEntityStateUpdateDelegate callback = (key, models) =>
            {
                var name = "0x" + BitConverter.ToString(key.data.ToArray()).Replace("-", "").ToLower();
                var entity = worldManager.Entity(name);

                foreach (var model in models)
                {
                    var modelInstance = (ModelInstance)entity.GetComponent(model.name);
                    if (modelInstance == null)
                    {
                        Debug.LogError($"ModelInstance not found for {model.name}");
                        continue;
                    }

                    modelInstance.OnUpdated(model);
                }
            };

            worldManager.toriiClient.OnEntityStateUpdate(Array.Empty<dojo.FieldElement>(), callback);
        }
    }
}