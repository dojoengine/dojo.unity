using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using UnityEngine;

namespace Dojo.Torii {
    public class ToriiWasmClient {
        CString ctoriiUrl;
        CString crpcUrl;
        CString cworld;
        public IntPtr clientPtr;

        public ToriiWasmClient(string toriiUrl, string rpcUrl, string world) {
            ctoriiUrl = CString.FromString(toriiUrl);
            crpcUrl = CString.FromString(rpcUrl);
            cworld = CString.FromString(world);
        }

        public async Task CreateClient() {
            clientPtr = await ToriiWasmInterop.CreateClientAsync(crpcUrl, ctoriiUrl, cworld);
        }

        public async Task<List<Entity>> Entities(int limit, int offset) {
            var entities = await ToriiWasmInterop.GetEntitiesAsync(clientPtr, limit, offset);
            return entities;
        }
    }
}