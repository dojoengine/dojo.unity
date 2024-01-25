using System;
using Dojo.Starknet;
using dojo_bindings;

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
        public delegate void OnMessageDelegate(string propagationSource, string source, string messageId, string topic, Span<byte> data);
        
        public event OnEntityStateUpdateDelegate OnEntityUpdated;
        public event OnSyncModelUpdateDelegate OnSyncModelUpdated;
        public event OnMessageDelegate OnMessage;
        
        public void EntityUpdated(FieldElement key, Model[] models)
        {
            OnEntityUpdated?.Invoke(key, models);
        }
        
        public void SyncModelUpdated()
        {
            OnSyncModelUpdated?.Invoke();
        }

        public void Message(string propagationSource, string source, string messageId, string topic, Span<byte> data)
        {
            OnMessage?.Invoke(propagationSource, source, messageId, topic, data);
        }
    }
}