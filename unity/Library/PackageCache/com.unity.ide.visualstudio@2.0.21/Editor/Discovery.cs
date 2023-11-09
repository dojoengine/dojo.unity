/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Unity Technologies.
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

using System.Collections.Generic;
using System.IO;

namespace Microsoft.Unity.VisualStudio.Editor
{
	internal static class Discovery
	{
		public static IEnumerable<IVisualStudioInstallation> GetVisualStudioInstallations()
		{
			foreach (var installation in VisualStudioForWindowsInstallation.GetVisualStudioInstallations())
				yield return installation;

			foreach (var installation in VisualStudioForMacInstallation.GetVisualStudioInstallations())
				yield return installation;

			foreach (var installation in VisualStudioCodeInstallation.GetVisualStudioInstallations())
				yield return installation;
		}

		public static bool TryDiscoverInstallation(string editorPath, out IVisualStudioInstallation installation)
		{
			try
			{
				if (VisualStudioForWindowsInstallation.TryDiscoverInstallation(editorPath, out installation))
					return true;

				if (VisualStudioForMacInstallation.TryDiscoverInstallation(editorPath, out installation))
					return true;

				if (VisualStudioCodeInstallation.TryDiscoverInstallation(editorPath, out installation))
					return true;
			}
			catch (IOException)
			{
				installation = null;
			}

			return false;
		}

		public static void Initialize()
		{
			VisualStudioForWindowsInstallation.Initialize();
			VisualStudioForMacInstallation.Initialize();
			VisualStudioCodeInstallation.Initialize();
		}
	}
}
