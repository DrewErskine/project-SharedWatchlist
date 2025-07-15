# 🎬 Shared Watchlist / Movie Night Picker

A collaborative web app to manage and vote on movies or shows with your partner, roommates, or friends. Never argue over what to watch again!

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Java JDK 17
- PostgreSQL 15+
- Maven 3.8+

### Frontend Setup (React + Vite + TypeScript)
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`

### Backend Setup (Spring Boot 3)
```bash
cd backend
# Set environment variables
export DB_USERNAME=your_db_username
export DB_PASSWORD=your_db_password
export JWT_SECRET=your_jwt_secret

# Run the application
mvn spring-boot:run
```
The API will be available at `http://localhost:8080/api`

## 🏗️ Project Structure

```
shared-watchlist/
├── frontend/                # React + Vite + TypeScript
│   ├── src/                # Source files
│   ├── public/             # Static files
│   └── package.json        # Dependencies and scripts
│
├── backend/                # Spring Boot 3 Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/drewerskine/sharedwatchlist/
│   │   │   │   ├── config/           # Configuration classes
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   └── JwtAuthenticationFilter.java
│   │   │   │   ├── controller/       # REST Controllers
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   └── WatchlistController.java
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   │   ├── AuthenticationRequest.java
│   │   │   │   │   ├── AuthenticationResponse.java
│   │   │   │   │   ├── WatchlistItemRequest.java
│   │   │   │   │   └── WatchlistItemResponse.java
│   │   │   │   ├── model/            # Entity classes
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── Role.java
│   │   │   │   │   └── WatchlistItem.java
│   │   │   │   ├── repository/       # JPA Repositories
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   └── WatchlistItemRepository.java
│   │   │   │   ├── service/          # Business Logic
│   │   │   │   │   ├── AuthenticationService.java
│   │   │   │   │   ├── JwtService.java
│   │   │   │   │   └── WatchlistService.java
│   │   │   │   └── SharedWatchlistApplication.java
│   │   │   └── resources/
│   │   │       └── application.yml    # Application config
│   │   └── test/          # Test files
│   └── pom.xml            # Maven dependencies
│
├── infra/                  # Infrastructure as Code
│   └── main.tf            # Terraform configuration
│
├── ci/                     # CI/CD Configuration
│   └── github-actions-workflow.yml
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query + Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Backend
- **Framework**: Spring Boot 3.1.1
- **Security**: Spring Security + JWT
- **Database**: PostgreSQL with JPA/Hibernate
- **API Documentation**: SpringDoc OpenAPI 3
- **Build Tool**: Maven
- **Testing**: JUnit 5 + Mockito

### DevOps
- **CI/CD**: GitHub Actions
- **Infrastructure**: Terraform
- **Cloud**: AWS (planned)
- **Containerization**: Docker (planned)

## 🔑 Key Features

- 📝 **Collaborative Watchlist Management**
  - Add/edit/delete movies and shows
  - Rate and review watched content
  - Share lists with friends

- 🔒 **Secure Authentication**
  - JWT-based authentication
  - Role-based access control
  - Secure password handling

- 📱 **Responsive Design**
  - Mobile-first approach
  - Optimized for all screen sizes
  - Touch-friendly interface

## 🌐 API Endpoints

### Authentication
```
POST /api/auth/register   # Register new user
POST /api/auth/login     # Login user
```

### Watchlist
```
GET    /api/watchlist           # Get user's watchlist
POST   /api/watchlist           # Add new item
PUT    /api/watchlist/{id}      # Update item
DELETE /api/watchlist/{id}      # Remove item
PUT    /api/watchlist/{id}/vote # Vote for item
```

### User Management
```
GET    /api/users/me     # Get current user
PUT    /api/users/me     # Update user profile
POST   /api/users/share  # Share watchlist
```

## 🚀 Deployment

### Local Development
1. Clone the repository
2. Set up the database
3. Configure environment variables
4. Start backend and frontend servers

### Production (Planned)
- Frontend: AWS CloudFront + S3
- Backend: AWS ECS or Elastic Beanstalk
- Database: AWS RDS PostgreSQL
- CI/CD: GitHub Actions to AWS

## 🧪 Testing

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
mvn test
```

## 📝 Environment Variables

### Backend
```
DB_USERNAME=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

### Frontend
```
VITE_API_URL=http://localhost:8080/api
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Drew Erskine**  
Building better movie nights, one feature at a time 🍿
