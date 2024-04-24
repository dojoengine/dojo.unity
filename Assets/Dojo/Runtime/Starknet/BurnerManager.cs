using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using dojo_bindings;
using Newtonsoft.Json;
using UnityEngine;
using Debug = UnityEngine.Debug;

namespace Dojo.Starknet
{
    public class BurnerManager
    {
        private JsonRpcClient provider;
        private Account masterAccount;
        public Account CurrentBurner { get; private set; }
        public List<Account> Burners { get; } = new();
        public bool UseStorage { get; set; }

        public BurnerManager(JsonRpcClient provider, Account masterAccount, bool useStorage = true)
        {
            this.provider = provider;
            this.masterAccount = masterAccount;
            UseStorage = useStorage;

            if (UseStorage)
            {
                TryLoad();
            }
        }

        ~BurnerManager()
        {
            if (UseStorage)
            {
                Save();
            }
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

        public Account UseBurner(FieldElement address)
        {
            foreach (var burner in Burners)
            {
                if (burner.Address.Hex() == address.Hex())
                {
                    CurrentBurner = burner;
                    return burner;
                }
            }

            return null;
        }

        // Load the burners from disk.
        // This will be called automatically if useStorage is set to true.
        public void TryLoad()
        {
            // Load the current burner
            var currentBurnerAddress = PlayerPrefs.GetString($"burnermanagers.{masterAccount.Address.Hex()}.current.address");
            if (!string.IsNullOrEmpty(currentBurnerAddress))
            {
                var currentBurnerPrivateKey = PlayerPrefs.GetString($"burnermanagers.{masterAccount.Address.Hex()}.current.private_key");
                if (!string.IsNullOrEmpty(currentBurnerPrivateKey))
                {
                    CurrentBurner = new Account(provider, new SigningKey(currentBurnerPrivateKey), new FieldElement(currentBurnerAddress));
                }
            }

            // Load all burners
            var burnersData = PlayerPrefs.GetString($"burnermanagers.{masterAccount.Address.Hex()}.burners");
            if (!string.IsNullOrEmpty(burnersData))
            {
                var burners = JsonConvert.DeserializeObject<List<Dictionary<string, string>>>(burnersData);
                foreach (var burnerData in burners)
                {
                    var address = new FieldElement(burnerData["address"]);
                    var privateKey = burnerData["private_key"];
                    Burners.Add(new Account(provider, new SigningKey(privateKey), address));
                }
            }
        }


        // Save the burners to disk.
        // This will be called automatically if useStorage is set to true.
        public void Save()
        {
            // Save the current burner
            if (CurrentBurner != null)
            {
                PlayerPrefs.SetString($"burnermanagers.{masterAccount.Address.Hex()}.current.address", CurrentBurner.Address.Hex());
                PlayerPrefs.SetString($"burnermanagers.{masterAccount.Address.Hex()}.current.private_key", CurrentBurner.Signer.Inner.Hex());
            }

            // Save all burners
            var burnersData = Burners.Select((b) => new Dictionary<string, string>
            {
                {"address", b.Address.Hex()},
                {"private_key", b.Signer.Inner.Hex()}
            }).ToList();

            PlayerPrefs.SetString($"burnermanagers.{masterAccount.Address.Hex()}.burners", JsonConvert.SerializeObject(burnersData));

            PlayerPrefs.Save();
        }
    }
}