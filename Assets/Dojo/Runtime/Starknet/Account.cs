using System;
using System.Linq;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

namespace Dojo.Starknet
{
    public class Account
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        private string accountJsObject;
#else
        private unsafe dojo.Account* account;
#endif

#if UNITY_WEBGL && !UNITY_EDITOR
        public Account(JsonRpcClient provider, SigningKey privateKey, string address)
        {
            accountJsObject =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               StarknetInterop.NewAccount(new CString(provider.rpcJsObject), new CString(address), new CString(privateKey.PrivateKey.Hex()));
        }
#else
        public unsafe Account(JsonRpcClient provider, SigningKey privateKey, string address)
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
        private unsafe Account(dojo.Account* account)
        {
            this.account = account;
        }
#endif

        unsafe ~Account()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
#else
            dojo.account_free(account);
#endif
        }

        public unsafe FieldElement Address()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            var address = StarknetInterop.AccountAddress(new CString(accountJsObject));
#else
            var address = dojo.account_address(account);
#endif

            return new FieldElement(address);
        }

        public unsafe FieldElement ChainId()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            var chainId = StarknetInterop.AccountChainId(new CString(accountJsObject));
#else
            var chainId = dojo.account_chain_id(account);
#endif

            return new FieldElement(chainId);
        }

        public unsafe void SetBlockId(dojo.BlockId blockId)
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
            var res =
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    StarknetInterop.AccountExecuteRawAsync(accountJsObject, calls.Select(call => new StarknetInterop.Call{
                contractAddress = call.to.ToString(),
                entrypoint = call.selector.ToString(),
                calldata = call.calldata.ToArray().Select(f => new FieldElement(f).Hex()).ToArray(),
            }).ToArray()).Result;

            return new FieldElement(res);
        }
#else
        public unsafe FieldElement ExecuteRaw(dojo.Call[] calls)
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

        // This will synchroneously wait for the burner to be deployed.
        // Implemented for C bindings that arent async.
        private unsafe Account DeployBurnerSync()
        {
            var result = dojo.account_deploy_burner(account);
            if (result.tag == dojo.ResultAccount_Tag.ErrAccount)
            {
                throw new Exception(result.err.message);
            }

            return new Account(result._ok);
        }

        // Deploy a burner and return the account once it is deployed.
        public async Task<Account> DeployBurner()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            return await StarknetInterop.AccountDeployBurnerAsync(accountJsObject);
#else
            return await Task.Run(DeployBurnerSync);
#endif
        }
    }
}