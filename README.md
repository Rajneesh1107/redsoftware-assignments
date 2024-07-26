# Redsoftware Backend Assignment

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Running the Application](#running-the-application)
7. [Error Handling](#error-handling)
8. [Authentication](#authentication)
9. [Contribution Guidelines](#contribution-guidelines)
10. [License](#license)

# Deployed Url

[https://deploy-redsoft-backend.onrender.com](https://deploy-redsoft-backend.onrender.com) 


## Project Overview

This project is a backend assignment for Redsoftware. It provides a REST API for user authentication, story creation, and contribution management. It includes user registration, login, and logout functionalities, as well as CRUD operations for stories and their contributions. The project uses Node.js, Express, and MongoDB for backend development.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 16 or later)
- npm (version 6 or later)
- MongoDB

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Rajneesh1107/deploy-redsoft-backend.git
   ```

2. Navigate to the project directory:
   cd deploy-redsoft-backend

3. Install the dependencies:
   ```sh
   npm install
   ```

## Environment Variables

Create a .env file in the root directory and add the following environment variables:

Required Environment Variables
- PORT: The port number on which the server will run.
- MONGO_URI: The connection string for your MongoDB database.
- SALT_ROUND: The number of salt rounds to use for hashing passwords.
- SECRET_ACCESS_KEY_USER: The secret key used for generating access tokens.
- EMAIL: The email address used for sending emails.
- EMAIL_PASSWORD: The password for the email account used for sending emails.

# Example

- PORT = 4001
- MONGODB_URI = mongodb+srv://<user_name>:<user_password>@cluster0.ylgcler.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0
- SALT_ROUND = 8
- SECRET_ACCESS_KEY_USER = RedSoftwareJWT_SecretKey
- EMAIL = admin@gmail.com
- EMAIL_PASS = smtp server password

## API Endpoints

# User Endpoints

1. Register User
   POST /api/register
   Request Body:
   {
   "username": "<username>",
   "email": "<email>",
   "password": "<password>"
   }

2. Login User
   POST /api/login
   Request Body:
   {
   "email": "<email>",
   "password": "<password>",
   }

3. Get User Details
   GET /api/user/:id

# Story Endpoints

1. Create Story
   POST /api/create-story
   Request Body:
   {
   "title": "<story_title>"
   }

2. Get All Stories
   GET /api/stories

3. Get Story Details
   GET /api/story/:id

4. Add Story Contribution
   POST /api/story/:id/content
   Request Body:
   {
   "content": "<content>",
   }

5. Send Story to Email
   GET /api/story/share-story/:id
   Request Body:
   {
   "email": "<story_receiver_email>"
   }

## Running the Application

Start the server:

```sh
 npm start
```

## Error Handling

The application handles errors and sends appropriate responses based on the HTTP status codes. It uses try-catch blocks to handle exceptions and sends error messages to the client.

## Authentication

The application uses JWT (JSON Web Token) for authentication. The authentication middleware is used to verify access tokens and ensure that routes are protected.

## Contribution Guidelines

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Create a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
