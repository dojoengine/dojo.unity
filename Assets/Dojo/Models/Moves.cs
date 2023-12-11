using Dojo.Torii;
using dojo_bindings;

public enum Direction
{
    None,
    Left,
    Right,
    Up,
    Down,

}

public class Moves : Model
{
    public dojo.FieldElement player => members["player"].ty.ty_primitive.contract_address;
    public byte remaining => members["remaining"].ty.ty_primitive.u8;
    public Direction lastDirection => (Direction)members["last_direction"].ty.ty_primitive.u8;


    public Moves(Model model) : base(model.model)
    {
    }
}