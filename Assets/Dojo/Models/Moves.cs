using dojo_bindings;

public enum Direction {
    Up,
    Down,
    Left,
    Right
}

public class Moves : Dojo.Torii.Model {
    public dojo.FieldElement contractAddress => members["contractAddress"].ty.ty_primitive.contract_address;
    public byte remaining => members["remaining"].ty.ty_primitive.u8;
    public Direction direction => (Direction)members["direction"].ty.ty_primitive.u8;

    
    public Moves(dojo.Model model) : base(model) {
    }
}