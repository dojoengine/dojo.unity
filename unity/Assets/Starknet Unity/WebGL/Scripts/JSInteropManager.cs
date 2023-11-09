using System.Runtime.InteropServices;
using UnityEngine;

public class JSInteropManager : MonoBehaviour
{
    [DllImport("__Internal")]
    public static extern bool IsWalletAvailable();

    [DllImport("__Internal")]
    public static extern void AskToInstallWallet();

    [DllImport("__Internal")]
    public static extern void ConnectWalletArgentX();

    [DllImport("__Internal")]
    public static extern void ConnectWalletBraavos();

    [DllImport("__Internal")]
    public static extern bool IsConnected();

    [DllImport("__Internal")]
    public static extern string GetAccount();

    [DllImport("__Internal")]
    public static extern void SendTransactionArgentX(string contractAddress, string entrypoint, string calldata, string callbackObjectName, string callbackMethodName);

    [DllImport("__Internal")]
    public static extern void SendTransactionBraavos(string contractAddress, string entrypoint, string calldata, string callbackObjectName, string callbackMethodName);

    [DllImport("__Internal")]
    public static extern void SendTransaction(string contractAddress, string entrypoint, string calldata, string callbackObjectName, string callbackMethodName);

    [DllImport("__Internal")]
    public static extern void CallContract(string contractAddress, string entrypoint, string calldata, string callbackObjectName, string callbackMethodName);
}
