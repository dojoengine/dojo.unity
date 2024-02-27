using System.Numerics;
using Dojo;
using Dojo.Starknet;
using Dojo.Torii;

public enum Direction
{
    None,
    Left,
    Right,
    Up,
    Down,

}

public class Moves : ModelInstance
{
    [ModelField("player")]
    public FieldElement player;
    [ModelField("remaining")]
    public byte remaining;
    [ModelField("last_direction")]
    public Direction lastDirection;

    void Start() {

    }

    void Update() {

    }

    public override void OnUpdate(Model model)
    {
        base.OnUpdate(model);
    }
}