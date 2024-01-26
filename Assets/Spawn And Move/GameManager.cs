using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using bottlenoselabs.C2CS.Runtime;
using Dojo;
using Dojo.Starknet;
using dojo_bindings;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using Object = System.Object;
using Random = UnityEngine.Random;

public class GameManager : MonoBehaviour
{
    public string masterPrivateKey;
    public string masterAddress;

    public WorldManager worldManager;
    public string worldActionsAddress;

    public ChatManager chatManager;

    private BurnerManager burnerManager;
    private Dictionary<FieldElement, string> spawnedBurners = new();

    void Awake()
    {
        var provider = new JsonRpcClient(worldManager.rpcUrl);
        var signer = new SigningKey(masterPrivateKey);
        var account = new Account(provider, signer, new FieldElement(masterAddress));

        burnerManager = new BurnerManager(provider, account);
    }

    // Start is called before the first frame update
    void Start()
    {
        worldManager.synchronizationMaster.OnEntitySpawned.AddListener(InitEntity);
        foreach (var entity in worldManager.Entities())
        {
            InitEntity(entity);
        }
    }

    // Update is called once per frame
    async void Update()
    {
        // dont register inputs if our chat is open
        if (chatManager.chatOpen) return;

        if (Input.GetKeyUp(KeyCode.Space))
        {
            var burner = await burnerManager.DeployBurner();
            spawnedBurners[burner.Address] = null;
            var txHash = await burner.ExecuteRaw(new dojo.Call[]
            {
                new dojo.Call
                {
                    selector = "spawn",
                    to = worldActionsAddress,
                }
            });
        }

        if (Input.GetMouseButtonUp(0))
        {
            var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            var hit = Physics.Raycast(ray, out var hitInfo);
            if (hit && hitInfo.transform.parent != null)
            {
                var entity = hitInfo.transform.parent;
                Position position;
                entity.TryGetComponent(out position);

                if (position && spawnedBurners.ContainsValue(entity.name))
                {
                    var previousBurner = burnerManager.CurrentBurner;
                    if (previousBurner != null)
                    {
                        worldManager.Entity(spawnedBurners[previousBurner.Address])
                            .GetComponent<Position>().textTag.color = Color.black;
                    }

                    var burner = spawnedBurners.First(b => b.Value == entity.name);
                    var burnerAddress = burner.Key;
                    var burnerInstance = burnerManager.UseBurner(burnerAddress);

                    position.textTag.color = Color.blue;
                }
            }
        }

        if (Input.GetKeyDown(KeyCode.W))
        {
            // coordinates are different between dojo world and unity
            Move(Direction.Down);
        }
        else if (Input.GetKeyDown(KeyCode.A))
        {
            Move(Direction.Left);
        }
        else if (Input.GetKeyDown(KeyCode.S))
        {
            Move(Direction.Up);
        }
        else if (Input.GetKeyDown(KeyCode.D))
        {
            Move(Direction.Right);
        }
    }

    private async void Move(Direction direction)
    {
        if (burnerManager.CurrentBurner == null)
        {
            Debug.LogWarning("No burner selected");
            return;
        }

        await burnerManager.CurrentBurner.ExecuteRaw(new dojo.Call[]
        {
            new dojo.Call
            {
                calldata = new dojo.FieldElement[] {
                    new FieldElement(direction).Inner()
                },
                selector = "move",
                to = worldActionsAddress,
            }
        });
    }

    private void InitEntity(GameObject entity)
    {
        var capsule = GameObject.CreatePrimitive(PrimitiveType.Capsule);
        // change color of capsule to a random color
        capsule.GetComponent<Renderer>().material.color = Random.ColorHSV();
        capsule.transform.parent = entity.transform;

        foreach (var burner in spawnedBurners)
        {
            if (burner.Value == null)
            {
                spawnedBurners[burner.Key] = entity.name;
                break;
            }
        }
    }
}