using System;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{
    public class JsonRpcClient
    {
        public unsafe dojo.CJsonRpcClient* client;
        
        public unsafe JsonRpcClient(string rpcUrl)
        {
            var result = dojo.jsonrpc_client_new(CString.FromString(rpcUrl));
            if (result.tag == dojo.ResultCJsonRpcClient_Tag.ErrCJsonRpcClient)
            {
                throw new Exception(result.err.message);
            }
            
            client = result._ok;
        }

        unsafe ~JsonRpcClient()
        {
            dojo.jsonrpc_client_free(client);
        }

        // Wait for the transaction to be confirmed. Synchronously.
        // This doesn't guarantee that the torii client has updated its state
        // if an entity is updated.
        public unsafe void WaitForTransactionSync(dojo.FieldElement transactionHash)
        {
            var result = dojo.wait_for_transaction(client, transactionHash);
            if (result.tag == dojo.Resultbool_Tag.Errbool)
            {
                throw new Exception(result.err.message);
            }
        }

        // Wait for the transaction to be confirmed. Asynchronously.
        // This doesn't guarantee that the torii client has updated its state
        // if an entity is updated.
        public async Task WaitForTransaction(dojo.FieldElement transactionHash)
        {
            await Task.Run(() => WaitForTransactionSync(transactionHash));
        }
    }
}