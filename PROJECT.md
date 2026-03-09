# CertifyAI - Project Summary & Documentation Index

## 📌 Quick Navigation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Main project documentation, installation, and setup guide |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines and development workflow |
| [LICENSE](LICENSE) | MIT License |
| [GITHUB_SETUP.md](GITHUB_SETUP.md) | GitHub repository structure and branch information |
| [PROJECT.md](PROJECT.md) | This file - Project overview and documentation index |

## 🎯 Project Vision

CertifyAI is an AI-powered platform that helps professionals find the perfect certifications and learning paths tailored to their skills, experience, and career goals. By leveraging machine learning and natural language processing, we provide personalized, data-driven recommendations to accelerate career growth.

## 🏗️ Architecture Overview

### Three-Tier Application

```
┌─────────────────────────────────────────────────┐
│          Frontend (React + Tailwind)            │
│      User Interface - Port 5173                 │
└────────────────┬────────────────────────────────┘
                 │ HTTP/REST API
┌────────────────v────────────────────────────────┐
│      Backend (Node.js + Express)                │
│      API Server - Port 5000                     │
│      - User Management                          │
│      - Authentication                           │
│      - Course Management                        │
└────────────────┬────────────────────────────────┘
                 │ HTTP/gRPC
┌────────────────v────────────────────────────────┐
│    AI Server (Python + FastAPI)                 │
│    ML Engine - Port 8000                        │
│    - Resume Analysis                            │
│    - Certification Matching                     │
│    - Recommendation Engine                      │
└─────────────────────────────────────────────────┘
                 │
┌────────────────v────────────────────────────────┐
│      Database (MongoDB)                         │
│      - Users                                    │
│      - Courses/Certifications                   │
│      - User Profiles                            │
└─────────────────────────────────────────────────┘
```

## 📊 Project Structure

```
CertifyAI/
├── 📁 .github/                          # GitHub Configuration
│   ├── 📁 ISSUE_TEMPLATE/               # Issue templates
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md         # PR template
├── 📁 backend/                          # Node.js Backend
│   ├── server.js
│   ├── package.json
│   ├── 📁 models/
│   │   ├── User.js
│   │   └── Course.js
│   └── 📁 routes/
│       ├── auth.js
│       └── admin.js
├── 📁 frontend/                         # React Frontend
│   ├── 📁 src/
│   │   ├── App.jsx
│   │   ├── AuthPage.jsx
│   │   └── 📁 components/
│   │       └── AdminDashboard.jsx
│   ├── vite.config.js
│   └── tailwind.config.js
├── 📁 .venv/                            # Python Virtual Environment
├── app.py                               # FastAPI Main Application
├── run_ai_server.py                     # AI Server Launcher
├── README.md                            # Main Documentation
├── CONTRIBUTING.md                      # Contribution Guidelines
├── LICENSE                              # MIT License
├── GITHUB_SETUP.md                      # GitHub Setup Info
└── PROJECT.md                           # This File
```

## 🔄 Development Workflow

### Branching Strategy (Git Flow)

```
main (Production)
 ↑
 └─ develop (Integration)
     ↑
     ├─ feature/feature-name
     ├─ feature/backend-enhancements
     ├─ feature/frontend-ui
     └─ feature/ai-enhancements
```

### Branch Purposes

| Branch | Purpose | Deployed To |
|--------|---------|-------------|
| `main` | Production-ready code | Production |
| `develop` | Integration branch | Staging |
| `feature/*` | Feature development | Local |

### Workflow Steps

1. Create feature branch from `develop`
2. Make changes and commit locally
3. Push to GitHub
4. Create Pull Request to `develop`
5. Code review and CI/CD checks
6. Merge to `develop`
7. Release: merge `develop` → `main`

## 📈 Key Features

### Frontend Features
- ✅ User authentication & registration
- ✅ Resume upload interface
- ✅ Certification recommendations display
- ✅ User profile management
- ✅ Admin dashboard
- ✅ Responsive design (Mobile, Tablet, Desktop)

### Backend Features
- ✅ RESTful API endpoints
- ✅ JWT authentication
- ✅ User & course management
- ✅ Database operations
- ✅ Error handling & validation
- ✅ CORS support

### AI Features
- ✅ PDF resume parsing
- ✅ NLP-based skill extraction
- ✅ TF-IDF text vectorization
- ✅ Cosine similarity matching
- ✅ Certification recommendations
- ✅ Ranking & scoring

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.10+
- MongoDB
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/ImeshiDissanayake/Certify-AI-.git
cd Certify-AI-

# Backend setup
cd backend && npm install && npm start

# Frontend setup (new terminal)
cd frontend && npm install && npm run dev

# AI Server setup (new terminal)
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
python run_ai_server.py
```

### Verify Installation
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- AI Server: http://localhost:8000

## 📚 Technology Stack

### Frontend
- **Framework**: React.js 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Linting**: ESLint

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Security**: bcrypt

### AI/ML
- **Language**: Python 3.10+
- **Framework**: FastAPI
- **ML**: scikit-learn
- **NLP**: NLTK/spaCy
- **PDF Processing**: PyPDF2

### DevOps
- **Version Control**: Git
- **Repository**: GitHub
- **Package Managers**: npm, pip
- **Environment**: .venv (Python)

## 🔒 Security Considerations

### Authentication
- JWT-based token authentication
- Secure password hashing with bcrypt
- Token refresh mechanism

### Data Protection
- Environment variables for sensitive data
- CORS configuration
- Input validation & sanitization
- Error handling without exposing sensitive info

### Best Practices
- Regular dependency updates
- Security headers configuration
- Rate limiting (recommended)
- HTTPS in production (recommended)

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  profile: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Course Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  provider: String,
  level: String,
  duration: String,
  skills: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh token

### User Management
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `DELETE /api/users/:id` - Delete account

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### AI Recommendations
- `POST /api/recommend` - Get recommendations
- `GET /api/health` - AI server health check

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test              # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

### Backend Testing
```bash
cd backend
npm test              # Run tests
npm run test:watch   # Watch mode
```

### Python Testing
```bash
pytest app.py
pytest --cov=.      # Coverage report
```

## 📖 Documentation

### For Users
- [README.md](README.md) - Setup and usage guide
- Project features and capabilities
- FAQ and troubleshooting

### For Developers
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
- [.github/ISSUE_TEMPLATE](/.github/ISSUE_TEMPLATE) - Issue templates
- [.github/PULL_REQUEST_TEMPLATE](/.github/PULL_REQUEST_TEMPLATE) - PR template
- API documentation in code comments

### For DevOps
- Deployment configurations
- Environment setup guides
- Database migration scripts

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code style guidelines
- Commit message format
- Pull request process
- Reporting bugs
- Feature requests

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 👥 Team

**Lead Developer**: Imeshi Dissanayake
- GitHub: [@ImeshiDissanayake](https://github.com/ImeshiDissanayake)
- Email: imeshi.dissanayake@example.com

## 🔗 Useful Links

- **GitHub Repository**: https://github.com/ImeshiDissanayake/Certify-AI-
- **Issues**: https://github.com/ImeshiDissanayake/Certify-AI-/issues
- **Discussions**: https://github.com/ImeshiDissanayake/Certify-AI-/discussions
- **Project Board**: https://github.com/ImeshiDissanayake/Certify-AI-/projects

## 📋 Checklist for New Contributors

- [ ] Read [README.md](README.md)
- [ ] Read [CONTRIBUTING.md](CONTRIBUTING.md)
- [ ] Set up development environment
- [ ] Understand the project structure
- [ ] Review existing code
- [ ] Check open issues
- [ ] Follow commit conventions
- [ ] Write tests for changes
- [ ] Submit PR to `develop` branch

## 🎯 Roadmap

### Current Version: 1.0.0
- ✅ Core features implemented
- ✅ Authentication system
- ✅ AI recommendation engine
- ✅ Admin dashboard

### Planned Features
- [ ] Advanced ML models
- [ ] Real-time notifications
- [ ] Social sharing features
- [ ] Mobile app
- [ ] Analytics dashboard
- [ ] Multi-language support

## 📞 Support

### Getting Help
1. Check [README.md](README.md) FAQ
2. Search existing [issues](https://github.com/ImeshiDissanayake/Certify-AI-/issues)
3. Create new issue with detailed information
4. Use GitHub Discussions for questions

### Reporting Issues
- Use [bug_report.md](.github/ISSUE_TEMPLATE/bug_report.md) template
- Include OS, browser, and version info
- Provide steps to reproduce
- Add screenshots if applicable

### Feature Requests
- Use [feature_request.md](.github/ISSUE_TEMPLATE/feature_request.md) template
- Describe the problem it solves
- Explain your use case
- Suggest implementation approach

## 📊 Project Statistics

- **Lines of Code**: 10,000+
- **Commits**: 13+
- **Branches**: 5
- **Contributors**: Open to contributions
- **License**: MIT
- **Last Updated**: March 2026

---

**Last Updated**: March 9, 2026
**Status**: Active Development
**Version**: 1.0.0