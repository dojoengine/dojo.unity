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
        public EntityHandler entityHandler;

        // Start is called before the first frame update
        void Start()
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
            foreach (var entity in entities)
            {
                // bytes to hex string
                var key = "0x" + BitConverter.ToString(entity.key.data.ToArray()).Replace("-", "").ToLower();
                var entityGameObject = worldManager.AddEntity(key);
                entityHandler.HandleEntityInstance(entityGameObject, key, entity.models);
            }
        }

        // Update is called once per frame
        void Update()
        {
        }
    }
}