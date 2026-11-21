# User Management App

A modern and responsive User Management Application built using React, Axios and MockAPI.io. This application allows users to add, view, edit and delete user details with persistent backend storage.

## Features

- Add new users
- Display users in card layout
- Edit user details
- Delete users
- Update individual user information
- Form validation
- Responsive UI
- Persistent data storage using MockAPI
- Fetch users from API
- Real-time UI updates

## Tech Stack

- React.js
- JavaScript
- CSS3
- Axios
- MockAPI.io
- React Hooks
- useReducer
- Git & GitHub

## User Details

Each user contains:

- Name
- Age
- Email
- Mobile Number

## CRUD Operations

| Operation | HTTP Method | Description |
|---|---|---|
| Create | POST | Add a new user |
| Read | GET | Fetch all users |
| Update | PUT | Edit user details |
| Delete | DELETE | Remove a user |

## Project Structure

```text
src/
├── api/
│   └── userApi.js
├── components/
│   ├── Header.jsx
│   ├── UserCard.jsx
│   └── UserList.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/user-management-app.git
```

2. Navigate to the project:

```bash
cd user-management-app
```

3. Install dependencies:

```bash
npm install
```

4. Install Axios:

```bash
npm install axios
```

5. Start the development server:

```bash
npm run dev
```

## Backend Configuration

This application uses MockAPI.io for backend data storage.

Create a `users` resource with the following fields:

| Field | Type |
|---|---|
| name | String |
| age | Number |
| email | String |
| mobileNo | String |

Configure your MockAPI endpoint in `src/api/userApi.js`.

## Learning Outcomes

- Practiced React component-based architecture
- Implemented state management using useReducer
- Integrated REST APIs using Axios
- Implemented complete CRUD operations
- Managed form inputs and validation
- Practiced asynchronous JavaScript
- Implemented persistent backend storage

## Author

Harish

