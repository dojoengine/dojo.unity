using System.Diagnostics;
using bottlenoselabs.C2CS.Runtime;
using dojo_namespace;

namespace Dojo
{
    unsafe class ToriiClient
    {

        private dojo.ToriiClient* client;
        ToriiClient(string toriiUrl, string rpcUrl, dojo.FieldElement world, dojo.EntityQuery[] entities)
        {
            CString ctoriiUrl = CString.FromString(toriiUrl);
            CString crpcUrl = CString.FromString(rpcUrl);
            unsafe
            {
                dojo.EntityQuery* entitiesPtr;

                fixed (dojo.EntityQuery* ptr = &entities[0])
                {
                    entitiesPtr = ptr;
                }

                dojo.Error* error = null;
                this.client = dojo.client_new(ctoriiUrl, crpcUrl, &world, entitiesPtr, (nuint)entities.Length, error);
            }
        }

        ~ToriiClient()
        {
            dojo.client_free(this.client);
        }

        public dojo.Ty Entity(dojo.EntityQuery query)
        {
            dojo.Error* error = null;
            dojo.Ty entity = *dojo.client_entity(this.client, &query, error);

            // transform entity.ty_tuple.data ptr and length to c# list
            new List()

            return entity;
        }
    }
}