namespace dojo.unity
{
    using dojo_namespace;
    using bottlenoselabs.C2CS.Runtime;
    using _cchar = bottlenoselabs.C2CS.Runtime.CString;
    using System.Diagnostics;

    public class De

    {

        public unsafe int main()
        {
            const string torri_url = "http://localhost:50051";
            const string rpc_url = "http://localhost:5002";
            // dojo.FieldElement world;
            dojo.FieldElement world = new dojo.FieldElement();
            dojo.FieldElement* w1 = &world;

            

            dojo.EntityModel entities = new dojo.EntityModel();
            dojo.EntityModel* e1 = &entities;
            e1[0].model = "";
            e1[0].keys = w1;
            e1[0].keys_len = 1;

            dojo.Error error = new dojo.Error();
            dojo.Error* er = &error;
            dojo.ToriiClient* client = dojo.client_new((_cchar)torri_url, (_cchar)rpc_url,w1, e1,1,  er);

            if (client != null)
            {
                Console.WriteLine("client is a go");
            }
            else
            {
                Console.WriteLine("Failed to create client: %n", error.message);
                return 1;
            }

            dojo.client_free(client);

            return 0;
        }

    }

    public class dojoEngine
    {
        public void start()
        {
            De d = new De();
            d.main();
        }
    }

}