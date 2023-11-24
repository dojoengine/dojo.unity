using System.Runtime.CompilerServices;
using bottlenoselabs.C2CS.Runtime;
using Dojo;
using dojo_bindings;

static class Example
{
    static void OnEntityStateUpdate()
    {
        // React
    }

    static void Main()
    {
        // Initialize world data
        var world = new dojo.FieldElement { };
        // Initialize entities
        var entities = new dojo.EntityQuery[] { new dojo.EntityQuery { _model = CString.FromString("") } };

        // Throws an exception if the client cannot be created
        ToriiClient client = new ToriiClient("http://localhost:1234", "http://localhost:1234", world, entities);

        // Add our entities to the sync list
        client.AddEntitiesToSync(entities);

        // Listen for updates
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
        }, Example.OnEntityStateUpdate);

        client.RemoveEntitiesToSync(entities);
    }
}