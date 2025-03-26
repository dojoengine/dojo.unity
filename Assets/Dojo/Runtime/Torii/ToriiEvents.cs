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
        public delegate void OnEntityStateUpdateDelegate(FieldElement key, Model[] models);
        public delegate void OnEventMessageUpdateDelegate(FieldElement key, Model[] models);
        public delegate void OnTokenUpdateDelegate(Token token);
        public delegate void OnTokenBalanceUpdateDelegate(TokenBalance tokenBalance);

        public event OnEntityStateUpdateDelegate OnEntityUpdated;
        public event OnEventMessageUpdateDelegate OnEventMessageUpdated;
        public event OnSyncModelUpdateDelegate OnSyncModelUpdated;
        public event OnTokenUpdateDelegate OnTokenUpdated;
        public event OnTokenBalanceUpdateDelegate OnTokenBalanceUpdated;

        protected void EventMessageUpdated(FieldElement key, Model[] models)
        {
            OnEventMessageUpdated?.Invoke(key, models);
        }

        protected void EntityUpdated(FieldElement key, Model[] models)
        {
            OnEntityUpdated?.Invoke(key, models);
        }

        protected void SyncModelUpdated()
        {
            OnSyncModelUpdated?.Invoke();
        }

        protected void TokenUpdated(Token token)
        {
            OnTokenUpdated?.Invoke(token);
        }

        protected void TokenBalanceUpdated(TokenBalance tokenBalance)
        {
            OnTokenBalanceUpdated?.Invoke(tokenBalance);
        }
    }
}