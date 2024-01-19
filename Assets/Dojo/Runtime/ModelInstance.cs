using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Dojo.Starknet;
using Dojo.Torii;
using dojo_bindings;
using UnityEngine;
using UnityEngine.Events;
using System.Numerics;

namespace Dojo
{
    [AttributeUsage(AttributeTargets.Field)]
    public class ModelField : Attribute
    {
        public string Name { get; }

        public ModelField(string name)
        {
            Name = name;
        }
    }

    // Base class for the definition of a model
    public abstract class ModelInstance : MonoBehaviour
    {
        public UnityEvent OnUpdated = new UnityEvent();

        // Initialize the model instance with the model
        // Uses the ModelField attribute to map the model fields to the class fields
        // One can override this method to do custom initialization
        // If reflection isn't an option.
        // Called upon instantiation and model update
        public virtual void Initialize(Model model)
        {
            var fields = GetType().GetFields();
            foreach (var field in fields)
            {
                // Check if the field has the ModelField attribute
                var attribute = field.GetCustomAttributes(typeof(ModelField), false);
                if (attribute.Length == 0)
                {
                    continue;
                }

                var modelField = (ModelField)attribute[0];
                var value = model.Members[modelField.Name];

                HandleField(this, field, value);
            }
        }

        // Handles the initialization of a field
        // of a model instance. Uses reflection to set the field
        // to the value of the model member.
        private static void HandleField(object instance, System.Reflection.FieldInfo field, object value)
        {
            // if the field is an enum, we need to convert the value to the enum type
            if (field.FieldType.IsEnum)
            {
                field.SetValue(instance, Enum.ToObject(field.FieldType, value));
            }
            // if the field is a primitive, we can just set it
            // fieldelement is included as a primitive because its a class
            // but its already instantiated
            else if (field.FieldType.IsPrimitive || field.FieldType == typeof(FieldElement) || field.FieldType == typeof(BigInteger))
            {
                field.SetValue(instance, Convert.ChangeType(value, field.FieldType));
            }
            // if the field is a struct/class. we check if our member is a dictionary
            // and we go through each of its keys and values and set them to the fields
            // of the instantiated struct/class
            else
            {
                if (!(value is Dictionary<string, object> dict))
                {
                    throw new Exception($"Expected a dictionary for field {field.Name} but got {value.GetType()}. Cannot cast primitive types to structs/classes.");
                }

                // we create an instance of the type
                var fieldInstance = Activator.CreateInstance(field.FieldType);
                // we set our dict values to the instance fields
                foreach (var kvp in dict)
                {
                    var instanceField = field.FieldType.GetField(kvp.Key);
                    if (instanceField == null)
                    {
                        throw new Exception($"Field {kvp.Key} not found in type {field.FieldType}");
                    }
                    HandleField(fieldInstance, instanceField, kvp.Value);
                }

                // we set the instance to the field
                field.SetValue(instance, fieldInstance);
            }
        }

        // Called when the model is updated
        public virtual void OnUpdate(Model model)
        {
            Initialize(model);
            OnUpdated.Invoke();
        }
    }
}
