using System;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{
    public unsafe class Account
    {
        private JsonRpcClient provider;
        private dojo.Account* account;
            
        public Account(JsonRpcClient provider, SigningKey privateKey, string address)
        {
            this.provider = provider;

            var resultAccount = dojo.account_new(provider.client, privateKey.PrivateKey.Inner(),
                CString.FromString(address));
            if (resultAccount.tag == dojo.ResultAccount_Tag.ErrAccount)
            {
                throw new Exception(resultAccount.err.message);
            }
            
            account = resultAccount._ok;
        }

        public Account(dojo.Account* account)
        {
            this.account = account;
        }
            
        ~Account()
        {
            dojo.account_free(account);
        }
            
        public FieldElement Address()
        {
            dojo.FieldElement address = dojo.account_address(account);
                
            return new FieldElement(address);
        }
            
        public FieldElement ChainId()
        {
            dojo.FieldElement chainId = dojo.account_chain_id(account);
                
            return new FieldElement(chainId);
        }
            
        public void SetBlockId(dojo.BlockId blockId)
        {
            dojo.account_set_block_id(account, blockId);
        }
    
        public FieldElement ExecuteRaw(dojo.Call[] calls)
        {
            dojo.Call* callsPtr;
            fixed (dojo.Call* ptr = &calls[0])
            {
                callsPtr = ptr;
            }
    
            var result = dojo.account_execute_raw(account, callsPtr, (nuint) calls.Length);
            if (result.tag == dojo.ResultFieldElement_Tag.ErrFieldElement)
            {
                throw new Exception(result.err.message);
            }

            return new FieldElement(result.ok);
        }

        // This will synchroneously wait for the transaction to be confirmed.
        // Use BurnerManager for async execution.
        public Account DeployBurner()
        {
            var result = dojo.account_deploy_burner(provider.client, account);
            if (result.tag == dojo.ResultAccount_Tag.ErrAccount)
            {
                throw new Exception(result.err.message);
            }

            return new Account(result._ok);
        }
    }
}
