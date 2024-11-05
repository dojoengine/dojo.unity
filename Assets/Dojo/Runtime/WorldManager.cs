using System.Linq;
using dojo_bindings;
using UnityEngine;
using Dojo.Torii;
using System;
using Dojo.Starknet;
using System.Threading.Tasks;

namespace Dojo
{
    public class WorldManager : MonoBehaviour
    {
        public SynchronizationMaster synchronizationMaster;
        public ToriiClient toriiClient;
        public ToriiWasmClient wasmClient;
        [SerializeField] public WorldManagerData dojoConfig;

        async void Awake()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            wasmClient = new ToriiWasmClient(dojoConfig.toriiUrl, dojoConfig.rpcUrl,
                                                dojoConfig.relayWebrtcUrl, dojoConfig.worldAddress);
            await wasmClient.CreateClient();
#else
            toriiClient = new ToriiClient(dojoConfig.toriiUrl, dojoConfig.rpcUrl,
                                            dojoConfig.relayUrl, dojoConfig.worldAddress);
#endif

            /*  fetch entities from the world
                TODO: maybe do in the start function of the SynchronizationMaster?
                problem is when to start the subscription service
            */
            await synchronizationMaster.SynchronizeEntities();

            // listen for entity updates
            synchronizationMaster.RegisterEntityCallbacks();
            synchronizationMaster.RegisterEventMessageCallbacks();
        }

        // #if UNITY_WEBGL && !UNITY_EDITOR
        //         // internal callback to be called for when the client is created
        //         // on the wasm sdk. 
        //         public void OnClientCreated(float clientPtr)
        //         {
        //             toriiClient.wasmClientPtr = (IntPtr)clientPtr;
        //             // we dont start the subscription service
        //             // because wasm already does it.

        //             // fetch entities from the world
        //             // TODO: maybe do in the start function of the SynchronizationMaster?
        //             // problem is when to start the subscription service
        //             synchronizationMaster.SynchronizeEntities();

        //             // listen for entity updates
        //             synchronizationMaster.RegisterEntityCallbacks();
        //         }
        // #endif

        /*  Get a child entity from the WorldManager game object.
            Name is usually the hashed_keys of the entity as a hex string.
        */
        public GameObject Entity(string name)
        {
            var entity = transform.Find(name);
            if (entity == null)
            {
                Debug.LogError($"Entity {name} not found");
                return null;
            }

            return entity.gameObject;
        }

        // Return all children entities.
        public GameObject[] Entities()
        {
            return transform.Cast<Transform>().Select(t => t.gameObject).ToArray();
        }

        // Return all children entities.
        // That have the specified component.
        public GameObject[] Entities<T>() where T : Component
        {
            return transform.Cast<Transform>()
                .Select(t => t.gameObject)
                .Where(g => g.GetComponent<T>() != null)
                .ToArray();
        }

        // Add a new entity game object as a child of the WorldManager game object.
        public GameObject AddEntity(string key)
        {
            // check if entity already exists
            var entity = transform.Find(key)?.gameObject;
            if (entity != null)
            {
                Debug.LogWarning($"Entity {key} already exists");
                return entity.gameObject;
            }

            entity = new GameObject(key);
            entity.transform.parent = transform;

            return entity;
        }

        // Remove an entity game object from the WorldManager game object.
        public void RemoveEntity(string key)
        {
            var entity = transform.Find(key);
            if (entity != null)
            {
                Destroy(entity.gameObject);
            }
        }

        public async Task<byte[]> Publish(TypedData typedData, FieldElement[] signature)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            return await wasmClient.PublishMessage(typedData, signature);
#else
            return await Task.Run(() => toriiClient.PublishMessage(typedData, signature).ToArray());
#endif
        }
    }
}
