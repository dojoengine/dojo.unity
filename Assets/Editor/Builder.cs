using UnityEditor;

namespace Editor
{
    public static class Builder
    {
        public static void BuildPackage()
        {
            // Define which assets to include in the package
            string[] assets = new string[]
            {
                "Assets",
                "Packages/manifest.json",
                "Packages/packages-lock.json"
            };

            // Build the package
            AssetDatabase.ExportPackage(
                assets,
                "Build/dojo.unitypackage",
                ExportPackageOptions.Recurse | ExportPackageOptions.IncludeDependencies
            );
        }
    }
}