using System;
using System.Linq;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;
using Debug = UnityEngine.Debug;

namespace Dojo.Starknet
{
    public class Account
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        private TaskCompletionSource<IntPtr> account = new();
#else
        private unsafe dojo.Account* account;
#endif

        public FieldElement Address{ get; }

#if UNITY_WEBGL && !UNITY_EDITOR
        private async void createAccount(JsonRpcClient provider, SigningKey privateKey, FieldElement address)
        {
            account.SetResult(await StarknetInterop.NewAccountAsync(provider.client, privateKey, address.Hex()));
        }

        public Account(JsonRpcClient provider, SigningKey privateKey, FieldElement address)
        {
            createAccount(provider, privateKey, address);
            Address = address;
        }
#else
        public unsafe Account(JsonRpcClient provider, SigningKey privateKey, FieldElement address)
        {
            var resultAccount = dojo.account_new(provider.client, privateKey.PrivateKey.Inner(),
                CString.FromString(address.Hex()));
            if (resultAccount.tag == dojo.ResultAccount_Tag.ErrAccount)
            {
                throw new Exception(resultAccount.err.message);
            }

            account = resultAccount._ok;
            Address = address;
        }
#endif


#if UNITY_WEBGL && !UNITY_EDITOR
        public Account(IntPtr account) {
            this.account.SetResult(account);
            Address = new FieldElement(StarknetInterop.AccountAddress(account));
        }
#else
        private unsafe Account(dojo.Account* account)
        {
            this.account = account;
            Address = new FieldElement(dojo.account_address(account));
        }
#endif

        unsafe ~Account()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
#else
            dojo.account_free(account);
#endif
        }

//         public async unsafe Task<FieldElement> ChainId()
//         {
// #if UNITY_WEBGL && !UNITY_EDITOR
//             var chainId = StarknetInterop.AccountChainId(await account.Task);
// #else
//             var chainId = dojo.account_chain_id(account);
// #endif

//             return new FieldElement(chainId);
//         }

//         public unsafe void SetBlockId(dojo.BlockId blockId)
//         {
// // #if UNITY_WEBGL && !UNITY_EDITOR
//             StarknetInterop.account(account, blockId.Hex());
// #else
//             dojo.account_set_block_id(account, blockId);
// #endif
//         }

#if UNITY_WEBGL && !UNITY_EDITOR
        // webgl js interop starknet bindings
        public async Task<FieldElement> ExecuteRaw(dojo.Call[] calls)
        {
            var res = await StarknetInterop.AccountExecuteRawAsync(await account.Task, calls);

            return res;
        }
#else
        public unsafe async Task<FieldElement> ExecuteRaw(dojo.Call[] calls)
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

#if !UNITY_WEBGL || UNITY_EDITOR
        // This will synchroneously wait for the burner to be deployed.
        // Implemented for C bindings that arent async.
        private unsafe Account DeployBurnerSync(JsonRpcClient provider)
        {
            var result = dojo.account_deploy_burner(provider.client, account);
            if (result.tag == dojo.ResultAccount_Tag.ErrAccount)
            {
                throw new Exception(result.err.message);
            }

            return new Account(result._ok);
        }
#endif

        // Deploy a burner and return the account once it is deployed.
        public async Task<Account> DeployBurner(JsonRpcClient provider)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            return new Account(await StarknetInterop.AccountDeployBurnerAsync(await account.Task));
#else
            return await Task.Run(() => DeployBurnerSync(provider));
#endif
        }
    }
}