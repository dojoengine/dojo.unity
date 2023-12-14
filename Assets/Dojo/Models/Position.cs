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

    void Start()
    {
        var target = new Vector3(x, 0, y);
        gameObject.transform.position = target;
    }
    
    void Update()
    {
        // our curent position is gameObject.transform.position
        // move towards the target position
        var step = 3.0f * Time.deltaTime;
        // scale down our positions
        var target = new Vector3(x, 0, y);
        gameObject.transform.position = Vector3.MoveTowards(gameObject.transform.position, target, step);

        // if we are close enough to the target position, snap to it
        if (Vector3.Distance(gameObject.transform.position, target) < 0.001f)
        {
            gameObject.transform.position = target;
        }
    }

    public override void OnUpdated(Model model)
    {
        base.OnUpdated(model);
    }
}