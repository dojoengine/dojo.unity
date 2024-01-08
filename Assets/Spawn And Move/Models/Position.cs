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
        var target = new Vector3(position.x, 1, position.y);
        gameObject.transform.position = target;

        shortPlayerAddress = player.Hex().Substring(0, 8);

        // create a new GameObject for the text
        GameObject textObject = new GameObject("TextTag");
        textObject.transform.localScale = new Vector3(0.3f, 0.3f, 0.3f);
        textObject.transform.parent = transform;
        textObject.transform.localPosition = new Vector3(-1, 2, 0);

        // add a Text component to the new GameObject
        textTag = textObject.AddComponent<TextMesh>();

        // set the properties of the Text component
        textTag.font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
        textTag.color = Color.black;
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

        // calculate and display velocity
        Vector3 velocity = (gameObject.transform.position - oldPosition) / Time.deltaTime;
        textTag.text = $"{shortPlayerAddress}\nVelocity: {velocity.magnitude}";

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