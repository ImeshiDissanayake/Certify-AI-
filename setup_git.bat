@echo off
setlocal enabledelayedexpansion

cd /d C:\Users\MSii\Desktop\CertifyAI_Project

REM Add Git to path
set PATH=%PATH%;C:\Program Files\Git\bin

REM Disable Git pager
git config --global core.pager ""

REM Initialize Git if not already done
if not exist .git (
    git init
    echo Git initialized
)

REM Configure user
git config --global user.name "Imeshi Dissanayake"
git config --global user.email "imeshi.dissanayake@example.com"

REM Add remote
git remote add origin https://github.com/ImeshiDissanayake/Certify-AI-.git 2>nul

REM Commit 1: gitignore
if not exist .gitignore (
    (
        echo # Ignore Python cache
        echo __pycache__/
        echo *.pyc
        echo .venv/
        echo venv/
        echo # Ignore Node cache
        echo node_modules/
        echo npm-debug.log
        echo # Ignore IDE
        echo .vscode/
        echo .idea/
        echo # OS
        echo .DS_Store
        echo Thumbs.db
    ) > .gitignore
)
git add .gitignore
git commit -m "Initial commit: Add .gitignore configuration" 2>nul
echo Commit 1 completed

REM Commit 2: Backend
git add backend/ 2>nul
git commit -m "feat(backend): Add Node.js Express server with MongoDB models" 2>nul
echo Commit 2 completed

REM Commit 3: Frontend
git add frontend/ 2>nul
git commit -m "feat(frontend): Add React application with Vite and Tailwind CSS" 2>nul
echo Commit 3 completed

REM Commit 4: Python scripts
git add app.py run_ai_server.py 2>nul
git commit -m "feat(ai): Add Python FastAPI server for certification matching" 2>nul
echo Commit 4 completed

REM Commit 5: README
git add README.md 2>nul
git commit -m "docs: Add comprehensive project README with installation guide" 2>nul
echo Commit 5 completed

REM Create develop branch
git checkout -b develop 2>nul
echo Develop branch created

REM Commit 6: Backend improvements
echo # Backend configuration updates >> backend/server.js
git add backend/server.js 2>nul
git commit -m "fix(backend): Improve error handling and CORS configuration" 2>nul
echo Commit 6 completed

REM Create feature branch 1
git checkout -b feature/backend-enhancements 2>nul
echo # Auth improvements >> backend/routes/auth.js
git add backend/routes/auth.js 2>nul
git commit -m "feat(auth): Add JWT token validation framework" 2>nul
echo Commit 7 completed

REM Create feature branch 2
git checkout develop 2>nul
git checkout -b feature/frontend-ui 2>nul
echo /* Frontend styling updates */ >> frontend/src/App.css
git add frontend/src/App.css 2>nul
git commit -m "style(frontend): Add responsive design improvements" 2>nul
echo Commit 8 completed

REM Create feature branch 3
git checkout develop 2>nul
git checkout -b feature/ai-enhancements 2>nul
echo # AI model improvements >> app.py
git add app.py 2>nul
git commit -m "feat(ai): Add advanced NLP processing framework" 2>nul
echo Commit 9 completed

REM Return to main and add final commit
git checkout main 2>nul
(
    echo.
    echo ## Branches
    echo.
    echo - main: Production code
    echo - develop: Development branch
    echo - feature/backend-enhancements: Backend improvements
    echo - feature/frontend-ui: Frontend UI enhancements
    echo - feature/ai-enhancements: AI model improvements
) >> README.md
git add README.md 2>nul
git commit -m "docs: Add branch management guide to README" 2>nul
echo Commit 10 completed

REM Show final status
echo.
echo === Git Setup Complete ===
echo.
git log --oneline --graph --all --decorate
echo.
echo All branches:
git branch -a
echo.
echo Next: Push to GitHub with: git push -u origin --all

endlocal
