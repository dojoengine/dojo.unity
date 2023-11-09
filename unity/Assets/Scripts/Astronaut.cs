using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using StarkSharp.Platforms.Unity.RPC;
using StarkSharp.Connectors.Components;
using StarkSharp.Settings;

public class Astronaut : MonoBehaviour
{
    private Invoke invokeInstance = null;
    public float moveSpeed = 10f;
    public string playerAddress;
    public string playerKey;

    // This enum represents the movement directions.
    enum Direction
    {
        Left = 1,
        Right = 2,
        Up = 3,
        Down = 4,
    }

    // Start is called before the first frame update
    void Start()
    {
        invokeInstance = GetComponent<Invoke>();
    }

    // Update is called once per frame
    void Update()
    {
        // We call our custom movement function each frame.
        MovePlayer();
    }

    void MovePlayer()
    {
        // These variables will capture input from the keyboard.
        float moveHorizontal = Input.GetAxis("Horizontal");
        float moveVertical = Input.GetAxis("Vertical");

        // Based on the input, we set our direction.
        Direction? moveDirection = null;

        if (moveHorizontal < 0)
        {
            moveDirection = Direction.Left;
        }
        else if (moveHorizontal > 0)
        {
            moveDirection = Direction.Right;
        }
        else if (moveVertical > 0)
        {
            moveDirection = Direction.Up;
        }
        else if (moveVertical < 0)
        {
            moveDirection = Direction.Down;
        }

        // This creates a new vector for the player's movement.
        Vector3 movement = new Vector3(moveHorizontal, moveVertical, 0.0f);

        // This applies the movement to the player's position.
        transform.position = transform.position + movement * moveSpeed * Time.deltaTime;

        if (moveDirection.HasValue)
        {
            Debug.Log("Moving " + moveDirection.Value.ToString());
            string moveDirectionHex = ((int)moveDirection).ToString("X");
            Execute("move", new string[] { moveDirectionHex });
        }
    }

    public void SpawnPlayer()
    {
        // show hidden game object
        this.gameObject.SetActive(true);
        string[] spwanArgs = new string[] { };
        Execute("spawn", spwanArgs);
    }

    void Execute(string model, string[] args)
    {
        string contractAddress = PlayerPrefs.GetString("System Address");
        int cairoVersion = 0;
        string maxFee = "0x0"; // set to 0 since fee is disabled on KATANA
        string chainId = "0x4b4154414e41"; // KATANA

        invokeInstance = GetComponent<Invoke>();
        invokeInstance.CreateTransaction(playerAddress, contractAddress, model, args, cairoVersion, maxFee, chainId, playerKey);
    }

    void GetData(string model, string[] args)
    {
        string contractAddress = PlayerPrefs.GetString("System Address");

        Settings.apiurl = PlayerPrefs.GetString("RPCNode");
        UnityRpcPlatform rpcPlatform = new UnityRpcPlatform();

        ContractInteraction contractInteraction = new ContractInteraction(contractAddress, model, args);
        rpcPlatform.CallContract(contractInteraction, OnSuccess, OnError);
    }

    void OnSuccess(string result)
    {
        Debug.Log("Contract call successful: " + result);
    }

    void OnError(string error)
    {
        Debug.LogError("Contract call error: " + error);
    }
}

