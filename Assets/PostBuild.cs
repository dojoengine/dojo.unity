#if UNITY_EDITOR && UNITY_IOS
using UnityEditor;
using UnityEditor.Callbacks;
using UnityEditor.iOS.Xcode;
using System.IO;
using UnityEngine;

public class PostBuild
{
    [PostProcessBuild(45)]
    private static void OnPostProcessBuildCocoaPodsAdjustments(BuildTarget buildTarget, string pathToBuiltProject)
    {
        if (buildTarget != BuildTarget.iOS) return;

        string podfilePath = Path.Combine(pathToBuiltProject, "Podfile");
        Debug.Log($"[PostBuild] Adjusting Podfile at: {podfilePath}");

        var content = "\n\npost_install do |installer|\n" +
                      "installer.pods_project.targets.each do |target|\n" +
                      "  target.build_configurations.each do |config|\n" +
                      $"    config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '{PlayerSettings.iOS.targetOSVersionString}'\n" +
                      "    config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'\n" +
                      "    config.build_settings['ENABLE_BITCODE'] = 'NO'\n" +
                      "  end\n" +
                      " end\n" +
                      "end\n";

        File.AppendAllText(podfilePath, content);
        Debug.Log("[PostBuild] Podfile modifications completed.");

        // Викликаємо pod install, щоб створити .xcworkspace
        RunPodInstall(pathToBuiltProject);
    }

    [PostProcessBuild]
    private static void OnPostProcessBuildDisableBitCode(BuildTarget buildTarget, string pathToBuiltProject)
    {
        if (buildTarget != BuildTarget.iOS) return;

        string projPath = Path.Combine(pathToBuiltProject, "Unity-iPhone.xcodeproj/project.pbxproj");
        Debug.Log($"[PostBuild] Disabling Bitcode in: {projPath}");

        var pbxProject = new PBXProject();
        pbxProject.ReadFromFile(projPath);

        // Відключаємо Bitcode для всіх таргетів
        string mainTarget = pbxProject.GetUnityMainTargetGuid();
        string testTarget = pbxProject.TargetGuidByName(PBXProject.GetUnityTestTargetName());
        string frameworkTarget = pbxProject.GetUnityFrameworkTargetGuid();

        pbxProject.SetBuildProperty(mainTarget, "ENABLE_BITCODE", "NO");
        pbxProject.SetBuildProperty(testTarget, "ENABLE_BITCODE", "NO");
        pbxProject.SetBuildProperty(frameworkTarget, "ENABLE_BITCODE", "NO");

        pbxProject.WriteToFile(projPath);
        Debug.Log("[PostBuild] Bitcode disabled for all targets.");
    }

    private static void RunPodInstall(string pathToBuiltProject)
    {
        Debug.Log("[PostBuild] Running 'pod install'...");
        System.Diagnostics.Process process = new System.Diagnostics.Process();
        process.StartInfo.WorkingDirectory = pathToBuiltProject;
        process.StartInfo.FileName = "/usr/bin/env";
        process.StartInfo.Arguments = "pod install";
        process.StartInfo.RedirectStandardOutput = true;
        process.StartInfo.RedirectStandardError = true;
        process.StartInfo.UseShellExecute = false;
        process.StartInfo.CreateNoWindow = true;

        process.OutputDataReceived += (sender, args) => Debug.Log("[Pod Install] " + args.Data);
        process.ErrorDataReceived += (sender, args) => Debug.LogError("[Pod Install Error] " + args.Data);

        process.Start();
        process.BeginOutputReadLine();
        process.BeginErrorReadLine();
        process.WaitForExit();

        if (process.ExitCode == 0)
        {
            Debug.Log("[PostBuild] 'pod install' completed successfully.");
        }
        else
        {
            Debug.LogError($"[PostBuild] 'pod install' failed with exit code {process.ExitCode}.");
        }
    }
}
#endif