using System.Runtime.CompilerServices;
using bottlenoselabs.C2CS.Runtime;
using Dojo;
using dojo_bindings;

internal class Example
{
    private static void OnEntityStateUpdate()
    {
        // React
    }

    unsafe static void Main()
    {
        // Initialize world data
        var data = new byte[32];
        dojo.FieldElement world;
        fixed (byte* ptr = &data[0])
        {
            world = new dojo.FieldElement { _data = ptr };
        }
        // Initialize entities
        var entities = new dojo.EntityQuery[] { new dojo.EntityQuery { _model = CString.FromString("Moves") } };

        // Throws an exception if the client cannot be created
        ToriiClient client = new ToriiClient("http://localhost:22", "http://localhost:1010", world, entities);
        
        // Get the world metadata
        dojo.WorldMetadata worldMetadata = client.WorldMetadata();

        // Add our entities to the sync list
        client.AddEntitiesToSync(entities);

        // Listen for updatest
        dojo.FnPtr_Void.@delegate callback = OnEntityStateUpdate;
        client.OnEntityStateUpdate(new dojo.EntityQuery
        {
            _model = CString.FromString(""),
            clause = new dojo.Clause
            {
                attribute = new dojo.AttributeClause
                {
                    _attribute = CString.FromString("name"),
                    operator_ = dojo.ComparisonOperator.Eq,
                    value = new dojo.Value
                    {
                        _v_string = CString.FromString("mimi")
                    }
                }
            }
        }, new dojo.FnPtr_Void(callback));

        client.RemoveEntitiesToSync(entities);
    }
}