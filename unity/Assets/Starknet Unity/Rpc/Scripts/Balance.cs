using UnityEngine;
using System.Collections;
using StarkSharp.Platforms.Unity.RPC;
using StarkSharp.Connectors.Components;
using StarkSharp.Settings;

public class Balance : MonoBehaviour
{
    public void CheckUserBalance(string userAddress, string contractAddress, string selector, UnityRpcPlatform rpcPlatform)
    {
        ContractInteraction contractInteraction = new ContractInteraction(contractAddress, selector, userAddress);
        rpcPlatform.CallContract(contractInteraction, OnSuccess, OnError);
    }

    void OnSuccess(string result)
    {
        Debug.Log("Contract call successful: " + result);
    }

    void OnError(string error)
    {
        Debug.LogError("Contract call error: " + error);
    }

    // Start is called before the first frame update
    void Start()
    {
        Settings.apiurl = PlayerPrefs.GetString("RPCNode");
        string selector = "balanceOf";
        string userAddress = "0x3b2d6f0b442e43c36888111924a2a2b8308836658f803abb76bc39b4b43a305";
        string contractAddress = "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

        UnityRpcPlatform rpcPlatform = new UnityRpcPlatform();
        CheckUserBalance(userAddress, contractAddress, selector, rpcPlatform);
    }

    // Update is called once per frame
    void Update()
    {

    }
}
