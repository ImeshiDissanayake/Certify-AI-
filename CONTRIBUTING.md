# Contributing to CertifyAI

Thank you for your interest in contributing to CertifyAI! We welcome contributions from everyone. This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Questions](#questions)

## 📜 Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing opinions, viewpoints, and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior include:

- The use of sexualized language or imagery and unwelcome sexual attention or advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

## 🚀 Getting Started

### Prerequisites

- Git installed on your machine
- Node.js (v16.0.0 or higher)
- Python (v3.10 or higher)
- npm or yarn package manager
- MongoDB (Local or Atlas Cloud account)

### Fork and Clone

1. **Fork the repository** on GitHub
   - Click the "Fork" button in the top right corner

2. **Clone your fork locally**
   ```bash
   git clone https://github.com/your-username/Certify-AI-.git
   cd Certify-AI-
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ImeshiDissanayake/Certify-AI-.git
   git remote -v  # Verify both origin and upstream are present
   ```

## 🛠️ Development Setup

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/certifyai" > .env
echo "JWT_SECRET=your_secret_key" >> .env
echo "PORT=5000" >> .env

# Start development server
npm run dev  # or npm start
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

### AI Server Setup

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server
python run_ai_server.py
```

## ✍️ Making Changes

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
# Sync with upstream
git fetch upstream
git checkout develop
git merge upstream/develop

# Create feature branch
git checkout -b feature/your-feature-name
```

### Branch Naming Convention

- `feature/feature-name` - New features
- `bugfix/bug-name` - Bug fixes
- `hotfix/critical-issue` - Critical production fixes
- `docs/documentation-name` - Documentation updates
- `refactor/component-name` - Code refactoring

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed

### Code Style Guidelines

#### JavaScript/React
- Use ES6+ syntax
- Follow ESLint configuration
- Use functional components with hooks
- Add PropTypes for components
- Use meaningful variable names

```javascript
// Good
const [userData, setUserData] = useState(null);

// Bad
const [u, setU] = useState(null);
```

#### Python
- Follow PEP 8 style guide
- Use type hints where possible
- Write docstrings for functions
- Use meaningful variable names

```python
# Good
def calculate_similarity(text1: str, text2: str) -> float:
    """Calculate cosine similarity between two texts."""
    pass

# Bad
def cs(t1, t2):
    pass
```

### 3. Test Your Changes

Before submitting, test your code:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Python linting
cd ..
pip install pylint
pylint *.py
```

## 📝 Commit Guidelines

We follow semantic commit messages:

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process or dependencies

### Scope
The scope specifies what part of the codebase is affected:
- `auth` - Authentication related
- `api` - API endpoints
- `ui` - User interface
- `ai` - AI/ML components
- `db` - Database operations

### Subject
- Use imperative, present tense ("add feature" not "added feature")
- Don't capitalize first letter
- No period (.) at the end
- Limit to 50 characters

### Examples

```bash
git commit -m "feat(auth): add JWT token refresh logic"
git commit -m "fix(api): resolve user profile retrieval bug"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(ui): improve component structure"
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/develop
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**
   - Go to GitHub and create a PR from your fork
   - Target the `develop` branch (not `main`)
   - Fill out the PR template completely

### PR Title
Follow the same format as commits:
```
feat(scope): brief description
```

### PR Description

Include:
- What changes you made
- Why you made these changes
- How to test the changes
- Related issues (e.g., "Fixes #123")
- Screenshots (if UI changes)

### PR Checklist

- [ ] My code follows the style guidelines
- [ ] I have updated the documentation
- [ ] I have added/updated tests
- [ ] All tests pass locally
- [ ] I have self-reviewed my code
- [ ] I have commented complex logic
- [ ] I have removed console.log statements
- [ ] I have squashed unnecessary commits

### Review Process

1. **Automated Checks**
   - Linting verification
   - Test suite execution
   - Code coverage checks

2. **Code Review**
   - Maintainers review your changes
   - Respond to feedback professionally
   - Make requested changes

3. **Approval & Merge**
   - Once approved, your PR will be merged to `develop`
   - Main branch updates happen during releases

## 🐛 Reporting Bugs

### Before Reporting

- Check existing issues (open and closed)
- Make sure the bug is reproducible
- Test on different browsers/environments

### Bug Report Template

```markdown
## Description
A clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 90]
- Node.js version: [if applicable]

## Screenshots
[If applicable, add screenshots]

## Additional Context
[Any other context]
```

## 💡 Suggesting Features

### Before Suggesting

- Check existing issues and PRs
- Think through the use case
- Consider how it fits the project's vision

### Feature Request Template

```markdown
## Description
Clear description of the feature

## Problem it Solves
What problem does this feature solve?

## Proposed Solution
How should this be implemented?

## Alternative Solutions
Other approaches considered

## Additional Context
Any other relevant information
```

## ❓ Questions

- **GitHub Issues**: Ask in the issues section
- **Discussions**: Use GitHub Discussions for general questions
- **Email**: Contact the maintainers directly

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🎉 Thank You

Thank you for contributing to CertifyAI! Your efforts help make this project better for everyone.

---

**Questions or need help?** Open an issue or reach out to the maintainers!

**Happy contributing!** 🚀