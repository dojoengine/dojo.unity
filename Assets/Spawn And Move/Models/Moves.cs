using System;
using System.Linq;
using System.Reflection;
using Dojo;
using Dojo.Starknet;
using Dojo.Torii;
using UnityEngine;
using Enum = Dojo.Starknet.Enum;

// Type definition for `dojo_examples::models::Direction` enum
public abstract record Direction() : Enum {
    public record None() : Direction;
    public record Left() : Direction;
    public record Right() : Direction;
    public record Up() : Direction;
    public record Down() : Direction;
}

public class Moves : ModelInstance
{
    [ModelField("player")]
    public FieldElement player;
    [ModelField("remaining")]
    public byte remaining;
    [ModelField("last_direction")]
    public Direction lastDirection;

    void Start() {
    }

    void Update() {
    }

    public override void OnUpdate(Model model)
    {
        base.OnUpdate(model);
    }
}