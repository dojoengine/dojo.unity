using bottlenoselabs.C2CS.Runtime;
using Dojo;
using dojo_bindings;

static class Example
{
    static void Main()
    {
        ToriiClient client = new ToriiClient("http://localhost:1234", "http://localhost:1234", new dojo.FieldElement { }, new dojo.EntityQuery[]{new dojo.EntityQuery{
            _model=CString.FromString("")
        }});
    }
}