# IMF Gadget API

A secure and robust RESTful API for managing users, gadgets, deployments, and self-destruction operations, built with **Express.js**, **Sequelize**, and **PostgreSQL**.

---

## Table of Contents

- [IMF Gadget API](#imf-gadget-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [API Documentation](#api-documentation)
  - [Main Endpoints](#main-endpoints)
  - [Project Structure](#project-structure)
  - [Usage Examples](#usage-examples)
    - [Authentication](#authentication)
    - [Gadgets](#gadgets)
    - [Deployment](#deployment)
    - [Self-Destruction](#self-destruction)
  - [Contributing](#contributing)
  - [Testing](#testing)
  - [Security](#security)
  - [License](#license)

---

## Features

- **Authentication**: Register, login, logout, and delete users securely with JWT and cookies.
- **Gadget Management**: CRUD operations for gadgets in the IMF inventory.
- **Deployment**: Assign and deploy gadgets to missions.
- **Self-Destruction**: Securely trigger gadget self-destruction.
- **API Documentation**: Interactive Swagger UI at `/api-docs`.
- **Strict Validation**: Strictly validates user inputs.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (via Sequelize ORM)
- **Authentication**: JWT, HTTP-only cookies
- **Documentation**: Swagger (OpenAPI 3.0)
- **Validation**: express-validator

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd "IMF Gadget API"
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env` and update values as needed:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=imf_gadget_database
     DB_DIALECT=postgres
     JWT_SECRET=your_jwt_secret_key
     ```
4. **Start the server:**
   - Development:
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm start
     ```

## Environment Variables

| Variable    | Description       | Example             |
| ----------- | ----------------- | ------------------- |
| PORT        | Server port       | 5000                |
| DB_HOST     | Database host     | localhost           |
| DB_USER     | Database user     | your_username       |
| DB_PASSWORD | Database password | your_password       |
| DB_NAME     | Database name     | your_database_name  |
| DB_DIALECT  | Database dialect  | postgres            |
| JWT_SECRET  | JWT secret key    | your_jwt_secret_key |

## API Documentation

- Access Swagger UI at: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- Explore all endpoints, schemas, and try requests interactively.

## Main Endpoints

| Route Prefix       | Description                                           |
| ------------------ | ----------------------------------------------------- |
| `/api/auth`        | User authentication (register, login, logout, delete) |
| `/api/gadgets`     | Gadget inventory management                           |
| `/api/deployment`  | Deploy gadgets to missions                            |
| `/api/destruction` | Gadget self-destruction                               |

## Project Structure

```
├── controllers/           # Route handlers
├── middleware/            # Auth & validation middleware
│   └── validation/        # Validation schemas
├── models/                # Sequelize models
├── routes/                # Express route definitions
├── utils/                 # Helper functions
├── server.js              # App entry point
├── swagger.js             # Swagger config
├── .env                   # Environment variables
├── package.json           # Project metadata
```

## Usage Examples

### Authentication

- **Register:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login`
- **Logout:** `POST /api/auth/logout`
- **Delete User:** `POST /api/auth/deleteUser`

### Gadgets

- **Create Gadget:** `POST /api/gadgets`
- **List Gadgets:** `GET /api/gadgets`
- **Update Gadget:** `PATCH /api/gadgets/:id`
- **Decommission Gadget:** `PATCH /api/gadgets/:id/decommission`

### Deployment

- **Deploy Gadget:** `PATCH /api/deployment/:id/deployed`

### Self-Destruction

- **Self-Destruct Gadget:** `PATCH /api/destruction/:id/self-destruct`

## Contributing

Contributions, issues, and feature requests are welcome! Please open an issue or submit a pull request.

## Testing

- Manual testing via Swagger UI is supported.
- Automated tests can be added using Jest, Mocha, or your preferred framework.

## Security

- JWT-based authentication with HTTP-only cookies
- Input validation and error handling
- CORS enabled
- Passwords are hashed using bcryptjs
- Strict validation for user input
- User-friendly error messages

## License

This project is licensed under the ISC License.

---

**IMF Gadget API** – Your mission, should you choose to accept it, starts here.
