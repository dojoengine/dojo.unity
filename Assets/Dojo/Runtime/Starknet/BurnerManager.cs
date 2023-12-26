using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using dojo_bindings;

namespace Dojo.Starknet {
    public class BurnerManager {
        private JsonRpcClient provider;
        private Account masterAccount;
        private Account currentBurner;
        private List<Account> burners = new();

        public Account CurrentBurner => currentBurner;
        public List<Account> Burners => burners;

        public BurnerManager(JsonRpcClient provider, Account masterAccount) {
            this.provider = provider;
            this.masterAccount = masterAccount;
        }

        async public Task<Account> DeployBurner() {
            var account = await Task.Run(() => masterAccount.DeployBurner());
            burners.Add(account);
            currentBurner = account;

            return account;
        }

        // This will deploy a new burner if there is no current burner.
        async public Task<Account> UseBurner() {
            if (currentBurner == null) {
                currentBurner = await DeployBurner();
            }

            return currentBurner;
        }

        public Account UseBurner(dojo.FieldElement address) {
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