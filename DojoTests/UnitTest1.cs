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
        var world = "0x31571485922572446df9e3198a891e10d3a48e544544317dbcbb667e15848cd";
        var entities = new List<dojo.Keys>();
        var player = new dojo.Keys{};
        player.model = "Moves";
        player.keys = new CString[] { CString.FromString("0x517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973") };
        

        entities.Add(player);
        
        client = new ToriiClient(toriiUrl, rpcUrl, world, entities.ToArray());

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
        var query = new dojo.Keys
        {
            _model = CString.FromString(""),

        };

        var entity = client.Entity(query);
    }

    [Test]
    public void TestAddEntitiesToSync()
    {
        var entities = new dojo.Keys[] { new dojo.Keys { _model = CString.FromString(""), } };

        client.AddEntitiesToSync(entities);

        //TODO: Check that the entities are in the sync list
        
    }

    [Test]
    public void TestRemoveEntitiesToSync()
    {
        var entities = new dojo.Keys[] { new dojo.Keys { _model = CString.FromString("") } };

        client.RemoveEntitiesToSync(entities);
    }

    [Test]
    public void TestOnEntityStateUpdate()
    {
        dojo.FnPtr_Void.@delegate callback = () => {
            
        };
        client.OnEntityStateUpdate(new dojo.Keys
        {
            _model = CString.FromString(""),
            
        }, new dojo.FnPtr_Void(callback));
    }
}