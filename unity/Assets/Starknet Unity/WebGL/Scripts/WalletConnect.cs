using System;
using System.Collections;
using UnityEngine;

public class WalletConnect : MonoBehaviour
{
    public static string playerAddress;
    private IEnumerator ConnectWalletAsync(Action connectWalletFunction)
    {
        // Call the JavaScript method to connect the wallet
        connectWalletFunction();

        // Wait for the connection to be established
        yield return new WaitUntil(() => JSInteropManager.IsConnected());

        playerAddress = JSInteropManager.GetAccount();
        PlayerPrefs.SetString("playerAddress", playerAddress);
        Debug.Log("Connected to wallet: " + playerAddress);
    }

    public void OnButtonConnectWalletArgentX()
    {
        StartCoroutine(ConnectWalletAsync(JSInteropManager.ConnectWalletArgentX));
    }

    public void OnButtonConnectWalletBraavos()
    {
        StartCoroutine(ConnectWalletAsync(JSInteropManager.ConnectWalletBraavos));
    }

    // Start is called before the first frame update
    void Start()
    {
        if (PlayerPrefs.HasKey("playerAddress"))
        {
            playerAddress = PlayerPrefs.GetString("playerAddress");
            Debug.Log("Connected to wallet: " + playerAddress);
        }
        bool available = JSInteropManager.IsWalletAvailable();
        if (!available)
        {
            JSInteropManager.AskToInstallWallet();
        }
    }

    // Update is called once per frame
    void Update()
    {

    }
}
