# GitHub Workflows for Dojo Unity SDK

This directory contains the GitHub Actions workflows for managing releases and CI/CD for the Dojo Unity SDK.

## Workflows Overview

### 1. `prepare-release.yml` - Prepare Release
**Trigger:** Manual workflow dispatch
**Purpose:** Prepares a new release by updating version numbers and creating a PR

**Usage:**
```bash
# Go to Actions tab → Prepare Release → Run workflow
# Choose version bump type: patch, minor, or major
# Or provide a custom version override
```

**What it does:**
- ✅ Updates `package.json` version
- ✅ Updates Unity package files
- ✅ Creates a release branch (`release/vX.X.X`)
- ✅ Generates changelog from git commits
- ✅ Creates a PR with all changes
- ✅ Adds helpful comments and labels

### 2. `release-on-merge.yml` - Create Release on Merge
**Trigger:** Automatic when release PR is merged to main
**Purpose:** Automatically creates a draft release when a release PR is merged

**What it does:**
- ✅ Detects release PRs (title: "Release vX.X.X" or branch: "release/vX.X.X")
- ✅ Verifies version consistency
- ✅ Creates and pushes git tag
- ✅ Builds Unity package
- ✅ Creates draft release with changelog
- ✅ Uploads Unity package to release
- ✅ Comments on the merged PR with next steps

### 3. `manual-release.yml` - Manual Release
**Trigger:** Manual workflow dispatch
**Purpose:** Create a release manually for an existing tag

**Usage:**
```bash
# Go to Actions tab → Manual Release → Run workflow
# Provide the tag (e.g., v1.4.0)
# Choose draft/prerelease options
```

### 4. `release.yml` - Legacy Release Build
**Trigger:** Automatic when a release is published (not draft)
**Purpose:** Builds and uploads Unity package to published releases

**What it does:**
- ✅ Builds Unity package when release is published
- ✅ Uploads package with versioned filename

## Complete Release Process

### Option A: Automated Release Process (Recommended)

1. **Prepare Release**
   ```bash
   # Go to GitHub Actions → Prepare Release → Run workflow
   # Select version bump type or provide custom version
   ```

2. **Review and Merge PR**
   - Review the automatically created PR
   - Check version updates and changelog
   - Merge the PR to main

3. **Publish Release**
   - A draft release is automatically created
   - Review the draft release
   - Click "Publish release" when ready

### Option B: Manual Release Process

1. **Update version manually** in `package.json`
2. **Create and push tag**
   ```bash
   git tag -a v1.4.0 -m "Release v1.4.0"
   git push origin v1.4.0
   ```
3. **Run Manual Release workflow**
   - Go to Actions → Manual Release
   - Provide the tag name
   - Choose options and run

## Workflow Features

### 🚀 Version Management
- Automatic semantic versioning (patch/minor/major)
- Custom version override support
- Consistent version updates across all files

### 📋 Changelog Generation
- Automatic changelog from git commits
- Categorized by commit types (features, fixes, docs)
- Links to commits and comparisons

### 🏷️ Git Tagging
- Automatic tag creation and pushing
- Annotated tags with release messages
- Tag verification and validation

### 📦 Unity Package Building
- Automatic Unity package compilation
- LFS support for large assets
- Caching for faster builds
- Versioned package filenames

### 🔄 PR Management
- Automatic PR creation for releases
- Helpful descriptions and comments
- Proper labeling and reviewer assignment
- Status updates throughout process

## Configuration Requirements

### Repository Secrets
Make sure these secrets are configured in your repository:

- `UNITY_LICENSE` - Your Unity license
- `UNITY_EMAIL` - Unity account email
- `UNITY_PASSWORD` - Unity account password
- `GITHUB_TOKEN` - Automatically provided by GitHub

### Permissions
The workflows require these permissions:
- Contents: write (for creating tags and releases)
- Pull requests: write (for creating PRs)
- Actions: read (for workflow status)

## File Structure

```
.github/workflows/
├── README.md                 # This file
├── prepare-release.yml       # Prepare new release
├── release-on-merge.yml      # Auto-create release on merge
├── manual-release.yml        # Manual release creation
├── release.yml              # Legacy release build
├── ci.yml                   # Existing CI workflow
└── dojoc.yml               # Existing dojo.c workflow
```

## Troubleshooting

### Common Issues

1. **Version mismatch error**
   - Ensure package.json version matches the expected version
   - Check that the release PR was merged properly

2. **Unity build fails**
   - Check Unity license secrets
   - Verify Unity project configuration
   - Check for compilation errors in Unity

3. **Tag already exists**
   - Use a different version number
   - Delete the existing tag if needed: `git tag -d v1.4.0 && git push origin :refs/tags/v1.4.0`

4. **PR not detected as release PR**
   - Ensure PR title follows format: "Release vX.X.X"
   - Or use branch name format: "release/vX.X.X"

### Debug Tips

- Check workflow logs in the Actions tab
- Verify repository permissions and secrets
- Test with a patch version first
- Use draft releases for testing

## Customization

To customize the workflows for your needs:

1. **Changelog format** - Edit the changelog generation sections
2. **Version files** - Add more files to update in `prepare-release.yml`
3. **Build process** - Modify the Unity build steps
4. **Notifications** - Add Slack/Discord notifications
5. **Validation** - Add additional checks and tests

## Support

For issues with these workflows:
1. Check the workflow logs in GitHub Actions
2. Review this README for configuration requirements
3. Open an issue with workflow logs and error details
