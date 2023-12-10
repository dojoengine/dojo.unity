using System;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{
    public unsafe class Account
    {
        private dojo.Account* account;
            
        public Account(JsonRpcClient provider, SigningKey privateKey, string address)
        {
            var resultAccount = dojo.account_new(provider.client, privateKey.PrivateKey(),
                CString.FromString(address));
            if (resultAccount.tag == dojo.Result_____Account_Tag.Err_____Account)
            {
                throw new Exception(resultAccount.err.message);
            }
            
            account = resultAccount._ok;
        }
            
        ~Account()
        {
            dojo.account_free(account);
        }
            
        public dojo.FieldElement Address()
        {
            dojo.FieldElement address = dojo.account_address(account);
                
            return address;
        }
            
        public dojo.FieldElement ChainId()
        {
            dojo.FieldElement chainId = dojo.account_chain_id(account);
                
            return chainId;
        }
            
        public void SetBlockId(dojo.BlockId blockId)
        {
            dojo.account_set_block_id(account, blockId);
        }
    
        public void ExecuteRaw(dojo.Call[] calls)
        {
            dojo.Call* callsPtr;
            fixed (dojo.Call* ptr = &calls[0])
            {
                callsPtr = ptr;
            }
    
            var result = dojo.account_execute_raw(account, callsPtr, (nuint) calls.Length);
            if (result.tag == dojo.Result_bool_Tag.Err_bool)
            {
                throw new Exception(result.err.message);
            }
        }
    }
}
