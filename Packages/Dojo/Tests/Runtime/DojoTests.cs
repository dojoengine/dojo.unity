using System;
using System.Linq;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;
using NUnit.Framework;

public class Tests
{
    private readonly string toriiUrl = "http://0.0.0.0:8080";
    private readonly string rpcUrl = "http://0.0.0.0:5050";
    private readonly string playerKey = "0x0517ececd29116499f4a1b64b094da79ba08dfd54a3edaa316134c41f8160973";
    private readonly string worldAddress = "0x05010c31f127114c6198df8a5239e2b7a5151e1156fb43791e37e7385faa8138";
    private readonly string actionsAddress = "0x031571485922572446df9e3198a891e10d3a48e544544317dbcbb667e15848cd";
    
    private ToriiClient client;
    private Account account;

    // our callback will mutate this variable
    // we can use this to check that the callback was called
    // when our account spawns
    private bool entityUpdated = false;
    
    [SetUp]
    public void SetupTorii()
    {
        var entities = new dojo.KeysClause[]
        {
            new()
            {
                model = "Moves",
                keys = new string[]{ playerKey }
            }
        };

        client = new ToriiClient(toriiUrl, rpcUrl, worldAddress, entities);

        if (client == null) throw new Exception("client is null");

        client.StartSubscription();
    }

    [SetUp]
    public void SetupAccount()
    {
        account = new Account(rpcUrl, "0x1800000000300000180000000000030000000000003006001800006600", playerKey);
    }

    [Test]
    public void TestAccountAddress()
    {
        var address = account.Address();
        var playerAddressBytes = Enumerable.Range(2, playerKey.Length - 2)
            .Where(x => x % 2 == 0)
            .Select(x => Convert.ToByte(playerKey.Substring(x, 2), 16))
            .ToArray();
        
        Assert.That(address.data.ToArray(), Is.EqualTo(playerAddressBytes));
    }
    
    [Test]
    public void TestAccountChainId()
    {
        var chainId = account.ChainId();
        
        // check chainid?
    }
    
    [Test]
    public void TestAccountSetBlockId()
    {
        var blockId = new dojo.BlockId
        {
            tag = dojo.BlockId_Tag.BlockTag_,
            block_tag = dojo.BlockTag.Pending
        };
        
        account.SetBlockId(blockId);
    }

    [Test, Order(3)]
    public void TestAccountExecuteRaw()
    {
        dojo.Call call = new dojo.Call()
        {
            to = actionsAddress,
            selector = "spawn"
        };
        
        account.ExecuteRaw(new[] { call });
        
        // We wait until our callback is called to mark our 
        // entity as updated. We timeout after 5 seconds.
        var start = DateTime.Now;
        while (!entityUpdated && DateTime.Now - start < TimeSpan.FromSeconds(5))
        {
        }
        
        Assert.That(entityUpdated, Is.True);
    }

    [Test]
    public void TestWorldMetadata()
    {
        var worldMetadata = client.WorldMetadata();

        var worldAddressBytes = Enumerable.Range(2, worldAddress.Length - 2)
            .Where(x => x % 2 == 0)
            .Select(x => Convert.ToByte(worldAddress.Substring(x, 2), 16))
            .ToArray();

        // models should correspond to Moves and Position
        var movesExists = false;
        var positionExists = false;
        foreach (var cHashItemCCharModelMetadata in worldMetadata.models)
        {
            var modelMetadata = cHashItemCCharModelMetadata.value;
            switch (modelMetadata.name)
            {
                case "":

                case "Moves":
                    movesExists = true;

                    Assert.That(modelMetadata.schema.tag, Is.EqualTo(dojo.Ty_Tag.TyStruct));
                    Assert.That(modelMetadata.schema.ty_struct.children[0].name, Is.EqualTo("player"));
                    Assert.That(modelMetadata.schema.ty_struct.children[1].name, Is.EqualTo("remaining"));
                    Assert.That(modelMetadata.schema.ty_struct.children[2].name, Is.EqualTo("last_direction"));

                    // maybe worth verifying the field types?

                    break;
                case "Position":
                    positionExists = true;

                    Assert.That(modelMetadata.schema.tag, Is.EqualTo(dojo.Ty_Tag.TyStruct));
                    Assert.That(modelMetadata.schema.ty_struct.children[0].name, Is.EqualTo("player"));
                    Assert.That(modelMetadata.schema.ty_struct.children[1].name, Is.EqualTo("vec"));

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
        var query = new dojo.Query
        {
            limit = 5,
            clause = new dojo.Clause
            {
                tag = dojo.Clause_Tag.Keys,
                keys = new dojo.KeysClause
                {
                    model = "Moves",
                    keys = new[] { playerKey }
                }
            }
        };

        var entities = client.Entities(query);
        Assert.That(entities.Length, Is.EqualTo(1));
    }

    [Test]
    public void TestEntity()
    {
        var query = new dojo.KeysClause
        {
            model = "Moves",
            keys = new[] { playerKey }
        };

        var entity = client.Entity(query);

        Assert.That(entity.struct_.name, Is.EqualTo("Moves"));
        Assert.That(entity.struct_.children[0].name, Is.EqualTo("player"));
    }

    [Test, Order(1)]
    public void TestAddEntitiesToSync()
    {
        var entities = new dojo.KeysClause[]
            { new() { _model = CString.FromString("Position"), keys = new[] { playerKey } } };
        client.AddEntitiesToSync(entities);

        var subscribedEntities = client.SubscribedEntities();

        for (var i = 0; i < subscribedEntities.Length; i++)
        {
            Assert.That(subscribedEntities[i].model, Is.EqualTo("Moves"));
            Assert.That(subscribedEntities[i].keys[0], Is.EqualTo(playerKey));
        }
    }

    [Test, Order(4)]
    public void TestRemoveEntitiesToSync()
    {
        var entities = new dojo.KeysClause[] { new() { model = "Moves", keys = new[] { playerKey } } };
        client.RemoveEntitiesToSync(entities);

        var subscribedEntities = client.SubscribedEntities();
        Assert.That(subscribedEntities.Length, Is.EqualTo(0));
    }

    [Test, Order(2)]
    public void TestOnEntityStateUpdate()
    {
        dojo.FnPtr_Void.@delegate callback = () =>
        {
            entityUpdated = true;
        };
        client.OnEntityStateUpdate(new dojo.KeysClause
        {
            model = "Moves",
            keys = new[] { playerKey }
        }, new dojo.FnPtr_Void(callback));
    }
}