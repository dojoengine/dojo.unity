using System;
using System.Linq;
using Dojo;
using Dojo.Torii;
using dojo_bindings;
using UnityEngine;

public class Position : ModelInstance
{
    public dojo.FieldElement player;
    // public Vector2Int position => new Vector2Int((int)x, (int)y);
    public UInt32 x;
    public UInt32 y;

    public override void Initialize(Model model)
    {
        player = model.members["player"].ty.ty_primitive.contract_address;
        x = model.members["vec"].ty.ty_struct.children[0].ty.ty_primitive.u32;
        y = model.members["vec"].ty.ty_struct.children[1].ty.ty_primitive.u32;
    }
}