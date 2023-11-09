/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Unity Technologies.
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

using System.IO;
using System.Text;
using UnityEditor.Compilation;
using UnityEngine;

namespace Microsoft.Unity.VisualStudio.Editor
{
	internal class SdkStyleProjectGeneration : ProjectGeneration
	{
		internal class SdkStyleAssemblyNameProvider : AssemblyNameProvider
		{
			// disable PlayerGeneration with SdkStyle projects
			internal override ProjectGenerationFlag ProjectGenerationFlagImpl => base.ProjectGenerationFlagImpl & ~ProjectGenerationFlag.PlayerAssemblies;
		}

		public SdkStyleProjectGeneration() : base(
			Directory.GetParent(Application.dataPath)?.FullName,
			new SdkStyleAssemblyNameProvider(),
			new FileIOProvider(),
			new GUIDProvider())
		{
		}

		internal override void GetProjectHeader(ProjectProperties properties, out StringBuilder headerBuilder)
		{
			headerBuilder = new StringBuilder();

			headerBuilder.Append(@"<Project ToolsVersion=""Current"" Sdk=""Microsoft.NET.Sdk"">").Append(k_WindowsNewline);
			headerBuilder.Append(@"  <!-- Generated file, do not modify, your changes will be overwritten (use AssetPostprocessor.OnGeneratedCSProject) -->").Append(k_WindowsNewline);
			headerBuilder.Append(@"  <PropertyGroup>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <GenerateAssemblyInfo>false</GenerateAssemblyInfo>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <EnableDefaultItems>false</EnableDefaultItems>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <AppendTargetFrameworkToOutputPath>false</AppendTargetFrameworkToOutputPath>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <LangVersion>").Append(properties.LangVersion).Append(@"</LangVersion>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <Configurations>Debug;Release</Configurations>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <Configuration Condition="" '$(Configuration)' == '' "">Debug</Configuration>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <Platform Condition="" '$(Platform)' == '' "">AnyCPU</Platform>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <RootNamespace>").Append(properties.RootNamespace).Append(@"</RootNamespace>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <OutputType>Library</OutputType>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <AppDesignerFolder>Properties</AppDesignerFolder>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <AssemblyName>").Append(properties.AssemblyName).Append(@"</AssemblyName>").Append(k_WindowsNewline);
			// In the end, given we use NoConfig/NoStdLib (see below), hardcoding the target framework version will have no impact, even when targeting netstandard/net48 from Unity.
			// But with SDK style we use netstandard2.1 (net471 for legacy), so 3rd party tools will not fail to work when .NETFW reference assemblies are not installed.
			// Unity already selected proper API surface through referenced DLLs for us.
			headerBuilder.Append(@"    <TargetFramework>netstandard2.1</TargetFramework>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <BaseDirectory>.</BaseDirectory>").Append(k_WindowsNewline);
			headerBuilder.Append(@"  </PropertyGroup>").Append(k_WindowsNewline);

			GetProjectHeaderConfigurations(properties, headerBuilder);

			// Explicit references
			headerBuilder.Append(@"  <PropertyGroup>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <NoStandardLibraries>true</NoStandardLibraries>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <NoStdLib>true</NoStdLib>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <NoConfig>true</NoConfig>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <DisableImplicitFrameworkReferences>true</DisableImplicitFrameworkReferences>").Append(k_WindowsNewline);
			headerBuilder.Append(@"    <MSBuildWarningsAsMessages>MSB3277</MSBuildWarningsAsMessages>").Append(k_WindowsNewline);
			headerBuilder.Append(@"  </PropertyGroup>").Append(k_WindowsNewline);

			GetProjectHeaderVstuFlavoring(properties, headerBuilder, false);
			GetProjectHeaderAnalyzers(properties, headerBuilder);
		}

		internal override void AppendProjectReference(Assembly assembly, Assembly reference, StringBuilder projectBuilder)
		{
			// If the current assembly is a Player project, we want to project-reference the corresponding Player project
			var referenceName = m_AssemblyNameProvider.GetAssemblyName(assembly.outputPath, reference.name);
			projectBuilder.Append(@"    <ProjectReference Include=""").Append(referenceName).Append(GetProjectExtension()).Append(@""" />").Append(k_WindowsNewline);
		}

		internal override void GetProjectFooter(StringBuilder footerBuilder)
		{
			footerBuilder.Append("</Project>").Append(k_WindowsNewline);
		}
	}
}
