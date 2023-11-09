using System.Collections;
using System.Collections.Generic;
using System.Numerics;
using UnityEngine;

namespace Types
{
    // Enumeration representing various entry points or functions available in the World.
    public static class WorldEntryPoints
    {
        public const string Get = "entity";  // Retrieve a single entity
        public const string Set = "set_entity";  // Set or update a single entity
        public const string Entities = "entities";  // Retrieve multiple entities
        public const string Execute = "execute";  // Execute a specific command
        public const string RegisterSystem = "register_system";  // Register a new system
        public const string RegisterComponent = "register_component";  // Register a new component
        public const string Component = "component";  // Access a component
        public const string System = "system";  // Access a system
    }

    // Class representing a query structure with domain and keys.
    public class Query
    {
        public string AddressDomain { get; set; }  // The domain or scope of the address being queried
        public List<BigInteger> Keys { get; set; }  // A list of keys used in the query
    }

}
