using System;
using Dojo.Starknet;
using dojo_bindings;
using UnityEngine;

namespace Dojo.Torii
{
    public class ToriiEvents
    {
        private static ToriiEvents instance;

        public static ToriiEvents Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new ToriiEvents();
                }

                return instance;
            }
        }

        public delegate void OnSyncModelUpdateDelegate();
        public delegate void OnEntityStateUpdateDelegate(Entity entity);
        public delegate void OnEventMessageUpdateDelegate(Entity entity);
        public delegate void OnTokenUpdateDelegate(Token token);
        public delegate void OnTokenBalanceUpdateDelegate(TokenBalance tokenBalance);

        public event OnEntityStateUpdateDelegate OnEntityUpdated;
        public event OnEventMessageUpdateDelegate OnEventMessageUpdated;
        public event OnSyncModelUpdateDelegate OnSyncModelUpdated;
        public event OnTokenUpdateDelegate OnTokenUpdated;
        public event OnTokenBalanceUpdateDelegate OnTokenBalanceUpdated;

        public void EventMessageUpdated(Entity entity)
        {
            OnEventMessageUpdated?.Invoke(entity);
        }

        public void EntityUpdated(Entity entity)
        {
            OnEntityUpdated?.Invoke(entity);
        }

        public void SyncModelUpdated()
        {
            OnSyncModelUpdated?.Invoke();
        }

        public void TokenUpdated(Token token)
        {
            OnTokenUpdated?.Invoke(token);
        }

        public void TokenBalanceUpdated(TokenBalance tokenBalance)
        {
            OnTokenBalanceUpdated?.Invoke(tokenBalance);
        }
    }
}