using System.Collections.Generic;
using Dojo;
using Dojo.Torii;
using UnityEngine;

public class PlayerHandler : EntityHandler {
    public override EntityInstance HandleEntityInstance(GameObject entity, string key, Dictionary<string, Model> models) {
        // check that keys in _models are in models
        foreach (var model in Player._models) {
            if (!models.ContainsKey(model)) {
                return null;
            }
        }
        
        var instance = entity.AddComponent<Player>();
        instance.key = key;
        instance.models = models;

        return instance;
    }
}