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

#### Backend Structure
```
backend/
├── src/main/java/com/drewerskine/sharedwatchlist/
│   ├── config/                    # Configuration classes
│   │   ├── ApplicationConfig      # Core application config
│   │   ├── SecurityConfig        # Security settings
│   │   ├── JwtAuthenticationFilter
│   │   ├── OpenApiConfig        # Swagger/OpenAPI config
│   │   └── CorsConfig           # CORS settings
│   │
│   ├── controller/               # REST Controllers
│   │   ├── AuthController       # Authentication endpoints
│   │   └── WatchlistController  # Watchlist management
│   │
│   ├── dto/                      # Data Transfer Objects
│   │   ├── AuthenticationRequest
│   │   ├── AuthenticationResponse
│   │   ├── WatchlistItemRequest
│   │   └── WatchlistItemResponse
│   │
│   ├── exception/               # Exception handling
│   │   ├── ApiError            # Error response structure
│   │   └── GlobalExceptionHandler
│   │
│   ├── model/                   # Entity classes
│   │   ├── User                # User entity
│   │   ├── Role                # User roles enum
│   │   └── WatchlistItem       # Watchlist entity
│   │
│   ├── repository/             # Data access layer
│   │   ├── UserRepository
│   │   └── WatchlistItemRepository
│   │
│   ├── service/                # Business logic
│   │   ├── AuthenticationService
│   │   ├── JwtService
│   │   └── WatchlistService
│   │
│   └── SharedWatchlistApplication.java  # Main class
│
└── src/main/resources/
    └── application.yml         # Application properties

#### Backend Features
1. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control
   - Secure password hashing
   - Token-based session management

2. **RESTful APIs**
   - Authentication endpoints
     ```
     POST /api/v1/auth/register  # Register new user
     POST /api/v1/auth/login     # Login user
     ```
   - Watchlist endpoints
     ```
     GET    /api/v1/watchlist           # Get watchlist
     POST   /api/v1/watchlist           # Add item
     PUT    /api/v1/watchlist/{id}      # Update item
     DELETE /api/v1/watchlist/{id}      # Delete item
     POST   /api/v1/watchlist/{id}/vote # Vote for item
     ```

3. **Database Schema**
   ```sql
   -- Users table
   CREATE TABLE _user (
       id BIGINT PRIMARY KEY,
       firstname VARCHAR(255),
       lastname VARCHAR(255),
       email VARCHAR(255) UNIQUE,
       password VARCHAR(255),
       role VARCHAR(50)
   );

   -- Watchlist items table
   CREATE TABLE watchlist_items (
       id BIGINT PRIMARY KEY,
       title VARCHAR(255),
       description TEXT,
       poster_url VARCHAR(255),
       type VARCHAR(50),
       year INTEGER,
       genre VARCHAR(100),
       rating DOUBLE PRECISION,
       runtime INTEGER,
       added_by_user_id BIGINT,
       created_at TIMESTAMP,
       updated_at TIMESTAMP,
       watched_at TIMESTAMP,
       FOREIGN KEY (added_by_user_id) REFERENCES _user(id)
   );

   -- Votes junction table
   CREATE TABLE watchlist_item_votes (
       watchlist_item_id BIGINT,
       user_id BIGINT,
       PRIMARY KEY (watchlist_item_id, user_id),
       FOREIGN KEY (watchlist_item_id) REFERENCES watchlist_items(id),
       FOREIGN KEY (user_id) REFERENCES _user(id)
   );
   ```

4. **Security Features**
   - CORS configuration for frontend access
   - CSRF protection
   - Password encryption
   - JWT token validation
   - Protected endpoints
   - Request validation

5. **API Documentation**
   - Swagger UI available at `/swagger-ui.html`
   - OpenAPI 3.0 specification
   - Detailed endpoint documentation
   - Request/Response examples
   - Authentication documentation

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
