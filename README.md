# Code & Coffee Corner

A blog site for software developers to share posts and engage in discussions.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
- [Usage](#usage)
- [License](#license)
- [Deployment](#deployment)
- [Contact](#contact)

## Introduction

Code & Coffee Corner is a web application built with Node.js, Express, Sequelize, and Handlebars. It provides a platform for developers to share their insights, thoughts, and engage in discussions through blog posts.

## Features

## Features

1. **User Authentication:**

   - Allow users to create accounts and log in securely.
   - Implement password hashing using bcrypt for enhanced security.

2. **Blog Post Management:**

   - Enable users to create, edit, and delete their blog posts.
   - Support Markdown for formatting blog content.

3. **Commenting System:**

   - Allow users to comment on blog posts.
   - Implement features such as thread replies and comment moderation.

4. **Session Management:**

   - Utilize Express sessions for managing user sessions.
   - Set up secure session configurations, such as session storage with Sequelize.

5. **Database Integration:**

   - Use Sequelize as an ORM to interact with the MySQL database.
   - Define and implement database models for users, blog posts, and comments.

6. **Static File Serving:**

   - Serve static files, such as images or stylesheets, using Express.

7. **Middleware:**

   - Implement middleware for parsing incoming request bodies.
   - Utilize middleware for handling authentication and other custom functionalities.

8. **Handlebars Templates:**

   - Use Handlebars as the templating engine for rendering dynamic content.

9. **Environmental Configuration:**

   - Utilize the dotenv library for managing environment variables.

10. **Database Seeding:**

    - Provide a script or command to seed the database with initial data.

11. **Error Handling:**

    - Implement custom error handling for a better user experience.

12. **Prettier Integration:**
    - Include Prettier as a development dependency for code formatting consistency.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MySQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/McleodHerritt/code-coffee-corner.git

   ```

2. Install dependencies

   ```
   npm install
   ```

### Database Setup

1.  Create a MySQL database

2.  Update the database in the .env file:

```
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
```

## Usage

1. **Start the application:**

   ```
   bash
   npm start
   ```

2. Open your browser and navigate to http://localhost:3001

## License

This project is licensed under the [UNLICENSED License](LICENSE).

## Deployment

The app has been deployed to heroku at this [link](https://code-and-coffee-corner-892f648b05e0.herokuapp.com/).

## Contact

- **Author:** Nicole Herritt
- **GitHub:** [McleodHerritt](https://github.com/McleodHerritt)
- **Issue Tracker:** [Code & Coffee Corner Issues](https://github.com/McleodHerritt/code-coffee-corner/issues)
