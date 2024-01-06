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
        // player = model.Members["player"].Value;
        // remaining = model.Members["remaining"].Value;
        // lastDirection = (Direction)model.Members["last_direction"].Value;
        player = model.Members["player"].Value.ty_primitive.contract_address;
        remaining = model.Members["remaining"].Value.ty_primitive.u8;
        lastDirection = (Direction)model.Members["last_direction"].Value.ty_primitive.u8;
    }
}