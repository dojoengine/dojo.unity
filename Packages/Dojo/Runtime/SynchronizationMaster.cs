using System.Collections;
using System.Collections.Generic;
using System.Linq;
using dojo_bindings;
using PlasticGui;
using UnityEngine;

namespace Dojo
{
    public class SynchronizationMaster : MonoBehaviour
    {
        public WorldManager worldManager;

        // Models to synchronize
        public string[] models;

        // Maximum number of entities to synchronize
        public uint limit = 100;

        // Start is called before the first frame update
        void Start()
        {
            // var query = new dojo.Query
            // {
            //     clause = new dojo.Clause
            //     {
            //         tag = dojo.Clause_Tag.Composite,
            //         composite = 
            //     },
            //     limit = limit,
            // };

            // var entities = worldManager.toriiClient.Entities(query);
            // foreach (var entity in entities)
            // {
            //     // bytes to hex string
            //     var key = "0x" + entity.key.data.ToArray().Aggregate("", (s, b) => s + b.ToString("x2"));
            //     var models = entity.models.ToArray().Select(m => m.name).ToArray();
            //     worldManager.AddEntity(key, models);
            // }
        }

        // Update is called once per frame
        void Update()
        {
        }
    }
}