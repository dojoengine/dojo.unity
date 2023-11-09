using UnityEditor;
using UnityEngine;

public class SDKSetupWindow : EditorWindow
{
    string rpcNode;
    private string[] options = new string[] { "Dojo", "Starknet" }; // Add or remove options as needed.
    private int selectedIndex;
    private string worldAddress;
    private string systemAddress;

    [MenuItem("Starknet SDK/Setup")]
    public static void ShowWindow()
    {
        GetWindow<SDKSetupWindow>("Starknet SDK Setup");
    }

    void OnEnable()
    {
        // Load saved values when the window is opened or re-focused
        rpcNode = EditorPrefs.GetString("RPCNode", "Enter RPC Node");
        selectedIndex = EditorPrefs.GetInt("SelectedIndex", 0);
        worldAddress = EditorPrefs.GetString("WorldAddress", "Enter World Address");
        systemAddress = EditorPrefs.GetString("SystemAddress", "Enter System Address");
    }

    void OnGUI()
    {
        GUILayout.Label("Setup your Starknet SDK", EditorStyles.boldLabel);
        selectedIndex = EditorGUILayout.Popup("Game Engine", selectedIndex, options);

        rpcNode = EditorGUILayout.TextField("RPC Node", rpcNode);

        if (selectedIndex == 0)
        {
            worldAddress = EditorGUILayout.TextField("World address", worldAddress);
            systemAddress = EditorGUILayout.TextField("System address", systemAddress);
        }

        if (GUILayout.Button("Submit"))
        {
            SetupSDK(rpcNode);
            // Hide the window
            this.Close();
        }
    }

    void SetupSDK(string rpc)
    {
        PlayerPrefs.SetString("RPCNode", rpc);
        PlayerPrefs.SetString("Game Engine", options[selectedIndex]);
        PlayerPrefs.SetString("World Address", worldAddress);
        PlayerPrefs.SetString("System Address", systemAddress);

        // Save values to EditorPrefs so they persist between sessions
        EditorPrefs.SetString("RPCNode", rpcNode);
        EditorPrefs.SetInt("SelectedIndex", selectedIndex);
        EditorPrefs.SetString("WorldAddress", worldAddress);
        EditorPrefs.SetString("SystemAddress", systemAddress);
    }
}
