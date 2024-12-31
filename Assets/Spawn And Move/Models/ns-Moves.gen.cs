// Generated by dojo-bindgen on Mon, 4 Nov 2024 23:36:28 +0000. Do not modify this file manually.
using System;
using Dojo;
using Dojo.Starknet;
using System.Reflection;
using System.Linq;
using System.Collections.Generic;
using Enum = Dojo.Starknet.Enum;

// Type definition for `dojo_examples::models::MovesValue` struct
[Serializable]
public struct MovesValue
{
    public byte remaining;
    public Direction last_direction;
}

// Type definition for `dojo_examples::models::Direction` enum
public abstract record Direction() : Enum
{
    public record None() : Direction;
    public record Left() : Direction;
    public record Right() : Direction;
    public record Up() : Direction;
    public record Down() : Direction;
}


// Model definition for `dojo_examples::models::Moves` model
public class ns_Moves : ModelInstance
{
    [ModelField("player")]
    public FieldElement player;

    [ModelField("remaining")]
    public byte remaining;

    [ModelField("last_direction")]
    public Direction last_direction;

    // Start is called before the first frame update
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
    }
}

