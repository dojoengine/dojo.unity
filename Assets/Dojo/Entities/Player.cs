using Dojo;

public class Player : EntityInstance {
    public Position position => models["position"] as Position;
    public Moves moves => models["moves"] as Moves;

    public override void OnEntityStateUpdate() {
        base.OnEntityStateUpdate();
        UnityEngine.Debug.Log("Player.OnEntityStateUpdate");
        UnityEngine.Debug.Log($"position: {position.x}, {position.y}");
    }
}