using System;
using dojo_bindings;

public class Position : Dojo.Torii.Model {
    public UInt32 x => members["x"].ty.ty_primitive.u32;
    public UInt32 y => members["y"].ty.ty_primitive.u32;

    public Position(dojo.Model model) : base(model) {

    }
}