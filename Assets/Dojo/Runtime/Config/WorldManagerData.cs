using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Dojo
{
    [CreateAssetMenu(fileName = "WorldManagerData", menuName = "ScriptableObjects/WorldManagerData", order = 2)]
    public class WorldManagerData : ScriptableObject
    {
        [Header("RPC")]
        public string toriiUrl = "http://localhost:8080";
        public string rpcUrl = "http://localhost:5050";
        public string relayUrl = "/ip4/127.0.0.1/tcp/9090";
        public string relayWebrtcUrl;
        public uint limit = 100;
        [Header("World")]
        public string worldAddress;
    }
}
