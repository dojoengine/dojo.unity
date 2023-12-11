using System;
using System.Linq;
using dojo_bindings;
using UnityEngine;

public class Position : Dojo.Torii.Model {
    public dojo.FieldElement player => members["player"].ty.ty_primitive.contract_address;
    // public Vector2Int position => new Vector2Int((int)x, (int)y);
    public UInt32 x => members["vec"].ty.ty_struct.children[0].ty.ty_primitive.u32;
    public UInt32 y => members["vec"].ty.ty_struct.children[1].ty.ty_primitive.u32;

    public Position(dojo.Model model) : base(model) {
    }
}