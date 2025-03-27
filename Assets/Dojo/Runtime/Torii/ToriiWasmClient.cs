using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AOT;
using bottlenoselabs.C2CS.Runtime;
using Dojo.Starknet;
using dojo_bindings;
using Newtonsoft.Json;
using System.Numerics;
using UnityEngine;

namespace Dojo.Torii
{
    public class ToriiWasmClient
    {
        private string toriiUrl;
        private string relayUrl;
        private FieldElement world;
        public IntPtr clientPtr;

        IntPtr entitySubscription;
        IntPtr eventMessageSubscription;

        public ToriiWasmClient(string toriiUrl, string relayUrl, FieldElement world)
        {
            this.toriiUrl = toriiUrl;
            this.relayUrl = relayUrl;
            this.world = world;
        }

        private static class CreateClientHelper
        {
            public static TaskCompletionSource<IntPtr> Tcs;

            [MonoPInvokeCallback(typeof(Action<IntPtr>))]
            public static void Callback(IntPtr clientPtr)
            {
                Tcs.SetResult(clientPtr);
            }
        }

        public async Task CreateClient()
        {
            CreateClientHelper.Tcs = new TaskCompletionSource<IntPtr>();
            ToriiWasmInterop.CreateClient(new CString(toriiUrl), new CString(relayUrl), new CString(world.Hex()), CreateClientHelper.Callback);
            clientPtr = await CreateClientHelper.Tcs.Task;

            entitySubscription = await RegisterEntityStateUpdateEvent(new KeysClause[] { });
            eventMessageSubscription = await RegisterEventMessageUpdateEvent(new KeysClause[] { });
        }

        private static class GetEntitiesHelper
        {
            public static TaskCompletionSource<List<Entity>> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string entities)
            {
                var parsedEntities = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, Dictionary<string, WasmValue>>>>(entities);
                var entityList = new List<Entity>();

                foreach (var entity in parsedEntities)
                {
                    var models = new Dictionary<string, Model>();
                    foreach (var model in entity.Value)
                    {
                        models.Add(model.Key, new Model(
                            model.Key,
                            model.Value.ToDictionary(
                                m => m.Key,
                                m => m.Value
                            )
                        ));
                    }

                    entityList.Add(new Entity(new FieldElement(entity.Key), models));
                }

                Tcs.SetResult(entityList);
            }
        }

        public Task<List<Entity>> Entities(Query query, bool historical = false)
        {
            GetEntitiesHelper.Tcs = new TaskCompletionSource<List<Entity>>();
            ToriiWasmInterop.GetEntities(clientPtr, new CString(JsonConvert.SerializeObject(query)), historical, GetEntitiesHelper.Callback);
            return GetEntitiesHelper.Tcs.Task;
        }

        public Task<List<Entity>> EventMessages(Query query, bool historical = false)
        {
            GetEntitiesHelper.Tcs = new TaskCompletionSource<List<Entity>>();
            ToriiWasmInterop.GetEventMessages(clientPtr, new CString(JsonConvert.SerializeObject(query)), historical, GetEntitiesHelper.Callback);
            return GetEntitiesHelper.Tcs.Task;
        }

        private static class OnEntityUpdatedHelper
        {

            [MonoPInvokeCallback(typeof(Action<string, string>))]
            public static void Callback(string hashed_keys, string models)
            {
                var parsedModels = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, WasmValue>>>(models).Select(m => new Model(
                    m.Key,
                    m.Value
                )).ToArray();

                ToriiEvents.Instance.EntityUpdated(new FieldElement(hashed_keys), parsedModels);
            }
        }

        private static class SubscriptionHelper
        {
            public static TaskCompletionSource<IntPtr> Tcs;

            [MonoPInvokeCallback(typeof(Action<IntPtr>))]
            public static void Callback(IntPtr subPtr)
            {
                Tcs.SetResult(subPtr);
            }
        }

        public async Task<IntPtr> RegisterEntityStateUpdateEvent(KeysClause[] clauses)
        {
            SubscriptionHelper.Tcs = new TaskCompletionSource<IntPtr>();
            ToriiWasmInterop.OnEntityUpdated(clientPtr, new CString(JsonConvert.SerializeObject(clauses)), OnEntityUpdatedHelper.Callback, SubscriptionHelper.Callback);
            return await SubscriptionHelper.Tcs.Task;
        }

        public void UpdateEntitySubscription(KeysClause[] clauses)
        {
            ToriiWasmInterop.UpdateEntitySubscription(clientPtr, entitySubscription, new CString(JsonConvert.SerializeObject(clauses)));
        }

        private static class OnEventMessageUpdatedHelper
        {

            [MonoPInvokeCallback(typeof(Action<string, string>))]
            public static void Callback(string hashed_keys, string models)
            {
                var parsedModels = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, WasmValue>>>(models).Select(m => new Model(
                    m.Key,
                    m.Value
                )).ToArray();

                ToriiEvents.Instance.EventMessageUpdated(new FieldElement(hashed_keys), parsedModels);
            }
        }

        public async Task<IntPtr> RegisterEventMessageUpdateEvent(KeysClause[] clauses)
        {
            SubscriptionHelper.Tcs = new TaskCompletionSource<IntPtr>();
            ToriiWasmInterop.OnEventMessageUpdated(clientPtr, new CString(JsonConvert.SerializeObject(clauses)), OnEventMessageUpdatedHelper.Callback, SubscriptionHelper.Callback);
            return await SubscriptionHelper.Tcs.Task;
        }

        public void UpdateEventMessageSubscription(KeysClause[] clauses)
        {
            ToriiWasmInterop.UpdateEventMessageSubscription(clientPtr, eventMessageSubscription, new CString(JsonConvert.SerializeObject(clauses)));
        }

        private static class PublishMessageHelper
        {
            public static TaskCompletionSource<byte[]> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string messageId)
            {
                Tcs.SetResult(JsonConvert.DeserializeObject<byte[]>(messageId));
            }
        }

        public Task<byte[]> PublishMessage(TypedData typedData, FieldElement[] signature)
        {
            PublishMessageHelper.Tcs = new TaskCompletionSource<byte[]>();
            ToriiWasmInterop.PublishMessage(clientPtr, new CString(JsonConvert.SerializeObject(typedData)), new CString(JsonConvert.SerializeObject(signature)), PublishMessageHelper.Callback);
            return PublishMessageHelper.Tcs.Task;
        }

        private static class GetTokensHelper
        {
            public static TaskCompletionSource<Token[]> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string tokens)
            {
                var parsedTokens = JsonConvert.DeserializeObject<WasmToken[]>(tokens);
                Tcs.SetResult(parsedTokens.Select(t => new Token(new FieldElement(t.contract_address), BigInteger.Parse(t.token_id.Substring(2), System.Globalization.NumberStyles.HexNumber), t.name, t.symbol, t.decimals, t.metadata)).ToArray());
            }
        }

        public Task<Token[]> Tokens(FieldElement[] contractAddresses, BigInteger[] tokenIds)
        {
            GetTokensHelper.Tcs = new TaskCompletionSource<Token[]>();
            ToriiWasmInterop.GetTokens(clientPtr, new CString(JsonConvert.SerializeObject(contractAddresses)), new CString(JsonConvert.SerializeObject(tokenIds)), GetTokensHelper.Callback);
            return GetTokensHelper.Tcs.Task;
        }

        private static class GetTokenBalancesHelper
        {
            public static TaskCompletionSource<TokenBalance[]> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string tokenBalances)
            {
                var parsedTokenBalances = JsonConvert.DeserializeObject<WasmTokenBalance[]>(tokenBalances);
                Tcs.SetResult(parsedTokenBalances.Select(t => new TokenBalance(BigInteger.Parse(t.balance.Substring(2), System.Globalization.NumberStyles.HexNumber), new FieldElement(t.account_address), new FieldElement(t.contract_address), BigInteger.Parse(t.token_id.Substring(2), System.Globalization.NumberStyles.HexNumber))).ToArray());
            }
        }

        public Task<TokenBalance[]> TokenBalances(FieldElement[] contractAddresses, FieldElement[] accountAddresses, BigInteger[] tokenIds)
        {
            GetTokenBalancesHelper.Tcs = new TaskCompletionSource<TokenBalance[]>();
            ToriiWasmInterop.GetTokenBalances(clientPtr, new CString(JsonConvert.SerializeObject(contractAddresses)), new CString(JsonConvert.SerializeObject(accountAddresses)), new CString(JsonConvert.SerializeObject(tokenIds)), GetTokenBalancesHelper.Callback);
            return GetTokenBalancesHelper.Tcs.Task;
        }        

        private static class OnTokenUpdatedHelper
        {
            public static TaskCompletionSource<Token> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string token)
            {
                var parsedToken = JsonConvert.DeserializeObject<WasmToken>(token);
                // go from hex string to BigInteger
                var tokenId = BigInteger.Parse(parsedToken.token_id.Substring(2), System.Globalization.NumberStyles.HexNumber);
                Tcs.SetResult(new Token(new FieldElement(parsedToken.contract_address), tokenId, parsedToken.name, parsedToken.symbol, parsedToken.decimals, parsedToken.metadata));
            }
        }

        public Task<Token> RegisterTokenUpdateEvent(FieldElement[] contractAddresses, BigInteger[] tokenIds)
        {
            OnTokenUpdatedHelper.Tcs = new TaskCompletionSource<Token>();
            ToriiWasmInterop.OnTokenUpdated(clientPtr, new CString(JsonConvert.SerializeObject(contractAddresses)), new CString(JsonConvert.SerializeObject(tokenIds)), OnTokenUpdatedHelper.Callback, SubscriptionHelper.Callback);
            return OnTokenUpdatedHelper.Tcs.Task;
        }

        private static class OnTokenBalanceUpdatedHelper
        {
            public static TaskCompletionSource<TokenBalance> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string tokenBalance)
            {
                var parsedTokenBalance = JsonConvert.DeserializeObject<WasmTokenBalance>(tokenBalance);
                var tokenId = BigInteger.Parse(parsedTokenBalance.token_id.Substring(2), System.Globalization.NumberStyles.HexNumber);
                var balance = BigInteger.Parse(parsedTokenBalance.balance.Substring(2), System.Globalization.NumberStyles.HexNumber);
                Tcs.SetResult(new TokenBalance(balance, new FieldElement(parsedTokenBalance.account_address), new FieldElement(parsedTokenBalance.contract_address), tokenId));
            }
        }

        public Task<TokenBalance> RegisterTokenBalanceUpdateEvent(FieldElement[] contractAddresses, FieldElement[] accountAddresses, BigInteger[] tokenIds)
        {
            OnTokenBalanceUpdatedHelper.Tcs = new TaskCompletionSource<TokenBalance>();
            ToriiWasmInterop.OnTokenBalanceUpdated(clientPtr, new CString(JsonConvert.SerializeObject(contractAddresses)), new CString(JsonConvert.SerializeObject(accountAddresses)), new CString(JsonConvert.SerializeObject(tokenIds)), OnTokenBalanceUpdatedHelper.Callback, SubscriptionHelper.Callback);
            return OnTokenBalanceUpdatedHelper.Tcs.Task;
        }
    }
}