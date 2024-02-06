using System;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{
    public class JsonRpcClient
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        public IntPtr client;
#else
        public unsafe dojo.CJsonRpcClient* client;
#endif

#if UNITY_WEBGL && !UNITY_EDITOR
        public JsonRpcClient(string rpcUrl) {
            client = StarknetInterop.NewProvider(new CString(rpcUrl));
        }
#else
        public unsafe JsonRpcClient(string rpcUrl)
        {
            var result = dojo.jsonrpc_client_new(CString.FromString(rpcUrl));
            if (result.tag == dojo.ResultCJsonRpcClient_Tag.ErrCJsonRpcClient)
            {
                throw new Exception(result.err.message);
            }

            client = result._ok;
        }
#endif

        unsafe ~JsonRpcClient()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
#else
            dojo.jsonrpc_client_free(client);
#endif
        }

        // Wait for the transaction to be confirmed. Synchronously.
        // This doesn't guarantee that the torii client has updated its state
        // if an entity is updated.
#if UNITY_WEBGL && !UNITY_EDITOR
#else
        private unsafe void WaitForTransactionSync(FieldElement transactionHash)
        {
            var result = dojo.wait_for_transaction(client, transactionHash.Inner());
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }
        }
#endif

        // Wait for the transaction to be confirmed. Asynchronously.
        // This doesn't guarantee that the torii client has updated its state
        // if an entity is updated.
        public async Task WaitForTransaction(FieldElement transactionHash)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            await StarknetInterop.WaitForTransactionAsync(client, transactionHash);
#else
            await Task.Run(() => WaitForTransactionSync(transactionHash));
#endif
        }
    }
}