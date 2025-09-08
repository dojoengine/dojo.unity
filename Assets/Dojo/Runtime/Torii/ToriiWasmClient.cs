#if UNITY_WEBGL && !UNITY_EDITOR
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
        private FieldElement world;
        public IntPtr clientPtr;

        IntPtr entitySubscription;
        IntPtr eventMessageSubscription;
        IntPtr tokenSubscription;
        IntPtr tokenBalanceSubscription;

        public ToriiWasmClient(string toriiUrl, FieldElement world)
        {
            this.toriiUrl = toriiUrl;
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
            ToriiWasmInterop.CreateClient(new CString(toriiUrl), new CString(world.Hex()), CreateClientHelper.Callback);
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

                    entityList.Add(new Entity(entity));
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

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string entity)
            {
                var parsedEntity = JsonConvert.DeserializeObject<WasmEntity>(entity);
                ToriiEvents.Instance.EntityUpdated(new Entity(parsedEntity));
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
            ToriiWasmInterop.OnEntityUpdated(clientPtr, new CString(clause != null ? JsonConvert.SerializeObject(clause) : ""), OnEntityUpdatedHelper.Callback, SubscriptionHelper.Callback);
            return await SubscriptionHelper.Tcs.Task;
        }

        public void UpdateEntitySubscription(Clause? clause = null)
        {
            ToriiWasmInterop.UpdateEntitySubscription(clientPtr, entitySubscription, new CString(clause != null ? JsonConvert.SerializeObject(clause) : ""));
        }

        private static class OnEventMessageUpdatedHelper
        {

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string entity)
            {
                var parsedEntity = JsonConvert.DeserializeObject<WasmEntity>(entity);
                ToriiEvents.Instance.EventMessageUpdated(new Entity(parsedEntity));
            }
        }

        public async Task<IntPtr> RegisterEventMessageUpdateEvent(Clause? clause = null)
        {
            SubscriptionHelper.Tcs = new TaskCompletionSource<IntPtr>();
            ToriiWasmInterop.OnEventMessageUpdated(clientPtr, new CString(clause != null ? JsonConvert.SerializeObject(clause) : ""), OnEventMessageUpdatedHelper.Callback, SubscriptionHelper.Callback);
            return await SubscriptionHelper.Tcs.Task;
        }

        public void UpdateEventMessageSubscription(Clause? clause = null)
        {
            ToriiWasmInterop.UpdateEventMessageSubscription(clientPtr, eventMessageSubscription, new CString(clause != null ? JsonConvert.SerializeObject(clause) : ""));
        }

        private static class PublishMessageHelper
        {
            public static TaskCompletionSource<FieldElement> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string messageId)
            {
                Tcs.SetResult(new FieldElement(messageId));
            }
        }

        public Task<FieldElement> PublishMessage(TypedData typedData, FieldElement[] signature)
        {
            PublishMessageHelper.Tcs = new TaskCompletionSource<FieldElement>();
            ToriiWasmInterop.PublishMessage(clientPtr, new CString(JsonConvert.SerializeObject(typedData)), new CString(JsonConvert.SerializeObject(signature)), PublishMessageHelper.Callback);
            return PublishMessageHelper.Tcs.Task;
        }

        private static class GetControllersHelper
        {
            public static TaskCompletionSource<Page<Controller>> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string controllers)
            {
                var parsedControllers = JsonConvert.DeserializeObject<Page<WasmController>>(controllers);
                Tcs.SetResult(new Page<Controller>(parsedControllers.items.Select(c => new Controller(c.address, c.username, DateTimeOffset.FromUnixTimeSeconds(c.deployed_at_timestamp).DateTime)).ToArray(), parsedControllers.next_cursor));
            }
        }

        public Task<Page<Controller>> Controllers(ControllerQuery query)
        {
            GetControllersHelper.Tcs = new TaskCompletionSource<Page<Controller>>();
            ToriiWasmInterop.GetControllers(clientPtr, new CString(JsonConvert.SerializeObject(query)), GetControllersHelper.Callback);
            return GetControllersHelper.Tcs.Task;
        }

        private static class GetTokensHelper
        {
            public static TaskCompletionSource<Page<Token>> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string tokens)
            {
                var parsedTokens = JsonConvert.DeserializeObject<Page<WasmToken>>(tokens);
                Tcs.SetResult(new Page<Token>(parsedTokens.items.Select(t => new Token(t)).ToArray(), parsedTokens.next_cursor));
            }
        }

        public Task<Page<Token>> Tokens(TokenQuery query)
        {
            GetTokensHelper.Tcs = new TaskCompletionSource<Page<Token>>();
            ToriiWasmInterop.GetTokens(clientPtr, new CString(JsonConvert.SerializeObject(query)), GetTokensHelper.Callback);
            return GetTokensHelper.Tcs.Task;
        }

        private static class GetTokenBalancesHelper
        {
            public static TaskCompletionSource<Page<TokenBalance>> Tcs;

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string tokenBalances)
            {
                var parsedTokenBalances = JsonConvert.DeserializeObject<Page<WasmTokenBalance>>(tokenBalances);
                Tcs.SetResult(new Page<TokenBalance>(parsedTokenBalances.items.Select(t => new TokenBalance(t)).ToArray(), parsedTokenBalances.next_cursor));
            }
        }

        public Task<Page<TokenBalance>> TokenBalances(TokenBalanceQuery query)
        {
            GetTokenBalancesHelper.Tcs = new TaskCompletionSource<Page<TokenBalance>>();
            ToriiWasmInterop.GetTokenBalances(clientPtr, new CString(JsonConvert.SerializeObject(query)), GetTokenBalancesHelper.Callback);
            return GetTokenBalancesHelper.Tcs.Task;
        }

        private static class OnTokenUpdatedHelper
        {

            [MonoPInvokeCallback(typeof(Action<string>))]
            public static void Callback(string token)
            {
                var parsedToken = JsonConvert.DeserializeObject<WasmToken>(token);
                // go from hex string to BigInteger
                var tokenId = parsedToken.token_id != null ? BigInteger.Parse(parsedToken.token_id.Substring(2), System.Globalization.NumberStyles.HexNumber) : (BigInteger?)null;
                ToriiEvents.Instance.TokenUpdated(new Token(parsedToken));
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
                var tokenId = parsedTokenBalance.token_id != null ? BigInteger.Parse(parsedTokenBalance.token_id.Substring(2), System.Globalization.NumberStyles.HexNumber) : (BigInteger?)null;
                var balance = BigInteger.Parse(parsedTokenBalance.balance.Substring(2), System.Globalization.NumberStyles.HexNumber);
                ToriiEvents.Instance.TokenBalanceUpdated(new TokenBalance(parsedTokenBalance));
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
#endif // UNITY_WEBGL
