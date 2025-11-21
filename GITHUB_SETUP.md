# GitHub Setup Guide

## Prerequisites
- GitHub account
- Git installed (already available in Replit)

## Step 1: Create a New Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `adboss-marketing-site` (or your preferred name)
   - **Description**: "Marketing website for AdBOSS with user authentication"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Get Your Repository URL

After creating the repository, you'll see a page with setup instructions. Copy the repository URL, which looks like:
```
https://github.com/YOUR_USERNAME/adboss-marketing-site.git
```

## Step 3: Push Your Code to GitHub

### From Replit Shell:

```bash
# Check current git status
git status

# Add all files to staging
git add .

# Commit your changes
git commit -m "Initial commit: AdBOSS marketing site with authentication"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/adboss-marketing-site.git

# Push your code to GitHub
git push -u origin main
```

### Authentication

If you're asked for authentication:

**Option 1: Personal Access Token (Recommended)**

1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Replit Access"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token (you won't see it again!)
7. When prompted for a password, use this token instead

**Option 2: SSH Key**

1. Generate SSH key in Replit Shell:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
2. Press Enter to accept default file location
3. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
4. Add this key to GitHub: Settings > SSH and GPG keys > New SSH key
5. Use SSH URL instead:
   ```bash
   git remote set-url origin git@github.com:YOUR_USERNAME/adboss-marketing-site.git
   ```

## Step 4: Verify Your Push

1. Go to your GitHub repository in the browser
2. Refresh the page
3. You should see all your files uploaded

## Updating Your Repository Later

After making changes to your code:

```bash
# Check what's changed
git status

# Add changed files
git add .

# Commit with a descriptive message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## Common Commands

```bash
# View commit history
git log --oneline

# Check remote repositories
git remote -v

# See differences
git diff

# Undo uncommitted changes
git checkout -- filename

# View current branch
git branch
```

## Troubleshooting

### "Repository not found"
- Double-check the repository URL
- Ensure you have access to the repository
- Verify your authentication credentials

### "Permission denied"
- Check your Personal Access Token or SSH key
- Ensure the token has the correct permissions
- Try regenerating your token

### "Nothing to commit"
- Your files might already be committed
- Check `git status` to see the current state
- Use `git log` to see previous commits

---

**Need More Help?**
- [GitHub Docs](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
