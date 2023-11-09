using System.Collections;
using System.Collections.Generic;
using System.Numerics;
using System.Globalization;
using UnityEngine;
using Utils;

public class Erc721Balance : MonoBehaviour
{
    public void BalanceOf(string userAddress, string contractAddress)
    {
        string[] calldata = new string[1];
        calldata[0] = userAddress;
        string calldataString = JsonUtility.ToJson(new ArrayWrapper { array = calldata });
        JSInteropManager.CallContract(contractAddress, "balanceOf", calldataString, "Erc721Balance", "Erc721Callback");   
    }

    public void Erc721Callback(string response)
    {
        JsonResponse jsonResponse = JsonUtility.FromJson<JsonResponse>(response);
        BigInteger balance = BigInteger.Parse(jsonResponse.result[0].Substring(2), NumberStyles.HexNumber);
        Debug.Log(balance);
    }

    // Start is called before the first frame update
    void Start()
    {
        string userAddress = "0x3b2d6f0b442e43c36888111924a2a2b8308836658f803abb76bc39b4b43a305";
        string contractAddress = "0x4965b4eb535ea29ecc01564ff2034b24f358d923cbf3e8ee022cd0f86b69b99";
        BalanceOf(userAddress, contractAddress); 
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
