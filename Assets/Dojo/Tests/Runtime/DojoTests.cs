using System;
using System.Linq;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;
using NUnit.Framework;
using Dojo.Torii;
using Dojo.Starknet;
using UnityEditor.VersionControl;
using System.Diagnostics;
using UnityEngine;
using Debug = UnityEngine.Debug;
using UnityEngine.SceneManagement;
using UnityEngine.UIElements;

public class Tests
{
    private readonly string toriiUrl = "http://0.0.0.0:8080";
    private readonly string rpcUrl = "http://0.0.0.0:5050";
    private readonly string relayUrl = "/ip4/127.0.0.1/tcp/9090";
    // private readonly string playerKey = "0x028cd7ee02d7f6ec9810e75b930e8e607793b302445abbdee0ac88143f18da20";
    private readonly FieldElement playerAddress = new FieldElement("0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03");
    private readonly FieldElement worldAddress = new FieldElement("0x07efebb0c2d4cc285d48a97a7174def3be7fdd6b7bd29cca758fa2e17e03ef30");
    private readonly FieldElement actionsAddress = new FieldElement("0x5c70a663d6b48d8e4c6aaa9572e3735a732ac3765700d470463e670587852af");

    private ToriiClient client;
    private JsonRpcClient provider;
    private Account account;

    // our callbacks will mutate these variables
    // we can use this to check that the callback was called
    // when our account spawns
    private bool modelEntityUpdated = false;
    private bool entityUpdated = false;
    private bool eventMessageUpdated = false;

    [SetUp]
    public void SetupTorii()
    {
        client = new ToriiClient(toriiUrl, rpcUrl, relayUrl, worldAddress, false);

        if (client == null) throw new Exception("client is null");
    }

    [SetUp]
    public void SetupAccount()
    {
        provider = new JsonRpcClient(rpcUrl);

        var signer = new SigningKey("0x1800000000300000180000000000030000000000003006001800006600");

        account = new Account(provider, signer, playerAddress);
    }

    [Test]
    public void TestAccountAddress()
    {
        var address = account.Address;

        Assert.That(address, Is.EqualTo(playerAddress));
    }

    // [Test]
    // public void TestAccountChainId()
    // {
    //     // var chainId = account.ChainId();

    //     // check chainid?
    // }

    // [Test]
    // public void TestAccountSetBlockId()
    // {
    //     var blockId = new dojo.BlockId
    //     {
    //         tag = dojo.BlockId_Tag.BlockTag_,
    //         block_tag = dojo.BlockTag.Pending
    //     };

    //     account.SetBlockId(blockId);
    // }

    [Test, Order(3)]
    public async void TestAccountExecuteRaw()
    {
        dojo.Call call = new dojo.Call()
        {
            to = actionsAddress.Inner,
            selector = "spawn"
        };

        var txnHash = await account.ExecuteRaw(new[] { call });

        await provider.WaitForTransaction(txnHash);

        // We wait until our callback is called to mark our 
        var start = DateTime.Now;
        // entity as updated. We timeout after 5 seconds.
        while (!(entityUpdated && modelEntityUpdated) && DateTime.Now - start < TimeSpan.FromSeconds(5))
        {
        }


        if (entityUpdated != modelEntityUpdated)
        {
            Debug.LogWarning("Entity update status mismatch. One of the callbacks was not called.");
            Debug.LogWarning($"entityUpdated ({entityUpdated}) != modelEntityUpdated ({modelEntityUpdated})");
        }
        Assert.That(entityUpdated || modelEntityUpdated, Is.True);

        // Move to check for event message update
        call = new dojo.Call()
        {
            to = actionsAddress.Inner,
            selector = "move",
            calldata = new dojo.FieldElement[] { new FieldElement(0).Inner }
        };

        txnHash = await account.ExecuteRaw(new[] { call });

        await provider.WaitForTransaction(txnHash);

        // We wait until our callback is called to mark our
        // entity as updated. We timeout after 5 seconds.
        start = DateTime.Now;
        // entity as updated. We timeout after 5 seconds.
        while (!eventMessageUpdated && DateTime.Now - start < TimeSpan.FromSeconds(5))
        {
        }

        Assert.That(eventMessageUpdated, Is.True);
    }

    [Test]
    public void TestWorldMetadata()
    {
        var worldMetadata = client.WorldMetadata();

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

                    Assert.That(modelMetadata.schema.tag, Is.EqualTo(dojo.Ty_Tag.Struct_));
                    Assert.That(modelMetadata.schema.struct_.children[0].name, Is.EqualTo("player"));
                    Assert.That(modelMetadata.schema.struct_.children[1].name, Is.EqualTo("remaining"));
                    Assert.That(modelMetadata.schema.struct_.children[2].name, Is.EqualTo("last_direction"));

                    // maybe worth verifying the field types?

                    break;
                case "Position":
                    positionExists = true;

                    Assert.That(modelMetadata.schema.tag, Is.EqualTo(dojo.Ty_Tag.Struct_));
                    Assert.That(modelMetadata.schema.struct_.children[0].name, Is.EqualTo("player"));
                    Assert.That(modelMetadata.schema.struct_.children[1].name, Is.EqualTo("vec"));

                    // maybe worth verifying the field types?

                    break;
            }
        }

        Assert.That(worldMetadata.world_address, Is.EqualTo(worldAddress.Inner));
        Assert.That(movesExists, Is.True);
        Assert.That(positionExists, Is.True);
    }

    [Test, Order(1)]
    public void TestEntities()
    {
        var query = new Query(5, 0);

        var entities = client.Entities(query);
        Assert.That(entities.Count, Is.GreaterThanOrEqualTo(1));
    }

    // Deprecated?
    // [Test]
    // public void TestModel()
    // {
    //     var query = new dojo.KeysClause
    //     {
    //         model = "Moves",
    //         keys = new[] { playerKey }
    //     };

    //     var model = client.Model(query);

    //     Assert.That(model.struct_.name, Is.EqualTo("Moves"));
    //     Assert.That(model.struct_.children[0].name, Is.EqualTo("player"));
    // }

    [Test, Order(2)]
    public void TestOnEntityStateUpdate()
    {
        ToriiEvents.OnEntityStateUpdateDelegate callback = (key, models) =>
        {
            if (models.Length == 0) return;
            entityUpdated = models[0].Members["player"] == playerAddress;
        };
        ToriiEvents.Instance.OnEntityUpdated += callback;
    }

    [Test, Order(2)]
    public void TestOnEventMessageUpdate()
    {
        ToriiEvents.OnEventMessageUpdateDelegate callback = (key, models) =>
        {
            if (models.Length == 0) return;
            eventMessageUpdated = models[0].Members["player"] == playerAddress;
        };
        ToriiEvents.Instance.OnEventMessageUpdated += callback;
    }
}