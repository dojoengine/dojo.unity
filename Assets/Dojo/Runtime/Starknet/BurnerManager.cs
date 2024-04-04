using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using dojo_bindings;
using Debug = UnityEngine.Debug;

namespace Dojo.Starknet {
    public class BurnerManager {
        private JsonRpcClient provider;
        private Account masterAccount;
        public Account CurrentBurner { get; private set; }
        public List<Account> Burners { get; } = new();

        public BurnerManager(JsonRpcClient provider, Account masterAccount) {
            this.provider = provider;
            this.masterAccount = masterAccount;
        }

        public async Task<Account> DeployBurner(SigningKey signingKey)
        {
            var account = await masterAccount.DeployBurner(provider, signingKey);
            Burners.Add(account);
            CurrentBurner = account;

            return account;
        }

        // This will deploy a new burner if there is no current burner.
        public async Task<Account> UseBurner()
        {
            return CurrentBurner ??= await DeployBurner(new SigningKey());
        }

        public Account UseBurner(FieldElement address) {
            foreach (var burner in Burners) {
                if (burner.Address.Hex() == address.Hex()) {
                    CurrentBurner = burner;
                    return burner;
                }
            }

            return null;
        }
    }
}