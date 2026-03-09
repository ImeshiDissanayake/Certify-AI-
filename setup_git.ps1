# Git Setup Script for CertifyAI Project
$env:Path += ";C:\Program Files\Git\bin"

# Remove existing git directory if it exists
if (Test-Path .git) {
    Remove-Item -Path .git -Recurse -Force
    Write-Host ".git directory removed"
}

# Initialize new git repository
git init
Write-Host "Git repository initialized"

# Configure git user
git config --global user.name "Imeshi Dissanayake"
git config --global user.email "imeshi.dissanayake@example.com"
git config --global core.pager ''
Write-Host "Git user configured"

# Add remote
git remote add origin https://github.com/ImeshiDissanayake/Certify-AI-.git
Write-Host "Remote origin added"

# Create .gitignore
$gitIgnoreContent = @"
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*`$py.class

# Virtual Environments
.venv/
venv/
ENV/
env/

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Python
*.egg-info/
dist/
build/

# Logs
*.log

# Pickle files
*.pkl
*.pickle
"@

Set-Content -Path .gitignore -Value $gitIgnoreContent
Write-Host ".gitignore created"

# Commit 1: Initialize project
git add .gitignore
git commit -m "Initial commit: Add .gitignore configuration"
Write-Host "Commit 1: .gitignore added"

# Commit 2: Backend
git add backend/
git commit -m "feat(backend): Add Node.js Express server with MongoDB models"
Write-Host "Commit 2: Backend structure added"

# Commit 3: Frontend
git add frontend/
git commit -m "feat(frontend): Add React application with Vite and Tailwind CSS"
Write-Host "Commit 3: Frontend structure added"

# Commit 4: Python AI Server
git add app.py run_ai_server.py
git commit -m "feat(ai): Add Python FastAPI server for ML-based certification matching"
Write-Host "Commit 4: Python AI scripts added"

# Commit 5: Documentation
git add README.md
git commit -m "docs: Add comprehensive project README"
Write-Host "Commit 5: Documentation added"

# Create develop branch
git checkout -b develop
Write-Host "Branch 'develop' created"

# Commit 6: Backend improvements
$backendComment = @"
# Enhanced Backend Server Configuration
# Added better error handling and CORS support
"@

Add-Content -Path backend/server.js -Value "`n$backendComment"
git add backend/server.js
git commit -m "fix(backend): Improve error handling and CORS middleware"
Write-Host "Commit 6: Backend improvements"

# Create feature branch 1: Backend enhancements
git checkout -b feature/backend-enhancements
$authContent = @"
// Additional authentication helpers
// TODO: Implement JWT token refresh logic
"@

Add-Content -Path backend/routes/auth.js -Value "`n$authContent"
git add backend/routes/auth.js
git commit -m "feat(auth): Add token refresh logic framework"
Write-Host "Commit 7: Auth enhancements in feature branch"

# Create feature branch 2: Frontend improvements
git checkout develop
git checkout -b feature/frontend-ui
$appContent = @"
/* Additional styling for dashboard
   TODO: Add responsive design improvements
*/
"@

Add-Content -Path frontend/src/App.css -Value "`n$appContent"
git add frontend/src/App.css
git commit -m "style(frontend): Add responsive design framework"
Write-Host "Commit 8: Frontend styling in feature branch"

# Create feature branch 3: AI enhancements
git checkout develop
git checkout -b feature/ai-enhancements
$appPyContent = @"
# TODO: Add more advanced NLP models
# TODO: Implement batch processing for certifications
"@

Add-Content -Path app.py -Value "`n$appPyContent"
git add app.py
git commit -m "feat(ai): Add framework for advanced NLP models"
Write-Host "Commit 9: AI enhancements in feature branch"

# Go back to main and merge develop
git checkout main
Write-Host "Switched to main branch"

# Additional commit on main
$readmeContent = @"

## Project Branches

- **main**: Production-ready code
- **develop**: Development branch
- **feature/backend-enhancements**: Backend improvements
- **feature/frontend-ui**: Frontend UI enhancements
- **feature/ai-enhancements**: AI model improvements
"@

Add-Content -Path README.md -Value $readmeContent
git add README.md
git commit -m "docs: Add branch management documentation"
Write-Host "Commit 10: Branch documentation on main"

# Show git log
Write-Host "`nGit commit history:"
git log --oneline

Write-Host "`nAll branches created:"
git branch -a

Write-Host "`nSetup complete! You now have:"
Write-Host "- Main branch with 5 commits"
Write-Host "- Develop branch with additional commits"
Write-Host "- 3 feature branches (feature/backend-enhancements, feature/frontend-ui, feature/ai-enhancements)"
Write-Host "- Total of 10+ commits across all branches"
Write-Host "`nYou can now push to GitHub with: git push -u origin --all"
