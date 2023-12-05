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
        var entities = new dojo.KeysClause[] {
            new dojo.KeysClause {
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

        // models should correspond to Moves and Position
        var movesExists = false;
        var positionExists = false;
        foreach (var cHashItemCCharModelMetadata in worldMetadata.models)
        {
            var modelMetadata = cHashItemCCharModelMetadata.value;
            switch (modelMetadata.name.ToString())
            {
                case "":
                    
                case "Moves":
                    movesExists = true;
                    
                    Assert.That(modelMetadata.schema.tag, Is.EqualTo(dojo.Ty_Tag.TyStruct));
                    Assert.That(modelMetadata.schema.ty_struct.children[0].name.ToString(), Is.EqualTo("player"));
                    Assert.That(modelMetadata.schema.ty_struct.children[1].name.ToString(), Is.EqualTo("remaining"));
                    Assert.That(modelMetadata.schema.ty_struct.children[2].name.ToString(), Is.EqualTo("last_direction"));
                    
                    // maybe worth verifying the field types?
                    
                    break;
                case "Position":
                    positionExists = true;
                    
                    Assert.That(modelMetadata.schema.tag, Is.EqualTo(dojo.Ty_Tag.TyStruct));
                    Assert.That(modelMetadata.schema.ty_struct.children[0].name.ToString(), Is.EqualTo("player"));
                    Assert.That(modelMetadata.schema.ty_struct.children[1].name.ToString(), Is.EqualTo("vec"));
                    
                    // maybe worth verifying the field types?
                    
                    break;
            }
        }
        
        Assert.That(worldMetadata.world_address.data.ToArray(), Is.EqualTo(worldAddressBytes));
        Assert.That(movesExists, Is.True);
        Assert.That(positionExists, Is.True);
    }

    [Test]
    public void TestEntities()
    {
        var query = new dojo.Query()
        {
            limit = 5,
            clause = new dojo.Clause()
            {
                tag = dojo.Clause_Tag.Keys,
                keys = new dojo.KeysClause()
                {
                    model = "Moves",
                    keys = new string[] { playerKey }
                }
            }
        };
        
        var entities = client.Entities(query);
        Assert.That(entities.Length, Is.EqualTo(1));
    }
    
    [Test]
    public void TestEntity()
    {
        var query = new dojo.KeysClause()
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
        var entities = new dojo.KeysClause[] { new dojo.KeysClause() { _model = CString.FromString("Moves"), keys = new string[] { playerKey } } };
        client.AddEntitiesToSync(entities);

        var subscribedEntities = client.SubscribedEntities();

        for (int i = 0; i < subscribedEntities.Length; i++)
        {
            Assert.That(subscribedEntities[i].model.ToString(), Is.EqualTo("Moves"));
            Assert.That(subscribedEntities[i].keys[0].ToString(), Is.EqualTo(playerKey));
        }
    }

    [Test]
    public void TestRemoveEntitiesToSync()
    {
        var entities = new dojo.KeysClause[] { new dojo.KeysClause { model = "Moves", keys = new string[] { playerKey } } };
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
        client.OnEntityStateUpdate(new dojo.KeysClause()
        {
            model = "Moves",
            keys = new string[] { playerKey }

        }, new dojo.FnPtr_Void(callback));
    }
}