using bottlenoselabs.C2CS.Runtime;
using Dojo;
using dojo_bindings;

namespace DojoTests;

public class Tests
{
    string worldAddress = "0x05010c31f127114c6198df8a5239e2b7a5151e1156fb43791e37e7385faa8138";
    string playerKey = "0x0517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973";
    ToriiClient client;

    [SetUp]
    public void Setup()
    {
        var toriiUrl = "http://0.0.0.0:8080";
        var rpcUrl = "http://0.0.0.0:5050";
        var entities = new dojo.Keys[] {
            new dojo.Keys {
                model = "Moves",
                keys = new CString[] { CString.FromString(playerKey) }
            }
        };

        client = new ToriiClient(toriiUrl, rpcUrl, worldAddress, entities);

        if (client == null)
        {
            throw new Exception("client is null");
        }

        client.StartSubscription();
    }

    [Test]
    public void TestWorldMetadata()
    {
        var worldMetadata = client.WorldMetadata();
        
        byte[] worldAddressBytes = Enumerable.Range(2, worldAddress.Length-2)
                     .Where(x => x % 2 == 0)
                     .Select(x => Convert.ToByte(worldAddress.Substring(x, 2), 16))
                     .ToArray();
    
        Assert.That(worldAddressBytes, Is.EqualTo(worldMetadata.world_address.data.ToArray()));
    }

    [Test]
    public void TestEntity()
    {
        var query = new dojo.Keys
        {
            model = "Moves",
            keys = new CString[] { CString.FromString(playerKey) }

        };

        var entity = client.Entity(query);

        // Assert.That(entity.ty_struct.name, Is.EqualTo("Moves"));
    }

    [Test]
    public void TestAddEntitiesToSync()
    {
        var entities = new dojo.Keys[] { new dojo.Keys { _model = CString.FromString("Moves"), keys = new CString[] { CString.FromString(playerKey) } } };
        client.AddEntitiesToSync(entities);

        var subscribedEntities = client.Entities();

        Assert.That(subscribedEntities.Length, Is.EqualTo(1));
    }

    [Test]
    public void TestRemoveEntitiesToSync()
    {
        var entities = new dojo.Keys[] { new dojo.Keys { _model = CString.FromString("Moves"), keys = new CString[] { CString.FromString(playerKey) } } };
        client.RemoveEntitiesToSync(entities);

        var subscribedEntities = client.Entities();

        Assert.That(subscribedEntities.Length, Is.EqualTo(0));
    }

    [Test]
    public void TestOnEntityStateUpdate()
    {
        dojo.FnPtr_Void.@delegate callback = () =>
        {

        };
        client.OnEntityStateUpdate(new dojo.Keys
        {
            model = "Moves",
            keys = new CString[] { CString.FromString(playerKey) }

        }, new dojo.FnPtr_Void(callback));
    }
}