using System.Runtime.InteropServices;
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
        // Use root directory to load the native library
        Environment.CurrentDirectory = "../../../../";
        var toriiUrl = "http://0.0.0.0:8080";
        var rpcUrl = "http://0.0.0.0:5050";
        var entities = new dojo.Keys[] {
            new dojo.Keys {
                model = "Moves",
                keys = new string[] { playerKey }
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
        
        var worldAddressBytes = Enumerable.Range(2, worldAddress.Length-2)
                     .Where(x => x % 2 == 0)
                     .Select(x => Convert.ToByte(worldAddress.Substring(x, 2), 16))
                     .ToArray();

        Assert.That(worldMetadata.world_address.data.ToArray(), Is.EqualTo(worldAddressBytes));
    }

    [Test]
    public void TestEntity()
    {
        var query = new dojo.Keys
        {
            model = "Moves",
            keys = new string[] { playerKey }

        };

        var entity = client.Entity(query);

        Assert.That(entity.struct_.name, Is.EqualTo("Moves"));
        Assert.That(entity.struct_.children[0].name, Is.EqualTo("player"));
    }

    [Test]
    public void TestAddEntitiesToSync()
    {
        var playerKeyBytes = Enumerable.Range(2, playerKey.Length-2)
                     .Where(x => x % 2 == 0)
                     .Select(x => Convert.ToByte(playerKey.Substring(x, 2), 16))
                     .ToArray();

        var entities = new dojo.Keys[] { new dojo.Keys { _model = CString.FromString("Moves"), keys = new string[] { playerKey } } };
        client.AddEntitiesToSync(entities);

        var subscribedEntities = client.SubscribedEntities();

        for (int i = 0; i < subscribedEntities.Length; i++)
        {
            Assert.That(subscribedEntities[i].model.ToString(), Is.EqualTo("Moves"));
            Assert.That(subscribedEntities[i].keys[0].data.ToArray(), Is.EqualTo(playerKeyBytes));
        }
    }

    [Test]
    public void TestRemoveEntitiesToSync()
    {
        var entities = new dojo.Keys[] { new dojo.Keys { model = "Moves", keys = new string[] { playerKey } } };
        client.AddEntitiesToSync(entities);
        client.RemoveEntitiesToSync(entities);

        var subscribedEntities = client.SubscribedEntities();
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
            keys = new string[] { playerKey }

        }, new dojo.FnPtr_Void(callback));
    }
}