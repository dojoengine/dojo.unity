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
using UnityEngine.UI;
using Object = System.Object;
using Random = UnityEngine.Random;

public class InitEntities : MonoBehaviour
{
    public string masterPrivateKey;
    public string masterAddress;

    public WorldManager worldManager;
    public string worldActionsAddress;
    private BurnerManager burnerManager;
    private Dictionary<dojo.FieldElement, string> spawnedBurners = new();

    void Awake()
    {
        var provider = new JsonRpcClient(worldManager.rpcUrl);
        var signer = new SigningKey(masterPrivateKey);
        var account = new Account(provider, signer, masterAddress);

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
        if (Input.GetKeyUp(KeyCode.Space))
        {
            var burner = await burnerManager.DeployBurner();
            spawnedBurners[burner.Address()] = null;
            burner.ExecuteRaw(new dojo.Call[]
            {
                new dojo.Call
                {
                    selector = "spawn",
                    to = worldActionsAddress,
                }
            });
        }
    }

    private IEnumerator MoveRandomDirection(dojo.FieldElement burnerAddress, GameObject entity)
    {
        while(true)
        {
            yield return new WaitForSeconds(1);
            
            Position position;
            entity.TryGetComponent<Position>(out position);
            if (!position) continue;
            
            var account = burnerManager.UseBurner(burnerAddress);

            Func<int> randDirection = null;
            randDirection = () =>
            {
                var dir = Mathf.RoundToInt(Random.Range(0, (int)Direction.Down));
                // check if our position is at the edge of the world (world uses uint32 coordinates)
                if ((Direction)dir == Direction.Up && entity.GetComponent<Position>().y == 0)
                {
                    dir = randDirection();
                } else if ((Direction)dir == Direction.Left && entity.GetComponent<Position>().x == 0)
                {
                    dir = randDirection();
                }

                return dir;
            };
        
        
            // var account = burnerManager.UseBurner(burner);
            account.ExecuteRaw(new dojo.Call[]
            {
                new dojo.Call
                {
                    calldata = new dojo.FieldElement[]
                    {
                        dojo
                            .felt_from_hex_be(new CString($"0x{randDirection()}")).ok,
                    },
                    selector = "move",
                    to = worldActionsAddress,
                }
            });
        }
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
                StartCoroutine(MoveRandomDirection(burner.Key, entity));
                break;
            }
        }
    }
}