using System;
using System.Linq;
using System.Threading.Tasks;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;
using Debug = UnityEngine.Debug;

namespace Dojo.Starknet
{
    [Serializable]
    public struct Call {
        public FieldElement contractAddress;
        public string entrypoint;
        public FieldElement[] calldata;

        public Call(FieldElement contractAddress, string entrypoint)
        {
            this.contractAddress = contractAddress;
            this.entrypoint = entrypoint;
            this.calldata = new FieldElement[0];
        }

        public Call(FieldElement contractAddress, string entrypoint, params FieldElement[] calldata)
        {
            this.contractAddress = contractAddress;
            this.entrypoint = entrypoint;
            this.calldata = calldata;
        }

        public dojo.Call ToNative()
        {
            return new dojo.Call {
                to = contractAddress.Inner,
                selector = entrypoint,
                calldata = calldata.Select(c => c.Inner).ToArray()
            };
        }

        public static implicit operator Call(dojo.Call call)
        {
            return new Call(new FieldElement(call.to), call.selector, call.calldata.ToArray().Select(f => new FieldElement(f)).ToArray());
        }
    }

    public class Account
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        private TaskCompletionSource<IntPtr> account = new();
#else
        private unsafe dojo.Account* account;
#endif

        public FieldElement Address { get; }
        public SigningKey Signer { get; }

#if UNITY_WEBGL && !UNITY_EDITOR
        private async void createAccount(JsonRpcClient provider, SigningKey privateKey, FieldElement address)
        {
            account.SetResult(await StarknetInterop.NewAccountAsync(provider.client, privateKey, address));
        }

        public Account(JsonRpcClient provider, SigningKey privateKey, FieldElement address)
        {
            createAccount(provider, privateKey, address);
            Address = address;
            Signer = privateKey;
        }
#else
        public unsafe Account(JsonRpcClient provider, SigningKey privateKey, FieldElement address)
        {
            var resultAccount = dojo.account_new(provider.client, privateKey.Inner.Inner,
                CString.FromString(address.Hex()));
            if (resultAccount.tag == dojo.ResultAccount_Tag.ErrAccount)
            {
                throw new Exception(resultAccount.err.message);
            }

            account = resultAccount._ok;
            Address = address;
            Signer = privateKey;
        }
#endif


#if UNITY_WEBGL && !UNITY_EDITOR
        public Account(IntPtr account, SigningKey signingKey) {
            this.account.SetResult(account);
            Address = new FieldElement(StarknetInterop.AccountAddress(account));
            Signer = signingKey;
        }
#else
        private unsafe Account(dojo.Account* account, SigningKey signingKey)
        {
            this.account = account;
            Address = new FieldElement(dojo.account_address(account));
            Signer = signingKey;
        }
#endif

        unsafe ~Account()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
#else
            dojo.account_free(account);
#endif
        }

#if UNITY_WEBGL && !UNITY_EDITOR
        public async Task<FieldElement> Nonce()
        {
            return await StarknetInterop.AccountNonceAsync(await account.Task);
        }
#else
        public unsafe FieldElement NonceSync()
        {
            var result = dojo.account_nonce(account);
            if (result.tag == dojo.ResultFieldElement_Tag.ErrFieldElement)
            {
                throw new Exception(result.err.message);
            }

            return new FieldElement(result.ok);
        }

        public async Task<FieldElement> Nonce()
        {
            return await Task.Run(() => Nonce());
        }
#endif

#if UNITY_WEBGL && !UNITY_EDITOR
        // webgl js interop starknet bindings
        public async Task<FieldElement> ExecuteRaw(Call[] calls)
        {
            var res = await StarknetInterop.AccountExecuteRawAsync(await account.Task, calls);

            return res;
        }

        public async Task<FieldElement> ExecuteRaw(dojo.Call[] calls)
        {
            return await ExecuteRaw(calls.Select(c => (Call)c).ToArray());
        }
#else
        private unsafe FieldElement ExecuteRawSync(Call[] calls)
        {
            dojo.Call* callsPtr;
            fixed (dojo.Call* ptr = &calls.Select(c => c.ToNative()).ToArray()[0])
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

        public async Task<FieldElement> ExecuteRaw(Call[] calls)
        {
            return await Task.Run(() => ExecuteRawSync(calls));
        }

        public async Task<FieldElement> ExecuteRaw(dojo.Call[] calls)
        {
            return await Task.Run(() => ExecuteRawSync(calls.Select(c => (Call)c).ToArray()));
        }
#endif

#if !UNITY_WEBGL || UNITY_EDITOR
        // This will synchroneously wait for the burner to be deployed.
        // Implemented for C bindings that arent async.
        private unsafe Account DeployBurnerSync(JsonRpcClient provider, SigningKey signingKey)
        {
            var result = dojo.account_deploy_burner(provider.client, account, signingKey.Inner.Inner);
            if (result.tag == dojo.ResultAccount_Tag.ErrAccount)
            {
                throw new Exception(result.err.message);
            }

            return new Account(result._ok, signingKey);
        }
#endif

        // Deploy a burner and return the account once it is deployed.
        public async Task<Account> DeployBurner(JsonRpcClient provider, SigningKey signingKey)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            return new Account(await StarknetInterop.AccountDeployBurnerAsync(await account.Task, signingKey), signingKey);
#else
            return await Task.Run(() => DeployBurnerSync(provider, signingKey));
#endif
        }
    }
}