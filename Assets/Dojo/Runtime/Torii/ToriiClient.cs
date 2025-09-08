using System;
using System.Collections.Generic;
using bottlenoselabs.C2CS.Runtime;
using UnityEngine;
using dojo_bindings;
using Dojo.Starknet;
using Newtonsoft.Json;
using System.Linq;
using System.Numerics;
using System.Security.Cryptography;

namespace Dojo.Torii
{
    public struct Message
    {
        public string message;
        public FieldElement[] signature;

        public Message(string message, FieldElement[] signature)
        {
            this.message = message;
            this.signature = signature;
        }
    }

    public struct Controller
    {
        public FieldElement address;
        public string username;
        public DateTime deployedAt;

        public Controller(dojo.Controller controller)
        {
            address = new FieldElement(controller.address);
            username = controller.username;
            deployedAt = DateTimeOffset.FromUnixTimeSeconds((long)controller.deployed_at_timestamp).DateTime;
        }

        public Controller(string address, string username, DateTime deployedAt)
        {
            this.address = new FieldElement(address);
            this.username = username;
            this.deployedAt = deployedAt;
        }
    }

    public unsafe class ToriiClient
    {
        private dojo.FnPtr_Entity_Void.@delegate onEntityStateUpdate;
        private dojo.FnPtr_Entity_Void.@delegate onEventMessagesUpdate;
        private dojo.FnPtr_Token_Void.@delegate onTokenUpdate;
        private dojo.FnPtr_TokenBalance_Void.@delegate onTokenBalanceUpdate;
        private dojo.ToriiClient* client;
        private dojo.Subscription* entitySubscription;
        private dojo.Subscription* eventMessagesSubscription;
        private dojo.Subscription* tokenUpdateSubscription;
        private dojo.Subscription* tokenBalanceUpdateSubscription;

        public ToriiClient(string toriiUrl, FieldElement worldAddress, bool dispatchEventsToMainThread = true)
        {
            CString ctoriiUrl = CString.FromString(toriiUrl);

            var result = dojo.client_new(ctoriiUrl, worldAddress.Inner);
            if (result.tag == dojo.ResultToriiClient_Tag.ErrToriiClient)
            {
                throw new Exception(result.err.message);
            }

            client = result._ok;
            dojo.client_set_logger(client, new dojo.FnPtr_CString_Void((msg) => Debug.Log(msg)));

            RegisterEntityStateUpdateEvent(null, dispatchEventsToMainThread);
            RegisterEventMessageUpdateEvent(null, dispatchEventsToMainThread);
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

        public Page<Controller> Controllers(ControllerQuery query)
        {
            var nativeQuery = query.ToNative();
            dojo.ResultPageController result = dojo.client_controllers(client, nativeQuery);
            if (result.tag == dojo.ResultPageController_Tag.ErrPageController)
            {
                throw new Exception(result.err.message);
            }

            var items = result.ok.items.ToArray().Select(c => new Controller(c)).ToArray();
            var nextCursor = result.ok.next_cursor.tag == dojo.COptionc_char_Tag.Somec_char ? result.ok.next_cursor.some : null;

            dojo.carray_free(result.ok._items.data, result.ok._items.data_len);
            return new Page<Controller>(items, nextCursor);
        }

        public Page<Token> Tokens(TokenQuery query)
        {
            var nativeQuery = query.ToNative();

            dojo.ResultPageToken result = dojo.client_tokens(client, nativeQuery);
            if (result.tag == dojo.ResultPageToken_Tag.ErrPageToken)
            {
                throw new Exception(result.err.message);
            }

            var items = result.ok.items.ToArray().Select(t => new Token(t)).ToArray();
            var nextCursor = result.ok.next_cursor.tag == dojo.COptionc_char_Tag.Somec_char ? result.ok.next_cursor.some : null;

            dojo.carray_free(result.ok._items.data, result.ok._items.data_len);
            return new Page<Token>(items, nextCursor);
        }

        public Page<TokenBalance> TokenBalances(TokenBalanceQuery query)
        {
            var nativeQuery = query.ToNative();

            dojo.ResultPageTokenBalance result = dojo.client_token_balances(client, nativeQuery);
            if (result.tag == dojo.ResultPageTokenBalance_Tag.ErrPageTokenBalance)
            {
                throw new Exception(result.err.message);
            }

            var items = result.ok.items.ToArray().Select(t => new TokenBalance(t)).ToArray();
            var nextCursor = result.ok.next_cursor.tag == dojo.COptionc_char_Tag.Somec_char ? result.ok.next_cursor.some : null;

            dojo.carray_free(result.ok._items.data, result.ok._items.data_len);
            return new Page<TokenBalance>(items, nextCursor);
        }


        public Page<Entity> Entities(Query query, bool historical = false)
        {
            var nativeQuery = query.ToNative();

            dojo.ResultPageEntity result = dojo.client_entities(client, nativeQuery);
            if (result.tag == dojo.ResultPageEntity_Tag.ErrPageEntity)
            {
                throw new Exception(result.err.message);
            }

            var items = result.ok.items.ToArray().Select(e => new Entity(e)).ToArray();
            var nextCursor = result.ok.next_cursor.tag == dojo.COptionc_char_Tag.Somec_char ? result.ok.next_cursor.some : null;

            dojo.carray_free(result.ok._items.data, result.ok._items.data_len);
            return new Page<Entity>(items, nextCursor);
        }

        public Page<Entity> EventMessages(Query query)
        {
            var nativeQuery = query.ToNative();

            dojo.ResultPageEntity result = dojo.client_event_messages(client, nativeQuery);
            if (result.tag == dojo.ResultPageEntity_Tag.ErrPageEntity)
            {
                throw new Exception(result.err.message);
            }

            var items = result.ok.items.ToArray().Select(e => new Entity(e)).ToArray();
            var nextCursor = result.ok.next_cursor.tag == dojo.COptionc_char_Tag.Somec_char ? result.ok.next_cursor.some : null;

            dojo.carray_free(result.ok._items.data, result.ok._items.data_len);
            return new Page<Entity>(items, nextCursor);
        }

        private void RegisterEntityStateUpdateEvent(Clause? clause = null, bool dispatchToMainThread = true)
        {
            onEntityStateUpdate = (entity) =>
            {
                var mappedEntity = new Entity(entity);
                // only run this when in unity play mode
                // we need our unity main thread dispatcher to run this on the main thread
                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(() => ToriiEvents.Instance.EntityUpdated(mappedEntity));
                }
                else
                {
                    ToriiEvents.Instance.EntityUpdated(mappedEntity);
                }

                // cleanup
                dojo.carray_free(entity._models.data, entity._models.data_len);
                // TODO: free field element
            };


            var nativeClause = clause is null ? new dojo.COptionClause { tag = dojo.COptionClause_Tag.NoneClause } : new dojo.COptionClause { tag = dojo.COptionClause_Tag.SomeClause, some = clause.Value.ToNative() };
            dojo.ResultSubscription res = dojo.client_on_entity_state_update(client, nativeClause, new dojo.FnPtr_Entity_Void(onEntityStateUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }

            entitySubscription = res._ok;
        }

        public void RegisterTokenUpdateEvent(FieldElement[] contractAddresses = null, BigInteger[] tokenIds = null, bool dispatchToMainThread = true)
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

            onTokenUpdate = (token) =>
            {
                var mappedToken = new Token(token);
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

        public void RegisterTokenBalanceUpdateEvent(FieldElement[] contractAddresses = null, FieldElement[] accountAddresses = null, BigInteger[] tokenIds = null, bool dispatchToMainThread = true)
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

            onTokenBalanceUpdate = (balance) =>
            {
                var mappedTokenBalance = new TokenBalance(balance);
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
        public void UpdateEntitySubscription(Clause? clause = null)
        {
            var nativeClause = clause is null ? new dojo.COptionClause { tag = dojo.COptionClause_Tag.NoneClause } : new dojo.COptionClause { tag = dojo.COptionClause_Tag.SomeClause, some = clause.Value.ToNative() };
            dojo.client_update_entity_subscription(client, entitySubscription, nativeClause);
        }

        private void RegisterEventMessageUpdateEvent(Clause? clause = null, bool dispatchToMainThread = true)
        {
            onEventMessagesUpdate = (entity) =>
            {
                var mappedEntity = new Entity(entity);

                // only run this when in unity play mode
                // we need our unity main thread dispatcher to run this on the main thread
                if (dispatchToMainThread)
                {
                    UnityMainThreadDispatcher.Instance().Enqueue(() => ToriiEvents.Instance.EventMessageUpdated(mappedEntity));
                }
                else
                {
                    ToriiEvents.Instance.EventMessageUpdated(mappedEntity);
                }

                // cleanup
                dojo.carray_free(entity._models.data, entity._models.data_len);
                // TODO: free field element
            };


            var nativeClause = clause is null ? new dojo.COptionClause { tag = dojo.COptionClause_Tag.NoneClause } : new dojo.COptionClause { tag = dojo.COptionClause_Tag.SomeClause, some = clause.Value.ToNative() };

            dojo.ResultSubscription res = dojo.client_on_event_message_update(client, nativeClause, new dojo.FnPtr_Entity_Void(onEventMessagesUpdate));
            if (res.tag == dojo.ResultSubscription_Tag.ErrSubscription)
            {
                throw new Exception(res.err.message);
            }

            eventMessagesSubscription = res._ok;
        }

        public void UpdateEventMessageSubscription(Clause? clause = null)
        {
            var nativeClause = clause is null ? new dojo.COptionClause { tag = dojo.COptionClause_Tag.NoneClause } : new dojo.COptionClause { tag = dojo.COptionClause_Tag.SomeClause, some = clause.Value.ToNative() };
            dojo.client_update_event_message_subscription(client, eventMessagesSubscription, nativeClause);
        }

        public FieldElement PublishMessage(TypedData typedData, FieldElement[] signature)
        {
            var mappedSignature = signature.Select(s => s.Inner).ToArray();
            dojo.FieldElement* signaturePtr;
            fixed (dojo.FieldElement* ptr = mappedSignature)
            {
                signaturePtr = ptr;
            }

            var result = dojo.client_publish_message(client, new dojo.Message
            {
                message = JsonConvert.SerializeObject(typedData),
                signature = mappedSignature
            });
            if (result.tag == dojo.ResultFieldElement_Tag.ErrFieldElement)
            {
                throw new Exception(result.err.message);
            }

            return new FieldElement(result.ok);
        }
    }
}