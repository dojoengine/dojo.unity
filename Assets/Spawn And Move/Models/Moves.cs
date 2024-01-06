using Dojo;
using Dojo.Torii;
using dojo_bindings;
using UnityEngine;

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
    public dojo.FieldElement player;
    public byte remaining;
    public Direction lastDirection;

    public override void Initialize(Model model) {
        player = (dojo.FieldElement)model.Members["player"];
        remaining = (byte)model.Members["remaining"];
        lastDirection = (Direction)(byte)model.Members["last_direction"];
        // player = model.Members["player"].Value.primitive.contract_address;
        // remaining = model.Members["remaining"].Value.primitive.u8;
        // lastDirection = (Direction)model.Members["last_direction"].Value.primitive.u8;
    }
}