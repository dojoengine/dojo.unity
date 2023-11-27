using bottlenoselabs.C2CS.Runtime;
using Dojo;
using dojo_bindings;

namespace DojoTests;

public class Tests
{
    ToriiClient client;

    [SetUp]
    public void Setup()
    {
        var toriiUrl = "http://0.0.0.0:8080";
        var rpcUrl = "http://0.0.0.0:5050";
        var world = new dojo.FieldElement { };
        var entities = new dojo.EntityQuery[] { new dojo.EntityQuery { _model = CString.FromString("") } };
        
        client = new ToriiClient(toriiUrl, rpcUrl, world, entities);

        if (client == null)
        {
            throw new Exception("client is null");
        }
    }

    [Test]
    public void TestWorldMetadata()
    {
        var worldAddress = new dojo.FieldElement { };

        var worldMetadata = client.WorldMetadata();

        Assert.That(worldAddress, Is.EqualTo(worldMetadata.world_address));
        // Check other fields
    }

    [Test]
    public void TestEntity()
    {
        var query = new dojo.EntityQuery
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
        };

        var entity = client.Entity(query);
    }

    [Test]
    public void TestAddEntitiesToSync()
    {
        var entities = new dojo.EntityQuery[] { new dojo.EntityQuery { _model = CString.FromString("") } };

        client.AddEntitiesToSync(entities);

        //TODO: Check that the entities are in the sync list
        
    }

    [Test]
    public void TestRemoveEntitiesToSync()
    {
        var entities = new dojo.EntityQuery[] { new dojo.EntityQuery { _model = CString.FromString("") } };

        client.RemoveEntitiesToSync(entities);
    }

    [Test]
    public void TestOnEntityStateUpdate()
    {
        dojo.FnPtr_Void.@delegate callback = () => {
            
        };
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
    }
}