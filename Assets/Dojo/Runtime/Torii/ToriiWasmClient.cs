using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using Dojo.Starknet;
using Newtonsoft.Json;
using UnityEngine;

namespace Dojo.Torii
{
    public class ToriiWasmClient
    {
        private string toriiUrl;
        private string rpcUrl;
        private string relayUrl;
        private string world;
        public IntPtr clientPtr;

        public ToriiWasmClient(string toriiUrl, string rpcUrl, string relayUrl, string world)
        {
            this.toriiUrl = toriiUrl;
            this.rpcUrl = rpcUrl;
            this.relayUrl = relayUrl;
            this.world = world;
        }

        public async Task CreateClient()
        {
            clientPtr = await ToriiWasmInterop.CreateClientAsync(rpcUrl, toriiUrl, relayUrl, world);
            ToriiWasmInterop.OnEntityUpdated(clientPtr, new FieldElement[] { });
            ToriiWasmInterop.OnMessage(clientPtr);
        }

        public async Task<List<Entity>> Entities(int limit, int offset)
        {
            var entities = await ToriiWasmInterop.GetEntitiesAsync(clientPtr, limit, offset);
            return entities;
        }

        public async Task<bool> SubscribeTopic(string topic)
        {
            return await ToriiWasmInterop.SubscribeTopicAsync(clientPtr, topic);
        }

        public async Task<bool> UnsubscribeTopic(string topic)
        {
            return await ToriiWasmInterop.UnsubscribeTopicAsync(clientPtr, topic);
        }

        public async Task<byte[]> PublishMessage(string topic, byte[] data)
        {
            return await ToriiWasmInterop.PublishMessageAsync(clientPtr, topic, data);
        }
    }
}