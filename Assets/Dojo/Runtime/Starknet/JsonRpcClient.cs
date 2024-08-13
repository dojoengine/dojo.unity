using System;
using System.Linq;
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
                public unsafe dojo.Provider* client;
#endif

#if UNITY_WEBGL && !UNITY_EDITOR
                public JsonRpcClient(string rpcUrl) {
                client = StarknetInterop.NewProvider(new CString(rpcUrl));
                }
#else
                public unsafe JsonRpcClient(string rpcUrl)
                {
                        var result = dojo.provider_new(CString.FromString(rpcUrl));
                        if (result.tag == dojo.ResultProvider_Tag.ErrProvider)
                        {
                                throw new Exception(result.err.message);
                        }

                        client = result._ok;
                }
#endif

#if UNITY_WEBGL && !UNITY_EDITOR
#else
                unsafe ~JsonRpcClient()
                {
                        dojo.provider_free(client);
                }
#endif
#if UNITY_WEBGL && !UNITY_EDITOR
#else
                // Wait for the transaction to be confirmed. Synchronously.
                // This doesn't guarantee that the torii client has updated its state
                // if an entity is updated.
                private unsafe void WaitForTransactionSync(FieldElement transactionHash)
                {
                        var result = dojo.wait_for_transaction(client, transactionHash.Inner);
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


#if UNITY_WEBGL && !UNITY_EDITOR
#else
                private unsafe FieldElement[] CallSync(dojo.Call call, dojo.BlockId blockId)
                {
                        var result = dojo.starknet_call(client, call, blockId);
                        if (result.tag == dojo.ResultCArrayFieldElement_Tag.ErrCArrayFieldElement)
                        {
                                throw new Exception(result.err.message);
                        }

                        var arr = result.ok.ToArray().Select(f => new FieldElement(f)).ToArray();
                        dojo.carray_free(result._ok.data, result._ok.data_len);

                        return arr;
                }
#endif

                // Wait for the transaction to be confirmed. Asynchronously.
                // This doesn't guarantee that the torii client has updated its state
                // if an entity is updated.
                public async Task<FieldElement[]> Call(dojo.Call call, dojo.BlockId blockId)
                {
#if UNITY_WEBGL && !UNITY_EDITOR
                        return await StarknetInterop.CallAsync(client, call, blockId);
#else
                        return await Task.Run(() => CallSync(call, blockId));
#endif
                }
        }
}