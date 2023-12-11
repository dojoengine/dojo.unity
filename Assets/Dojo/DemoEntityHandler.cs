using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Dojo;
using Dojo.Torii;
using UnityEngine;

public class DemoEntityHandler : EntityHandler
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public override EntityInstance HandleEntityInstance(GameObject entity, string key, Dictionary<string, Model> models)
    {
        if (models.ContainsKey("Moves") && models.ContainsKey("Position")) {
            var instance = entity.AddComponent<Player>();
            instance.key = key;
            instance.models = models;
        }

        return base.HandleEntityInstance(entity, key, models);
    }
}
