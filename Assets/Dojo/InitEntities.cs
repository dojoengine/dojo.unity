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
        worldManager.synchronizationMaster.OnEntitySpawned += InitEntity;
        foreach (var entity in worldManager.Entities())
        {
            InitEntity(entity);
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void InitEntity(GameObject entity)
    {
        var capsule = GameObject.CreatePrimitive(PrimitiveType.Capsule);
        // change color of capsule to a random color
        capsule.GetComponent<Renderer>().material.color = Random.ColorHSV();
        capsule.transform.parent = entity.transform;
    }
}
