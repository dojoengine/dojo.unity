using System.Diagnostics;
using System.Linq;
using Dojo;
using Dojo.Torii;
using UnityEngine;
using Debug = UnityEngine.Debug;

public class Player : EntityInstance {
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
}