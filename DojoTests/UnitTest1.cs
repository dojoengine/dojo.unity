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
        var world = new dojo.FieldElement { };
        var entities = new dojo.EntityQuery[] { new dojo.EntityQuery { _model = CString.FromString("") } };
        
        client = new ToriiClient("http://localhost:50051", "http://localhost:50052", world, entities);
    }

    [Test]
    public void Test1()
    {
        Assert.Pass();
    }
}