using System.Collections;
using System.Collections.Generic;
using Dojo.Torii;
using dojo_bindings;
using UnityEngine;

namespace Dojo
{
    public class ModelInstance : MonoBehaviour
    {
        public virtual void Initialize(Model model) {

        }

        public virtual void OnUpdated(Model model) {
            Initialize(model);
        }
    }
}
