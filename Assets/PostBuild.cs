#if UNITY_EDITOR && UNITY_IOS
using UnityEditor;
using UnityEditor.Callbacks;
using UnityEditor.iOS.Xcode;
using System.IO;
using UnityEditor.Build.Reporting;

public class PostBuild {
    
    [PostProcessBuild(45)]
    private static void OnPostProcessBuildCocoaPodsAdjustments(BuildTarget buildTarget, string pathToBuiltProject)
    {
        if (buildTarget != BuildTarget.iOS) return;
        
        // https://stackoverflow.com/a/51416359
        var content = "\n\npost_install do |installer|\n" +
                                "installer.pods_project.targets.each do |target|\n" +
                                "  target.build_configurations.each do |config|\n" +
                                $"    config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '{PlayerSettings.iOS.targetOSVersionString}'\n" +
                                // https://stackoverflow.com/questions/72561696/xcode-14-needs-selected-development-team-for-pod-bundles
                                $"    config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'\n" +
                                "    config.build_settings['ENABLE_BITCODE'] = 'NO'\n" +
                                "  end\n" +
                                " end\n" +
                                "end\n";

        using var streamWriter = File.AppendText(Path.Combine(pathToBuiltProject, "Podfile"));
        streamWriter.WriteLine(content);
    }


    [PostProcessBuild]
    private static void OnPostProcessBuildDisableBitCode(BuildTarget buildTarget, string pathToBuiltProject)
    {
        if (buildTarget != BuildTarget.iOS) return;

        string projPath = pathToBuiltProject + "/Unity-iPhone.xcodeproj/project.pbxproj";

        var pbxProject = new PBXProject();
        pbxProject.ReadFromFile(projPath);
        
        // Main
        string target = pbxProject.GetUnityMainTargetGuid();
        pbxProject.SetBuildProperty(target, "ENABLE_BITCODE", "NO");


        // Unity Tests
        target = pbxProject.TargetGuidByName(PBXProject.GetUnityTestTargetName());
        pbxProject.SetBuildProperty(target, "ENABLE_BITCODE", "NO");


        // Unity Framework
        target = pbxProject.GetUnityFrameworkTargetGuid();
        pbxProject.SetBuildProperty(target, "ENABLE_BITCODE", "NO");


        pbxProject.WriteToFile(projPath);
    }
}
#endif