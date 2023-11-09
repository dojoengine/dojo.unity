using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Utils;

public class Mint : MonoBehaviour
{
    public void MintToken(string recipient, string contractAddress)
    {
        string[] calldata = new string[] {
            recipient
        };
        string calldataString = JsonUtility.ToJson(new ArrayWrapper { array = calldata });
        JSInteropManager.SendTransaction(contractAddress, "mint", calldataString, "Erc721Mint", "MintCallback");   
    }

    public void MintCallback(string transactionHash)
    {
        Debug.Log("https://goerli.voyager.online/tx/" + transactionHash);
    }

    // Start is called before the first frame update
    void Start()
    {
        string recipientAddress = "0x003849130b66710d3640f77fe8d37cf6fcf1e0dbb33fb9518e864b98c5b1a5f8";
        string contractAddress = "0x4965b4eb535ea29ecc01564ff2034b24f358d923cbf3e8ee022cd0f86b69b99";
        MintToken(recipientAddress, contractAddress);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
