using System;
using System.Collections.Generic;
using bottlenoselabs.C2CS.Runtime;
using UnityEngine;
using dojo_bindings;
using Dojo.Starknet;
using Newtonsoft.Json;
using System.Linq;
using System.Numerics;

namespace Dojo.Torii
{
    public unsafe class ToriiClient
    {
        private dojo.FnPtr_FieldElement_CArrayStruct_Void.@delegate onEntityStateUpdate;
        private dojo.FnPtr_FieldElement_CArrayStruct_Void.@delegate onEventMessagesUpdate;
        private dojo.FnPtr_Token_Void.@delegate onTokenUpdate;
        private dojo.FnPtr_TokenBalance_Void.@delegate onTokenBalanceUpdate;
        private dojo.ToriiClient* client;
        private dojo.Subscription* entitySubscription;
        private dojo.Subscription* eventMessagesSubscription;
        private dojo.Subscription* tokenUpdateSubscription;
        private dojo.Subscription* tokenBalanceUpdateSubscription;

        public ToriiClient(string toriiUrl, string relayUrl, FieldElement worldAddress, bool dispatchEventsToMainThread = true)
        {
            CString ctoriiUrl = CString.FromString(toriiUrl);
            CString crelayUrl = CString.FromString(relayUrl);

            var result = dojo.client_new(ctoriiUrl, crelayUrl, worldAddress.Inner);
            if (result.tag == dojo.ResultToriiClient_Tag.ErrToriiClient)
            {
                throw new Exception(result.err.message);
            }

            client = result._ok;
            dojo.client_set_logger(client, new dojo.FnPtr_CString_Void((msg) => Debug.Log(msg)));

            RegisterEntityStateUpdateEvent(new EntityKeysClause[] { }, dispatchEventsToMainThread);
            RegisterEventMessageUpdateEvent(new EntityKeysClause[] { }, dispatchEventsToMainThread);
            RegisterTokenUpdateEvent(new FieldElement[] { }, new BigInteger[] { }, dispatchEventsToMainThread);
            RegisterTokenBalanceUpdateEvent(new FieldElement[] { }, new FieldElement[] { }, new BigInteger[] { }, dispatchEventsToMainThread);
        }

        // We assume the torii client won't be copied around.
        // So we can free the underlying c client when the managed client is garbage collected.
        ~ToriiClient()
        {
            dojo.subscription_cancel(entitySubscription);
            dojo.subscription_cancel(eventMessagesSubscription);
            dojo.subscription_cancel(tokenUpdateSubscription);
            dojo.subscription_cancel(tokenBalanceUpdateSubscription);

            dojo.client_free(client);
        }

        public dojo.WorldMetadata WorldMetadata()
        {
            // TODO: implement a managed type for WorldMetadata too
            dojo.ResultWorldMetadata result = dojo.client_metadata(client);
            if (result.tag == dojo.ResultWorldMetadata_Tag.ErrWorldMetadata)
            {
                throw new Exception(result.err.message);
            }

            return result.ok;
        }

        public List<Token> Tokens(FieldElement[] contractAddresses = null, BigInteger[] tokenIds = null)
        {
            if (contractAddresses == null) contractAddresses = new FieldElement[] { };
            if (tokenIds == null) tokenIds = new BigInteger[] { };

            var nativeContractAddresses = contractAddresses.Select(c => c.Inner).ToArray();
            var nativeTokenIds = tokenIds.Select(t =>
            {
                var bytes = t.ToByteArray();
                Array.Resize(ref bytes, 32);
                return new dojo.U256 { data = bytes.Reverse().ToArray() };
            }).ToArray();

            dojo.FieldElement* nativeContractAddressesPtr;
            fixed (dojo.FieldElement* ptr = nativeContractAddresses)
            {
                nativeContractAddressesPtr = ptr;
            }


            dojo.U256* nativeTokenIdsPtr;
            fixed (dojo.U256* ptr = nativeTokenIds)
            {
                nativeTokenIdsPtr = ptr;
            }

            dojo.ResultCArrayToken result = dojo.client_tokens(client, nativeContractAddressesPtr, (UIntPtr)nativeContractAddresses.Length, nativeTokenIdsPtr, (UIntPtr)nativeTokenIds.Length);
            if (result.tag == dojo.ResultCArrayToken_Tag.ErrCArrayToken)
            {
                throw new Exception(result.err.message);
            }

            return result.ok.ToArray().Select(t => new Token(new FieldElement(t.contract_address), new BigInteger(t.token_id.data, false, true), t.name, t.symbol, t.decimals, JsonConvert.DeserializeObject<Dictionary<string, object>>(t.metadata))).ToList();
        }

        public List<TokenBalance> TokenBalances(FieldElement[] contractAddresses = null, FieldElement[] accountAddresses = null, BigInteger[] tokenIds = null)
        {
            if (contractAddresses == null) contractAddresses = new FieldElement[] { };
            if (accountAddresses == null) accountAddresses = new FieldElement[] { };
            if (tokenIds == null) tokenIds = new BigInteger[] { };

            var nativeContractAddresses = contractAddresses.Select(c => c.Inner).ToArray();
            var nativeAccountAddresses = accountAddresses.Select(a => a.Inner).ToArray();
            var nativeTokenIds = tokenIds.Select(t =>
            {
                var bytes = t.ToByteArray();
                Array.Resize(ref bytes, 32);
                return new dojo.U256 { data = bytes.Reverse().ToArray() };
            }).ToArray();

            dojo.FieldElement* nativeAccountAddressesPtr;
            fixed (dojo.FieldElement* ptr = nativeAccountAddresses)
            {
                nativeAccountAddressesPtr = ptr;
            }

            dojo.FieldElement* nativeContractAddressesPtr;
            fixed (dojo.FieldElement* ptr = nativeContractAddresses)
            {
                nativeContractAddressesPtr = ptr;
            }

            dojo.U256* nativeTokenIdsPtr;
            fixed (dojo.U256* ptr = nativeTokenIds)
            {
                nativeTokenIdsPtr = ptr;
            }


            dojo.ResultCArrayTokenBalance result = dojo.client_token_balances(client, nativeAccountAddressesPtr, (UIntPtr)nativeAccountAddresses.Length, nativeContractAddressesPtr, (UIntPtr)nativeContractAddresses.Length, nativeTokenIdsPtr, (UIntPtr)nativeTokenIds.Length);
            if (result.tag == dojo.ResultCArrayTokenBalance_Tag.ErrCArrayTokenBalance)
            {
                throw new Exception(result.err.message);
            }

            return result.ok.ToArray().Select(t => new TokenBalance(new BigInteger(t.balance.data, false, true), new FieldElement(t.account_address), new FieldElement(t.contract_address), new BigInteger(t.token_id.data, false, true))).ToList();
        }


        public List<Entity> Entities(Query query, bool historical = false)
        {
            var nativeQuery = query.ToNative();

            dojo.ResultCArrayEntity result = dojo.client_entities(client, &nativeQuery, historical);
            if (result.tag == dojo.ResultCArrayEntity_Tag.ErrCArrayEntity)
            {
                throw new Exception(result.err.message);
            }

            var entities = new List<Entity>();
            for (var i = 0; i < (int)result._ok.data_len; i++)
            {
                entities.Add(new Entity(result._ok.data[i]));
            }

            dojo.carray_free(result._ok.data, result._ok.data_len);
            return entities;
        }

        public List<Entity> EventMessages(Query query, bool historical = false)
        {
            var nativeQuery = query.ToNative();

            dojo.ResultCArrayEntity result = dojo.client_event_messages(client, &nativeQuery, historical);
            if (result.tag == dojo.ResultCArrayEntity_Tag.ErrCArrayEntity)
            {
                throw new Exception(result.err.message);
            }

            var entities = new List<Entity>();
            for (var i = 0; i < (int)result._ok.data_len; i++)
            {
                entities.Add(new Entity(result._ok.data[i]));
            }

            dojo.carray_free(result._ok.data, result._ok.data_len);
            return entities;
        }

        private void RegisterEntityStateUpdateEvent(EntityKeysClause[] clauses, bool dispatchToMainThread = true)
        {
            onEntityStateUpdate = (key, models) =>
            {
                var mappedModels = new Model[(int)models.data_len];
                for (var i = 0; i < (int)models.data_len; i++)
                {
                    mappedModels[i] = new Model(models.data[i]);
                    // cleanup model
                    // dojo.model_free(&models.data[i]);
                }

                // only run this when in unity play mode
                // we need our unity main thread dispatcher to run this on the main thread
                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(() => ToriiEvents.Instance.EntityUpdated(new FieldElement(key), mappedModels));
                }
                else
                {
                    ToriiEvents.Instance.EntityUpdated(new FieldElement(key), mappedModels);
                }

                // cleanup
                dojo.carray_free(models.data, models.data_len);
                // TODO: free field element
            };


            dojo.EntityKeysClause* clausesPtr;
            var mappedClauses = clauses.Select(c => c.ToNative()).ToArray();
            fixed (dojo.EntityKeysClause* ptr = mappedClauses)
            {
                clausesPtr = ptr;
            }

            dojo.ResultSubscription res = dojo.client_on_entity_state_update(client, clausesPtr, (UIntPtr)clauses.Length, new dojo.FnPtr_FieldElement_CArrayStruct_Void(onEntityStateUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }

            entitySubscription = res._ok;
        }

        public void RegisterTokenUpdateEvent(FieldElement[] contractAddresses, BigInteger[] tokenIds, bool dispatchToMainThread = true)
        {
            var nativeContractAddresses = contractAddresses.Select(c => c.Inner).ToArray();
            var nativeTokenIds = tokenIds.Select(t =>
            {
                var bytes = t.ToByteArray();
                Array.Resize(ref bytes, 32);
                return new dojo.U256 { data = bytes.Reverse().ToArray() };
            }).ToArray();

            dojo.FieldElement* nativeContractAddressesPtr;
            fixed (dojo.FieldElement* ptr = nativeContractAddresses)
            {
                nativeContractAddressesPtr = ptr;
            }


            dojo.U256* nativeTokenIdsPtr;
            fixed (dojo.U256* ptr = nativeTokenIds)
            {
                nativeTokenIdsPtr = ptr;
            }

            onTokenUpdate = (token) =>
            {
                var mappedToken = new Token(new FieldElement(token.contract_address), new BigInteger(token.token_id.data, false, true), token.name, token.symbol, token.decimals, JsonConvert.DeserializeObject<Dictionary<string, object>>(token.metadata));
                Action emit = () => ToriiEvents.Instance.TokenUpdated(mappedToken);
                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(emit);
                }
                else
                {
                    emit();
                }
            };

            dojo.ResultSubscription res = dojo.client_on_token_update(client, nativeContractAddressesPtr, (UIntPtr)nativeContractAddresses.Length, nativeTokenIdsPtr, (UIntPtr)nativeTokenIds.Length, new dojo.FnPtr_Token_Void(onTokenUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }

            tokenUpdateSubscription = res._ok;
        }

        public void RegisterTokenBalanceUpdateEvent(FieldElement[] contractAddresses, FieldElement[] accountAddresses, BigInteger[] tokenIds, bool dispatchToMainThread = true)
        {
            var nativeContractAddresses = contractAddresses.Select(c => c.Inner).ToArray();
            var nativeAccountAddresses = accountAddresses.Select(a => a.Inner).ToArray();
            var nativeTokenIds = tokenIds.Select(t =>
            {
                var bytes = t.ToByteArray();
                Array.Resize(ref bytes, 32);
                return new dojo.U256 { data = bytes.Reverse().ToArray() };
            }).ToArray();

            dojo.FieldElement* nativeAccountAddressesPtr;
            fixed (dojo.FieldElement* ptr = nativeAccountAddresses)
            {
                nativeAccountAddressesPtr = ptr;
            }

            dojo.FieldElement* nativeContractAddressesPtr;
            fixed (dojo.FieldElement* ptr = nativeContractAddresses)
            {
                nativeContractAddressesPtr = ptr;
            }


            dojo.U256* nativeTokenIdsPtr;
            fixed (dojo.U256* ptr = nativeTokenIds)
            {
                nativeTokenIdsPtr = ptr;
            }

            onTokenBalanceUpdate = (balance) =>
            {
                var mappedTokenBalance = new TokenBalance(new BigInteger(balance.balance.data, false, true), new FieldElement(balance.account_address), new FieldElement(balance.contract_address), new BigInteger(balance.token_id.data, false, true));
                Action emit = () => ToriiEvents.Instance.TokenBalanceUpdated(mappedTokenBalance);
                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(emit);
                }
                else
                {
                    emit();
                }
            };

            dojo.ResultSubscription res = dojo.client_on_token_balance_update(client, nativeAccountAddressesPtr, (UIntPtr)nativeAccountAddresses.Length, nativeContractAddressesPtr, (UIntPtr)nativeContractAddresses.Length, nativeTokenIdsPtr, (UIntPtr)nativeTokenIds.Length, new dojo.FnPtr_TokenBalance_Void(onTokenBalanceUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }

            tokenBalanceUpdateSubscription = res._ok;
        }
        public void UpdateEntitySubscription(EntityKeysClause[] clauses)
        {
            var mappedClauses = clauses.Select(c => c.ToNative()).ToArray();
            dojo.EntityKeysClause* clausesPtr;
            fixed (dojo.EntityKeysClause* ptr = mappedClauses)
            {
                clausesPtr = ptr;
            }

            dojo.client_update_entity_subscription(client, entitySubscription, clausesPtr, (UIntPtr)clauses.Length);
        }

        private void RegisterEventMessageUpdateEvent(EntityKeysClause[] clauses, bool dispatchToMainThread = true)
        {
            onEventMessagesUpdate = (key, models) =>
            {
                var mappedModels = new Model[(int)models.data_len];
                for (var i = 0; i < (int)models.data_len; i++)
                {
                    mappedModels[i] = new Model(models.data[i]);
                    // cleanup model
                    // dojo.model_free(&models.data[i]);
                }

                // only run this when in unity play mode
                // we need our unity main thread dispatcher to run this on the main thread
                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(() => ToriiEvents.Instance.EventMessageUpdated(new FieldElement(key), mappedModels));
                }
                else
                {
                    ToriiEvents.Instance.EventMessageUpdated(new FieldElement(key), mappedModels);
                }

                // cleanup
                dojo.carray_free(models.data, models.data_len);
                // TODO: free field element
            };


            dojo.EntityKeysClause* clausesPtr;
            var mappedClauses = clauses.Select(c => c.ToNative()).ToArray();
            fixed (dojo.EntityKeysClause* ptr = mappedClauses)
            {
                clausesPtr = ptr;
            }

            dojo.ResultSubscription res = dojo.client_on_event_message_update(client, clausesPtr, (UIntPtr)clauses.Length, new dojo.FnPtr_FieldElement_CArrayStruct_Void(onEventMessagesUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }

            eventMessagesSubscription = res._ok;
        }

        public void UpdateEventMessageSubscription(EntityKeysClause[] clauses)
        {
            var mappedClauses = clauses.Select(c => c.ToNative()).ToArray();
            dojo.EntityKeysClause* clausesPtr;
            fixed (dojo.EntityKeysClause* ptr = mappedClauses)
            {
                clausesPtr = ptr;
            }


            dojo.client_update_event_message_subscription(client, eventMessagesSubscription, clausesPtr, (UIntPtr)clauses.Length);
        }

        public Span<byte> PublishMessage(TypedData typedData, FieldElement[] signature)
        {
            var mappedSignature = signature.Select(s => s.Inner).ToArray();
            dojo.FieldElement* signaturePtr;
            fixed (dojo.FieldElement* ptr = mappedSignature)
            {
                signaturePtr = ptr;
            }

            var result = dojo.client_publish_message(client, new CString(JsonConvert.SerializeObject(typedData)), signaturePtr, (UIntPtr)signature.Length);
            if (result.tag == dojo.ResultCArrayu8_Tag.ErrCArrayu8)
            {
                throw new Exception(result.err.message);
            }

            return result.ok;
        }
    }
}