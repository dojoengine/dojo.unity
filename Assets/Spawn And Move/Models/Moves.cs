using System;
using System.Linq;
using System.Reflection;
using Dojo;
using Dojo.Starknet;
using Dojo.Torii;

// Type definition for `dojo_examples::models::Direction` enum
public abstract record Direction() {
    public record None() : Direction;
    public record Left() : Direction;
    public record Right() : Direction;
    public record Up() : Direction;
    public record Down() : Direction;

    public static readonly Type[] DirectionTypes = typeof(Direction).GetNestedTypes(BindingFlags.Public)
        .OrderBy(t => t.MetadataToken)
        .ToArray();

    public static int GetIndex(Direction value) {
        return Array.IndexOf(DirectionTypes, value.GetType());
    }
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