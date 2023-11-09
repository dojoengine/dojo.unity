using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Numerics;
using Utils;

public class Erc20Transfer : MonoBehaviour
{
    public void TransferToken(string recipient, string amount, string contractAddress)
    {
        string[] calldata = new string[] {
            recipient,
            amount,
            "0x00"
        };
        string calldataString = JsonUtility.ToJson(new ArrayWrapper { array = calldata });
        JSInteropManager.SendTransaction(contractAddress, "transfer", calldataString, "Erc20Transfer", "TransferCallback");   
    }

    public void TransferCallback(string transactionHash)
    {
        Debug.Log("https://goerli.voyager.online/tx/" + transactionHash);
    }

    // Start is called before the first frame update
    void Start()
    {
        string recipientAddress = "0x003849130b66710d3640f77fe8d37cf6fcf1e0dbb33fb9518e864b98c5b1a5f8";
        string contractAddress = "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
        string amount = "0x01";
        TransferToken(recipientAddress, amount, contractAddress);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
