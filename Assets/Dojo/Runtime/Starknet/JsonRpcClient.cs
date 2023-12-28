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
            if (result.tag == dojo.Result_____CJsonRpcClient_Tag.Err_____CJsonRpcClient)
            {
                throw new Exception(result.err.message);
            }
            
            client = result._ok;
        }

        unsafe ~JsonRpcClient()
        {
            dojo.jsonrpc_client_free(client);
        }

        public unsafe void WaitForTransactionSync(string transactionHash)
        {
            var hash = dojo.felt_from_hex_be(CString.FromString(transactionHash));
            if (hash.tag == dojo.Result_FieldElement_Tag.Err_FieldElement)
            {
                throw new Exception(hash.err.message);
            }

            var result = dojo.wait_for_transaction(client, hash.ok);
            if (result.tag == dojo.Result_bool_Tag.Err_bool)
            {
                throw new Exception(result.err.message);
            }
        }

        public async Task WaitForTransaction(string transactionHash)
        {
            await Task.Run(() => WaitForTransactionSync(transactionHash));
        }
    }
}