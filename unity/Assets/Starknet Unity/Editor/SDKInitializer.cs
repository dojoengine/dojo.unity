using UnityEditor;
using UnityEngine;

[InitializeOnLoad]
public class SDKInitializer
{
    static SDKInitializer()
    {
        // Check if SDK needs setup
        if (NeedsSetup())
        {
            SDKSetupWindow.ShowWindow();
        }
    }

    static bool NeedsSetup()
    {
        string gameEngine = PlayerPrefs.GetString("Game Engine");
        if (gameEngine == "Dojo")
        {
            return !PlayerPrefs.HasKey("RPCNode") || !PlayerPrefs.HasKey("World Address") || !PlayerPrefs.HasKey("System Address");
        }
        return !PlayerPrefs.HasKey("RPCNode");
    }
}
