using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Dojo.Torii;
using dojo_bindings;
using UnityEngine;
using UnityEngine.Events;

namespace Dojo
{
    // Base class for the definition of a model
    public abstract class ModelInstance : MonoBehaviour
    {
        public UnityEvent OnUpdated = new UnityEvent();

        public abstract void Initialize(Model model);

        public virtual void OnUpdate(Model model) {
            Initialize(model);
            OnUpdated.Invoke();
        }
    }
}
