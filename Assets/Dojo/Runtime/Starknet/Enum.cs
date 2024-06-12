using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Dojo.Starknet
{
    // The interface that all Starknet enums generated from the dojo-bindgen implement
    public interface Enum
    {
        // A static dictionary to keep track of the indices of each Enum implementing the Enum interface
        // The first dictionary is indexed by the Enum type, and the second dictionary is indexed by the Enum variant name
        // The value is the index of the Enum variant
        // This makes getting a Starknet enum variant index O(1) if we already cached the indices
        private static Dictionary<Type, IReadOnlyDictionary<string, int>> TypeIndices = new Dictionary<Type, IReadOnlyDictionary<string, int>>();

        // Get the index of the enum variant
        // This is needed as Starknet enums are represented as a Record in C#
        // Each enum variant is a nested class of the enum type, implementing the Enum itself.
        public static int GetIndex(Enum value)
        {
            var type = value.GetType();
            if (!TypeIndices.ContainsKey(type.BaseType))
            {
                TypeIndices[type.BaseType] = type.BaseType
                    .GetNestedTypes(BindingFlags.Public)
                    .OrderBy(t => t.MetadataToken)
                    .Select((type, index) => new { type, index })
                    .ToDictionary(t => t.type.Name, t => t.index);
            }


            return TypeIndices[type.BaseType][type.Name];
        }
    }
}