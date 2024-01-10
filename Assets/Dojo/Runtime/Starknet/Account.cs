using System;
using System.Linq;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{

#if UNITY_WEBGL && !UNITY_EDITOR
    public class Account
#else
    public unsafe class Account
#endif
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        private string accountJsObject;
#else
        private dojo.Account* account;
#endif

        #if UNITY_WEBGL && !UNITY_EDITOR
        public Account(JsonRpcClient provider, SigningKey privateKey, string address)
        {
            accountJsObject = StarknetInterop.NewAccount(new CString(provider.rpcJsObject), new CString(address), new CString(privateKey.PrivateKey.Hex()));
        }
        #else
        public Account(JsonRpcClient provider, SigningKey privateKey, string address)
        {
            var resultAccount = dojo.account_new(provider.client, privateKey.PrivateKey.Inner(),
                CString.FromString(address));
            if (resultAccount.tag == dojo.ResultAccount_Tag.ErrAccount)
            {
                throw new Exception(resultAccount.err.message);
            }

            account = resultAccount._ok;
        }
        #endif


#if UNITY_WEBGL && !UNITY_EDITOR
        public Account(string accountJsObject) {
            this.accountJsObject = accountJsObject;
        }
#else
        public Account(dojo.Account* account)
        {
            this.account = account;
        }
#endif

        ~Account()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
#else
            dojo.account_free(account);
#endif
        }

        public FieldElement Address()
        {
            #if UNITY_WEBGL && !UNITY_EDITOR
            var address = StarknetInterop.AccountAddress(new CString(accountJsObject));
            #else
            var address = dojo.account_address(account);
            #endif

            return new FieldElement(address);
        }

        public FieldElement ChainId()
        {
            #if UNITY_WEBGL && !UNITY_EDITOR
            var chainId = StarknetInterop.AccountChainId(new CString(accountJsObject));
            #else
            var chainId = dojo.account_chain_id(account);
            #endif

            return new FieldElement(chainId);
        }

        public void SetBlockId(dojo.BlockId blockId)
        {
            #if UNITY_WEBGL && !UNITY_EDITOR
            #else
            dojo.account_set_block_id(account, blockId);
            #endif
        }

#if UNITY_WEBGL && !UNITY_EDITOR
        // webgl js interop starknet bindings
        public FieldElement ExecuteRaw(dojo.Call[] calls)
        {
            var res = StarknetInterop.AccountExecuteRawAsync(accountJsObject, calls.Select(call => new StarknetInterop.Call{
                contractAddress = call.to.ToString(),
                entrypoint = call.selector.ToString(),
                calldata = call.calldata.ToArray().Select(f => new FieldElement(f).Hex()).ToArray(),
            }).ToArray()).Result;

            return new FieldElement(res);
        }
#else
        public FieldElement ExecuteRaw(dojo.Call[] calls)
        {
            dojo.Call* callsPtr;
            fixed (dojo.Call* ptr = &calls[0])
            {
                callsPtr = ptr;
            }

            var result = dojo.account_execute_raw(account, callsPtr, (nuint)calls.Length);
            if (result.tag == dojo.ResultFieldElement_Tag.ErrFieldElement)
            {
                throw new Exception(result.err.message);
            }

            return new FieldElement(result.ok);
        }
#endif

        // This will synchroneously wait for the transaction to be confirmed.
        // Use BurnerManager for async execution.
        #if UNITY_WEBGL && !UNITY_EDITOR
        public Account DeployBurner() {
            return new Account(StarknetInterop.AccountDeployBurnerAsync(accountJsObject).Result);
        }
        #else
        public Account DeployBurner()
        {
            var result = dojo.account_deploy_burner(account);
            if (result.tag == dojo.ResultAccount_Tag.ErrAccount)
            {
                throw new Exception(result.err.message);
            }

            return new Account(result._ok);
        }
        #endif
    }
}
