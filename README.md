# 🎬 Shared Watchlist / Movie Night Picker

A collaborative web app to manage and vote on movies or shows with your partner, roommates, or friends. Never argue over what to watch again!

---

## 🚀 Features

- 📝 Add, edit, or delete movies/shows
- 👍 Vote on watchlist items
- 🔀 "Pick something random" button
- 🧑‍🤝‍🧑 Shared lists (via invite link or login)
- 📬 Optional email or SMS reminders (e.g. "Movie Night Friday!")
- 🧾 History of what you've already watched
- 📱 Mobile-friendly for use on calls or couch time

---

## 🧰 Tech Stack

### Frontend
- React (Vite or CRA)
- Tailwind CSS or Bootstrap
- React Router, Axios

### Backend
- Java Spring Boot (REST API)
- Spring Security (JWT-based auth)
- PostgreSQL or MongoDB

### DevOps / Infra
- Docker (multi-container: frontend, backend, db)
- GitHub Actions for CI/CD
- Infrastructure-as-Code (Terraform or CloudFormation)

### AWS Services
- EC2 or Elastic Beanstalk for hosting
- S3 for storing media (e.g., poster images)
- SES or SNS for notifications
- RDS (PostgreSQL) for storage
- CloudWatch for monitoring/logs

---

## 🗂️ Project Structure

```yaml
shared-watchlist/
├── frontend/ # React app
├── backend/ # Spring Boot app
├── infra/ # AWS/Terraform templates
├── ci/ # GitHub Actions / Jenkins files
└── README.md
```

---

## 🌐 APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/watchlist | Get current watchlist |
| POST   | /api/watchlist | Add a new item |
| PUT    | /api/watchlist/{id}/vote | Vote for an item |
| DELETE | /api/watchlist/{id} | Remove item |
| POST   | /api/notify | Send reminder (email/text) |

---

## 🧪 DevOps Goals

- ✅ Dockerized frontend and backend
- ✅ CI/CD pipeline (test, build, deploy)
- ✅ Use IAM roles and policies for secure AWS integration
- ✅ Auto-deploy changes to staging environment (Elastic Beanstalk or ECS)
- ✅ Monitor logs and alerts via CloudWatch

---

## 🗺️ Roadmap

- [ ] Wireframing (via BoltAI, Figma, etc.)
- [ ] Set up frontend project (React + Tailwind)
- [ ] Set up Spring Boot REST API
- [ ] PostgreSQL schema design
- [ ] Dockerize the entire stack
- [ ] Deploy to AWS
- [ ] Add notification system (email or SMS)
- [ ] Polish UI for mobile experience

---

## 📸 Screenshots

_(Add mockups or screenshots once available)_

---

## 🙋‍♂️ Author

**Drew Erskine**  
Built for learning DevOps, AWS, and having better movie nights 🍿
