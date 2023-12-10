using System;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{
    public unsafe class JsonRpcClient
    {
        public dojo.CJsonRpcClient* client;
        
        public JsonRpcClient(string rpcUrl)
        {
            var result = dojo.jsonrpc_client_new(CString.FromString(rpcUrl));
            if (result.tag == dojo.Result_____CJsonRpcClient_Tag.Err_____CJsonRpcClient)
            {
                throw new Exception(result.err.message);
            }
            
            client = result._ok;
        }
    }
}