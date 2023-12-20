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
        player = model.members["player"].ty.ty_primitive.contract_address;
        remaining = model.members["remaining"].ty.ty_primitive.u8;
        lastDirection = (Direction)model.members["last_direction"].ty.ty_primitive.u8;
    }
}