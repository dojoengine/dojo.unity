using System.Diagnostics;
using dojo_bindings;
using Debug = UnityEngine.Debug;

public enum Direction
{
    None,
    Left,
    Right,
    Up,
    Down,

}

public class Moves : Dojo.Torii.Model
{
    public dojo.FieldElement player => members["player"].ty.ty_primitive.contract_address;
    public byte remaining => members["remaining"].ty.ty_primitive.u8;
    public Direction lastDirection => (Direction)members["last_direction"].ty.ty_primitive.u8;


    public Moves(dojo.Model model) : base(model)
    {
    }
}