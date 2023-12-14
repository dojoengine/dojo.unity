using System.Collections;
using System.Collections.Generic;
using Dojo;
using Unity.VisualScripting;
using UnityEngine;

public class InitEntities : MonoBehaviour
{
    public WorldManager worldManager;
    // Start is called before the first frame update
    void Start()
    {
        foreach (var entity in worldManager.Entities())
        {
            var capsule = GameObject.CreatePrimitive(PrimitiveType.Capsule);
            // change color of capsule to a random color
            capsule.GetComponent<Renderer>().material.color = Random.ColorHSV();
            capsule.transform.parent = entity.transform;
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
