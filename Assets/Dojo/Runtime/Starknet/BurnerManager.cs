using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using dojo_bindings;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.UIElements;
using Debug = UnityEngine.Debug;

namespace Dojo.Starknet
{
    public class BurnerManager
    {
        private JsonRpcClient provider;
        private Account masterAccount;
        private int currentBurnerIndex = 0;
        public Account CurrentBurner
        {
            get
            {
                if (Burners.Count == 0) return null;
                return Burners[currentBurnerIndex];
            }
        }
        public List<Account> Burners { get; } = new();
        public bool UseStorage { get; set; }

        public BurnerManager(JsonRpcClient provider, Account masterAccount, bool useStorage = true)
        {
            this.provider = provider;
            this.masterAccount = masterAccount;
            UseStorage = useStorage;

            if (UseStorage)
            {
                TryLoadFromStorage();
            }
        }

        public async Task<Account> DeployBurner(SigningKey signingKey = null)
        {
            if (signingKey == null)
            {
                signingKey = new SigningKey();
            }

            Burners.Add(await masterAccount.DeployBurner(provider, signingKey));
            currentBurnerIndex = Burners.Count - 1;
            

            if (UseStorage)
            {
                Save();
            }

            return CurrentBurner;
        }


        // Load the burners from disk.
        // This will be called automatically if useStorage is set to true.
        public void TryLoadFromStorage()
        {

            // Load all burners
            var burnersData = PlayerPrefs.GetString($"burnermanagers.{masterAccount.Address.Hex()}.burners");
            if (!string.IsNullOrEmpty(burnersData))
            {
                var burners = JsonConvert.DeserializeObject<List<Dictionary<string, string>>>(burnersData);
                foreach (var burnerData in burners)
                {
                    var address = new FieldElement(burnerData["address"]);
                    var privateKey = burnerData["privateKey"];
                    Burners.Add(new Account(provider, new SigningKey(privateKey), address));
                }
            }

            // Load the current burner
            var currentBurnerIndex = PlayerPrefs.GetInt($"burnermanagers.{masterAccount.Address.Hex()}.current", -1);
            if (currentBurnerIndex >= 0 && currentBurnerIndex < Burners.Count)
            {
                this.currentBurnerIndex = currentBurnerIndex;
            }
        }

        // Save the burners to disk.
        // This will be called automatically if useStorage is set to true.
        public void Save()
        {
            // Save the current burner
            if (CurrentBurner != null)
            {
                PlayerPrefs.SetInt($"burnermanagers.{masterAccount.Address.Hex()}.current", currentBurnerIndex);
            }

            // Save all burners
            var burnersData = JsonConvert.SerializeObject(Burners.Select(burner => new
            {
                address = burner.Address.Hex(),
                privateKey = burner.Signer.Inner.Hex()
            }));

            PlayerPrefs.SetString($"burnermanagers.{masterAccount.Address.Hex()}.burners", burnersData);

            PlayerPrefs.Save();
        }
    }
}