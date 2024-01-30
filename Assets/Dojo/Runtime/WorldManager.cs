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
        [Header("RPC")]
        public string toriiUrl = "http://localhost:8080";
        public string rpcUrl = "http://localhost:5050";
        public string relayUrl = "/ip4/127.0.0.1/tcp/9090";
        public string relayWebrtcUrl;
        [Header("World")]
        public string worldAddress;
        public SynchronizationMaster synchronizationMaster;
        public ToriiClient toriiClient;

#if UNITY_WEBGL && !UNITY_EDITOR
        public ToriiWasmClient wasmClient;
#endif

        async void Awake()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            wasmClient = new ToriiWasmClient(toriiUrl, rpcUrl, relayWebrtcUrl, worldAddress);
            await wasmClient.CreateClient();
#else
            toriiClient = new ToriiClient(toriiUrl, rpcUrl, relayUrl, worldAddress);
#endif


            // fetch entities from the world
            // TODO: maybe do in the start function of the SynchronizationMaster?
            // problem is when to start the subscription service
#if UNITY_WEBGL && !UNITY_EDITOR
            await synchronizationMaster.SynchronizeEntities();
#else
            synchronizationMaster.SynchronizeEntities();
#endif

            // listen for entity updates
            synchronizationMaster.RegisterEntityCallbacks();
        }

        // Update is called once per frame
        void Update()
        {
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

        // Get a child entity from the WorldManager game object.
        // Name is usually the hashed_keys of the entity as a hex string.
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
            return transform.Cast<Transform>()
                .Select(t => t.gameObject)
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

        public async Task<bool> Subscribe(string topic)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            return await wasmClient.SubscribeTopic(topic);
#else
            return toriiClient.SubscribeTopic(topic);
#endif
        }

        public async Task<bool> Unsubscribe(string topic)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            return await wasmClient.UnsubscribeTopic(topic);
#else
            return toriiClient.UnsubscribeTopic(topic);
#endif
        }

        public async Task<byte[]> Publish(string topic, byte[] data)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            return await wasmClient.PublishMessage(topic, data);
#else
            return toriiClient.PublishMessage(topic, data).ToArray();
#endif
        }
    }
}
