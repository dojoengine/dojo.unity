using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using Dojo.Starknet;
using dojo_bindings;
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
            ToriiWasmInterop.OnEventMessageUpdated(clientPtr, new FieldElement[] { });
        }

        public async Task<List<Entity>> Entities(dojo.Query query)
        {
            var entities = await ToriiWasmInterop.GetEntitiesAsync(clientPtr, new Query(query));
            return entities;
        }

        public async Task<List<Entity>> EventMessages(dojo.Query query)
        {
            var entities = await ToriiWasmInterop.GetEventMessagesAsync(clientPtr, new Query(query));
            return entities;
        }

        public async Task<byte[]> PublishMessage(TypedData message, Signature signature)
        {
            return await ToriiWasmInterop.PublishMessageAsync(clientPtr, message, signature);
        }
    }
}