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
    [SerializeField] WorldManager worldManager;
    [SerializeField] ChatManager chatManager;

    [SerializeField] WorldManagerData dojoConfig;
    [SerializeField] GameManagerData gameManagerData; 

    public BurnerManager burnerManager;
    private Dictionary<FieldElement, string> spawnedAccounts = new();
    public Actions actions;

    public JsonRpcClient provider;
    public Account masterAccount;

    
    void Start()
    {
        provider = new JsonRpcClient(dojoConfig.rpcUrl);
        masterAccount = new Account(provider, new SigningKey(gameManagerData.masterPrivateKey), new FieldElement(gameManagerData.masterAddress));

        burnerManager = new BurnerManager(provider, masterAccount);

        worldManager.synchronizationMaster.OnEntitySpawned.AddListener(InitEntity);
        foreach (var entity in worldManager.Entities())
        {
            InitEntity(entity);
        }
    }

    async void Update()
    {
        // dont register inputs if our chat is open
        if (chatManager.chatOpen) return;

        if (Input.GetKeyUp(KeyCode.E)) {
            spawnedAccounts[masterAccount.Address] = null;
            var txHash = await actions.Spawn(masterAccount);
        }

        if (Input.GetKeyUp(KeyCode.Space))
        {
            var burner = await burnerManager.DeployBurner(new SigningKey());
            spawnedAccounts[burner.Address] = null;
            var txHash = await actions.Spawn(burner);
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

                if (position && spawnedAccounts.ContainsValue(entity.name))
                {
                    var previousBurner = burnerManager.CurrentBurner;
                    if (previousBurner != null)
                    {
                        worldManager.Entity(spawnedAccounts[previousBurner.Address])
                            .GetComponent<Position>().textTag.color = Color.black;
                    }

                    var burner = spawnedAccounts.First(b => b.Value == entity.name);
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
        await actions.Move(burnerManager.CurrentBurner ?? masterAccount, direction);
    }

    private void InitEntity(GameObject entity)
    {
        var capsule = GameObject.CreatePrimitive(PrimitiveType.Capsule);
        // change color of capsule to a random color
        capsule.GetComponent<Renderer>().material.color = Random.ColorHSV();
        capsule.transform.parent = entity.transform;

        foreach (var account in spawnedAccounts)
        {
            if (account.Value == null)
            {
                spawnedAccounts[account.Key] = entity.name;
                break;
            }
        }
    }
}