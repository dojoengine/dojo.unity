using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Dojo;
using Dojo.Torii;
using JetBrains.Annotations;
using UnityEngine;
using Debug = UnityEngine.Debug;

public class Player : EntityInstance, IEntityHandler {
    public Position position => new Position(models["Position"].model);
    public Moves moves => new Moves(models["Moves"].model);

    void Start() {
        Debug.Log("Player.Start");
        Debug.Log($"position: {position.x}, {position.y}");
        Debug.Log($"moves: {moves.lastDirection}");
    }

    void Update() {
    }

    public override void OnEntityStateUpdate() {
        base.OnEntityStateUpdate();
        Debug.Log("Player.OnEntityStateUpdate");
        // Debug.Log($"position: {position.x}, {position.y}");
    }

    [CanBeNull]
    public static EntityInstance HandleEntityInstance(GameObject entity, string key, Dictionary<string, Model> models) {
        if (!(models.ContainsKey("Moves") && models.ContainsKey("Position"))) {
            return null;
        }

        var instance = entity.AddComponent<Player>();
        instance.key = key;
        instance.models = models;

        return instance;
    }
}