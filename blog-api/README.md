# Blog API Documentation

A RESTful API for a blog application built with Node.js, Express, and MongoDB.

## Base URL

`http://localhost:5000/api`

## Authentication

Most endpoints require authentication using JWT tokens.

### Register

- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
