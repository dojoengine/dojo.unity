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

        // Models to synchronize
        public Dictionary<string, string> models;

        // Maximum number of entities to synchronize
        public uint limit = 100;

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
                var key = "0x" + entity.key.data.ToArray().Aggregate("", (s, b) => s + b.ToString("x2"));
                worldManager.AddEntity(key, entity.models);
            }
        }

        // Update is called once per frame
        void Update()
        {
        }
    }
}