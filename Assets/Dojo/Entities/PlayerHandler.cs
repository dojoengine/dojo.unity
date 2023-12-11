using System.Collections.Generic;
using Dojo;
using Dojo.Torii;
using UnityEngine;

public class PlayerHandler : EntityHandler {
    public override EntityInstance HandleEntityInstance(GameObject entity, string key, Dictionary<string, Model> models) {
        if (!(models.ContainsKey("Moves") && models.ContainsKey("Position"))) {
            return null;
        }
        
        var instance = entity.AddComponent<Player>();
        instance.key = key;
        instance.models = models;

        return instance;
    }
}