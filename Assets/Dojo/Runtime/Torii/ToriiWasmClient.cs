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
        IntPtr tokenSubscription;
        IntPtr tokenBalanceSubscription;

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

            entitySubscription = await RegisterEntityStateUpdateEvent();
            eventMessageSubscription = await RegisterEventMessageUpdateEvent();
            tokenSubscription = await RegisterTokenUpdateEvent();
            tokenBalanceSubscription = await RegisterTokenBalanceUpdateEvent();
        }

        private static class GetEntitiesHelper
        {
            public static TaskCompletionSource<Page<Entity>> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string entities)
            {
                var parsedEntities = JsonConvert.DeserializeObject<Page<WasmEntity>>(entities);
                var entityList = new List<Entity>();

                foreach (var entity in parsedEntities.items)
                {
                    var models = new Dictionary<string, Model>();
                    foreach (var model in entity.models)
                    {
                        models.Add(model.Key, new Model(
                            model.Key,
                            model.Value.ToDictionary(
                                m => m.Key,
                                m => m.Value
                            )
                        ));
                    }

                    entityList.Add(new Entity(new FieldElement(entity.hashed_keys), models));
                }

                Tcs.SetResult(new Page<Entity>(entityList.ToArray(), null));
            }
        }

        public Task<Page<Entity>> Entities(Query query)
        {
            GetEntitiesHelper.Tcs = new TaskCompletionSource<Page<Entity>>();
            ToriiWasmInterop.GetEntities(clientPtr, new CString(JsonConvert.SerializeObject(query)), GetEntitiesHelper.Callback);
            return GetEntitiesHelper.Tcs.Task;
        }

        public Task<Page<Entity>> EventMessages(Query query)
        {
            GetEntitiesHelper.Tcs = new TaskCompletionSource<Page<Entity>>();
            ToriiWasmInterop.GetEventMessages(clientPtr, new CString(JsonConvert.SerializeObject(query)), GetEntitiesHelper.Callback);
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

        public async Task<IntPtr> RegisterEntityStateUpdateEvent(Clause? clause = null)
        {
            SubscriptionHelper.Tcs = new TaskCompletionSource<IntPtr>();
            ToriiWasmInterop.OnEntityUpdated(clientPtr, new CString(JsonConvert.SerializeObject(clause)), OnEntityUpdatedHelper.Callback, SubscriptionHelper.Callback);
            return await SubscriptionHelper.Tcs.Task;
        }

        public void UpdateEntitySubscription(Clause? clause = null)
        {
            ToriiWasmInterop.UpdateEntitySubscription(clientPtr, entitySubscription, new CString(JsonConvert.SerializeObject(clause)));
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

        public async Task<IntPtr> RegisterEventMessageUpdateEvent(Clause? clause = null)
        {
            SubscriptionHelper.Tcs = new TaskCompletionSource<IntPtr>();
            ToriiWasmInterop.OnEventMessageUpdated(clientPtr, new CString(JsonConvert.SerializeObject(clause)), OnEventMessageUpdatedHelper.Callback, SubscriptionHelper.Callback);
            return await SubscriptionHelper.Tcs.Task;
        }

        public void UpdateEventMessageSubscription(Clause? clause = null)
        {
            ToriiWasmInterop.UpdateEventMessageSubscription(clientPtr, eventMessageSubscription, new CString(JsonConvert.SerializeObject(clause)));
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
            public static TaskCompletionSource<Page<Token>> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string tokens)
            {
                var parsedTokens = JsonConvert.DeserializeObject<Page<WasmToken>>(tokens);
                Tcs.SetResult(new Page<Token>(parsedTokens.items.Select(t => new Token(new FieldElement(t.contract_address), BigInteger.Parse(t.token_id.Substring(2), System.Globalization.NumberStyles.HexNumber), t.name, t.symbol, t.decimals, JsonConvert.DeserializeObject<Dictionary<string, object>>(t.metadata))).ToArray(), parsedTokens.nextCursor));
            }
        }

        public Task<Page<Token>> Tokens(FieldElement[] contractAddresses = null, BigInteger[] tokenIds = null, int limit = 0, string cursor = null)
        {
            if (contractAddresses == null) contractAddresses = new FieldElement[] { };
            if (tokenIds == null) tokenIds = new BigInteger[] { };

            GetTokensHelper.Tcs = new TaskCompletionSource<Page<Token>>();
            ToriiWasmInterop.GetTokens(clientPtr, new CString(JsonConvert.SerializeObject(contractAddresses)), new CString(JsonConvert.SerializeObject(tokenIds)), limit, new CString(cursor), GetTokensHelper.Callback);
            return GetTokensHelper.Tcs.Task;
        }

        private static class GetTokenBalancesHelper
        {
            public static TaskCompletionSource<Page<TokenBalance>> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string tokenBalances)
            {
                var parsedTokenBalances = JsonConvert.DeserializeObject<Page<WasmTokenBalance>>(tokenBalances);
                Tcs.SetResult(new Page<TokenBalance>(parsedTokenBalances.items.Select(t => new TokenBalance(BigInteger.Parse(t.balance.Substring(2), System.Globalization.NumberStyles.HexNumber), new FieldElement(t.account_address), new FieldElement(t.contract_address), BigInteger.Parse(t.token_id.Substring(2), System.Globalization.NumberStyles.HexNumber))).ToArray(), parsedTokenBalances.nextCursor));
            }
        }

        public Task<Page<TokenBalance>> TokenBalances(FieldElement[] contractAddresses = null, FieldElement[] accountAddresses = null, BigInteger[] tokenIds = null, int limit = 0, string cursor = null)
        {
            if (contractAddresses == null) contractAddresses = new FieldElement[] { };
            if (accountAddresses == null) accountAddresses = new FieldElement[] { };
            if (tokenIds == null) tokenIds = new BigInteger[] { };

            GetTokenBalancesHelper.Tcs = new TaskCompletionSource<Page<TokenBalance>>();
            ToriiWasmInterop.GetTokenBalances(clientPtr, new CString(JsonConvert.SerializeObject(contractAddresses)), new CString(JsonConvert.SerializeObject(accountAddresses)), new CString(JsonConvert.SerializeObject(tokenIds)), limit, new CString(cursor), GetTokenBalancesHelper.Callback);
            return GetTokenBalancesHelper.Tcs.Task;
        }

        private static class OnTokenUpdatedHelper
        {

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string token)
            {
                var parsedToken = JsonConvert.DeserializeObject<WasmToken>(token);
                // go from hex string to BigInteger
                var tokenId = BigInteger.Parse(parsedToken.token_id.Substring(2), System.Globalization.NumberStyles.HexNumber);
                ToriiEvents.Instance.TokenUpdated(new Token(new FieldElement(parsedToken.contract_address), tokenId, parsedToken.name, parsedToken.symbol, parsedToken.decimals, JsonConvert.DeserializeObject<Dictionary<string, object>>(parsedToken.metadata)));
            }
        }

        public async Task<IntPtr> RegisterTokenUpdateEvent(FieldElement[] contractAddresses = null, BigInteger[] tokenIds = null)
        {
            if (contractAddresses == null) contractAddresses = new FieldElement[] { };
            if (tokenIds == null) tokenIds = new BigInteger[] { };

            SubscriptionHelper.Tcs = new TaskCompletionSource<IntPtr>();
            ToriiWasmInterop.OnTokenUpdated(clientPtr, new CString(JsonConvert.SerializeObject(contractAddresses)), new CString(JsonConvert.SerializeObject(tokenIds)), OnTokenUpdatedHelper.Callback, SubscriptionHelper.Callback);
            return await SubscriptionHelper.Tcs.Task;
        }

        private static class OnTokenBalanceUpdatedHelper
        {
            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string tokenBalance)
            {
                var parsedTokenBalance = JsonConvert.DeserializeObject<WasmTokenBalance>(tokenBalance);
                var tokenId = BigInteger.Parse(parsedTokenBalance.token_id.Substring(2), System.Globalization.NumberStyles.HexNumber);
                var balance = BigInteger.Parse(parsedTokenBalance.balance.Substring(2), System.Globalization.NumberStyles.HexNumber);
                ToriiEvents.Instance.TokenBalanceUpdated(new TokenBalance(balance, new FieldElement(parsedTokenBalance.account_address), new FieldElement(parsedTokenBalance.contract_address), tokenId));
            }
        }

        public async Task<IntPtr> RegisterTokenBalanceUpdateEvent(FieldElement[] contractAddresses = null, FieldElement[] accountAddresses = null, BigInteger[] tokenIds = null)
        {
            if (contractAddresses == null) contractAddresses = new FieldElement[] { };
            if (accountAddresses == null) accountAddresses = new FieldElement[] { };
            if (tokenIds == null) tokenIds = new BigInteger[] { };

            SubscriptionHelper.Tcs = new TaskCompletionSource<IntPtr>();
            ToriiWasmInterop.OnTokenBalanceUpdated(clientPtr, new CString(JsonConvert.SerializeObject(contractAddresses)), new CString(JsonConvert.SerializeObject(accountAddresses)), new CString(JsonConvert.SerializeObject(tokenIds)), OnTokenBalanceUpdatedHelper.Callback, SubscriptionHelper.Callback);
            return await SubscriptionHelper.Tcs.Task;
        }
    }
}