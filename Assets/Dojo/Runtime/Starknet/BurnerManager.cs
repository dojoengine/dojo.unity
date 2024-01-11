using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using dojo_bindings;
using Debug = UnityEngine.Debug;

namespace Dojo.Starknet {
    public class BurnerManager {
        private JsonRpcClient rpc;
        private Account masterAccount;
        private Account currentBurner;
        private List<Account> burners = new();

        public Account CurrentBurner => currentBurner;
        public List<Account> Burners => burners;

        public BurnerManager(JsonRpcClient rpc, Account masterAccount) {
            this.rpc = rpc;
            this.masterAccount = masterAccount;
        }

        public async Task<Account> DeployBurner()
        {
            var account = await masterAccount.DeployBurner();
            Debug.Log($"Deployed burner {account.Address().Hex()}");
            burners.Add(account);
            currentBurner = account;

            return account;
        }

        // This will deploy a new burner if there is no current burner.
        public async Task<Account> UseBurner()
        {
            return currentBurner ??= await DeployBurner();
        }

        public Account UseBurner(FieldElement address) {
            foreach (var burner in burners) {
                if (burner.Address().Equals(address)) {
                    currentBurner = burner;
                    return burner;
                }
            }

            return null;
        }
    }
}