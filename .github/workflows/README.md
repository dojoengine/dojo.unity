# GitHub Workflows for Dojo Unity SDK

This directory contains streamlined GitHub Actions workflows for managing releases and CI/CD for the Dojo Unity SDK.

## 🚀 Quick Start

### Creating a Release (Recommended Flow)

1. **Go to GitHub Actions** → **Release Dispatch** → **Run workflow**
2. **Enter version** (e.g., `1.4.0` or `patch`/`minor`/`major`)
3. **Review the auto-created PR** and merge it
4. **Publish the draft release** when ready

That's it! 🎉

## 📋 Workflows Overview

### 1. `release-dispatch.yml` - Release Dispatch (Main Workflow)
**Trigger:** Manual workflow dispatch
**Purpose:** One-stop workflow for creating releases

**How it works:**
- Creates a release branch with version updates
- Generates changelog from git commits  
- Creates a PR with all changes
- Optionally builds and creates the release immediately

### 2. `release-on-merge.yml` - Release on Merge
**Trigger:** Automatic when release PR is merged
**Purpose:** Automatically creates draft release when release PR is merged

**How it works:**
- Detects release PRs (title: "Release vX.X.X")
- Creates git tag
- Builds Unity package
- Creates draft release
- Comments on PR with next steps

### 3. `ci.yml` - Continuous Integration
**Trigger:** Push/PR to main branch
**Purpose:** Code quality checks and build verification

**What it does:**
- Code formatting checks (C#)
- Unity package build verification
- (Tests commented out until ready)

### 4. `dojoc.yml` - DojoC Artifacts
**Trigger:** Changes to `Bindings/dojo.c/**` or manual dispatch
**Purpose:** Generates C# bindings and native libraries

## 📖 Step-by-Step Release Guide

### Option A: Automatic Version Bumping

1. **Navigate to GitHub Actions**
   ```
   GitHub Repository → Actions tab → Release Dispatch → Run workflow
   ```

2. **Choose Version Type**
   - `patch` - Bug fixes (1.2.3 → 1.2.4)
   - `minor` - New features (1.2.3 → 1.3.0) 
   - `major` - Breaking changes (1.2.3 → 2.0.0)

3. **Configure Options**
   - ✅ **Draft**: `true` (recommended) - Creates draft for review
   - ❌ **Pre-release**: `false` (unless it's a beta/alpha)

4. **Run the Workflow**
   - Click "Run workflow"
   - Wait for completion (~2-3 minutes)

5. **Review the PR**
   - A PR titled "Release vX.X.X" will be created
   - Review version changes in `package.json`
   - Review generated changelog
   - Merge the PR when satisfied

6. **Publish the Release**
   - Navigate to Releases tab
   - Find the draft release
   - Review release notes and attached Unity package
   - Click "Publish release"

### Option B: Custom Version

1. **Navigate to GitHub Actions**
   ```
   GitHub Repository → Actions tab → Release Dispatch → Run workflow
   ```

2. **Enter Custom Version**
   - Type exact version: `1.4.0`
   - Set options as desired

3. **Follow steps 4-6 from Option A**

### Option C: Manual Process

1. **Update Version Manually**
   ```bash
   # Edit package.json
   vim package.json
   # Change version field to desired version
   ```

2. **Create Release Branch**
   ```bash
   git checkout -b release/v1.4.0
   git add package.json
   git commit -m "chore: bump version to 1.4.0"
   git push origin release/v1.4.0
   ```

3. **Create PR**
   - Create PR with title "Release v1.4.0"
   - Merge when ready

4. **The rest is automatic!**
   - `release-on-merge.yml` will trigger
   - Draft release will be created
   - Publish when ready

## 🔧 Workflow Configuration

### Required Repository Secrets

```yaml
UNITY_LICENSE: Your Unity license key
UNITY_EMAIL: Unity account email  
UNITY_PASSWORD: Unity account password
GITHUB_TOKEN: Automatically provided
```

### Required Permissions

```yaml
Contents: write      # Create tags and releases
Pull requests: write # Create PRs
Actions: read        # Read workflow status
```

## 📁 File Structure After Cleanup

```
.github/workflows/
├── README.md              # This guide
├── release-dispatch.yml   # 🚀 Main release workflow
├── release-on-merge.yml   # 🔄 Auto-release on PR merge
├── ci.yml                # ✅ Code quality & build checks
└── dojoc.yml             # 🔧 Native bindings generation
```

## 🎯 Key Improvements

### ✅ What's Better Now

- **Simplified**: 4 workflows instead of 7
- **Modern**: Uses latest GitHub Actions (v4)
- **Reliable**: Better error handling and validation
- **Flexible**: Support both semantic and custom versioning
- **Automated**: Less manual work, more automation
- **Clear**: Better naming and documentation

### 🗑️ What Was Removed

- `release.yml` - Merged into `release-dispatch.yml`
- `manual-release.yml` - Functionality in `release-dispatch.yml`  
- `prepare-release.yml` - Functionality in `release-dispatch.yml`

## 🚨 Common Scenarios

### Hotfix Release

```bash
# For urgent bug fixes
GitHub Actions → Release Dispatch → Run workflow
Version: "patch"
Draft: true
→ Review → Merge PR → Publish Release
```

### Feature Release

```bash  
# For new features
GitHub Actions → Release Dispatch → Run workflow
Version: "minor" 
Draft: true
→ Review → Merge PR → Publish Release
```

### Major Release

```bash
# For breaking changes
GitHub Actions → Release Dispatch → Run workflow  
Version: "major"
Draft: true
→ Extra review → Merge PR → Publish Release
```

### Pre-release/Beta

```bash
GitHub Actions → Release Dispatch → Run workflow
Version: "1.4.0-beta.1"
Pre-release: true
Draft: false
→ Creates immediate pre-release
```

## 🔍 Troubleshooting

### "Version mismatch" Error
- Check that `package.json` version matches expected version
- Ensure release PR was merged properly

### Unity Build Fails  
- Verify Unity license secrets are correct
- Check Unity project for compilation errors
- Review workflow logs for specific errors

### PR Not Detected as Release PR
- Ensure PR title is exactly "Release vX.X.X"
- Check branch name follows "release/vX.X.X" format

### Permission Denied
- Verify repository has required permissions
- Check if branch protection rules are blocking

## 💡 Pro Tips

1. **Always use draft releases** for review before publishing
2. **Test with patch versions** before major releases  
3. **Review generated changelogs** and edit if needed
4. **Use semantic versioning** for consistency
5. **Monitor workflow logs** for any issues

## 🆘 Emergency Procedures

### Rollback a Release
```bash
# Delete tag and release if needed
git tag -d v1.4.0
git push origin :refs/tags/v1.4.0
# Then delete release from GitHub UI
```

### Fix Failed Release
```bash
# If release workflow failed
GitHub Actions → Release Dispatch → Run workflow
# Use same version, it will overwrite
```

---

**Need help?** Check workflow logs in GitHub Actions or open an issue with error details.