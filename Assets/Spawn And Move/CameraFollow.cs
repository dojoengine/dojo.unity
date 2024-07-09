using Dojo;
using dojo_examples;
using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public WorldManager worldManager;
    public float height = 10.0f; // height of the camera above the center point
    public float damping = 1.0f; // damping factor to smooth camera movement
    public float speed = 10.0f; // speed of camera movement


    void Update()
    {
        // all entities with the position model, 
        // we only want to consider those for "follow"
        var entities = worldManager.Entities<Position>();

        if (entities.Length > 0)
        {
            Vector3 centerPoint = GetCenterPoint(entities);
            Vector3 offset = new Vector3(0, height, -height);
            Vector3 desiredPosition = centerPoint + offset;
            Vector3 smoothedPosition = Vector3.Lerp(transform.position, desiredPosition, damping * Time.deltaTime);
            transform.position = smoothedPosition;

            transform.LookAt(centerPoint);
        }

        // Camera control with mouse
        if (Input.GetMouseButton(1))
        {
            float mouseX = Input.GetAxis("Mouse X");
            float mouseY = Input.GetAxis("Mouse Y");

            transform.RotateAround(GetCenterPoint(entities), Vector3.up, mouseX * speed);
            transform.RotateAround(GetCenterPoint(entities), transform.right, -mouseY * speed);
        }
    }

    Vector3 GetCenterPoint(GameObject[] entities)
    {
        if (entities.Length == 1)
        {
            return entities[0].transform.position;
        }

        var bounds = new Bounds(entities[0].transform.position, Vector3.zero);
        for (int i = 0; i < entities.Length; i++)
        {
            bounds.Encapsulate(entities[i].transform.position);
        }
        return bounds.center;
    }
}