using System;
using Dojo;
using Dojo.Starknet;
using Dojo.Torii;
using UnityEngine;

[Serializable]
public struct Vec2
{
    public uint x;
    public uint y;
}

public class Position : ModelInstance
{
    [ModelField("player")]
    public FieldElement player;
    [ModelField("vec")]
    public Vec2 position;


    // component fields
    public TextMesh textTag;
    public string shortPlayerAddress;

    void Start()
    {
        var target = new Vector3(position.x, 0, position.y);
        gameObject.transform.position = target;
    }

    void Update()
    {
        // our curent position is gameObject.transform.position
        // move towards the target position
        var step = 3.0f * Time.deltaTime;
        // scale down our positions
        Vector3 oldPosition = gameObject.transform.position;
        var target = new Vector3(position.x, oldPosition.y, position.y);
        gameObject.transform.position = Vector3.MoveTowards(gameObject.transform.position, target, step);

        // if we are close enough to the target position, snap to it
        if (Vector3.Distance(gameObject.transform.position, target) < 0.001f)
        {
            gameObject.transform.position = target;
        }
    }

    public override void OnUpdate(Model model)
    {
        base.OnUpdate(model);
    }
}