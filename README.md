# Event Management System

A full-stack web application for managing college or organizational events.
The platform allows organizers to create and manage events, while users can browse events and register for them.

The system demonstrates **full-stack development with React, Node.js, and database integration**, including event creation, registration workflows, and an admin/organizer dashboard.

---

# Features

### User Features

* Browse available events
* View event details
* Register for events
* View registered events

### Organizer Features

* Create new events
* Edit event details
* Manage registrations
* View participants list

### Admin Features

* Manage events
* Approve organizers
* Monitor event activity

---

# Tech Stack

Frontend

* React
* Vite
* JavaScript
* CSS

Backend

* Node.js
* Express.js

Database

* MySQL

Tools

* REST APIs
* Git
* npm

---

# Project Structure

```id="7jhdp3"
Event-Management-System
│
├── BackEnd
│   ├── routes
│   ├── controllers
│   ├── database
│   └── server.js
│
├── src
│   ├── components
│   ├── pages
│   ├── assets
│   └── App.jsx
│
├── public
├── index.html
├── package.json
└── vite.config.js
```

---

# System Workflow

1. Users browse events through the React frontend.
2. The frontend communicates with backend APIs.
3. Backend handles:

   * event creation
   * registrations
   * data validation
4. Event data is stored in the MySQL database.
5. Organizer/admin dashboards allow event management.

---

# API Endpoints (Example)

### Get All Events

```id="o66ns8"
GET /events
```

Returns a list of available events.

---

### Create Event

```id="hz51rw"
POST /events
```

Creates a new event.

Example request:

```json id="43ng0f"
{
  "title": "Hackathon 2026",
  "description": "24 hour coding challenge",
  "date": "2026-03-15",
  "venue": "Main Auditorium",
  "capacity": 200
}
```

---

### Register for Event

```id="as9pmy"
POST /events/register
```

Registers a user for an event.

---

# Running the Project

## Clone Repository

```id="8qb9ne"
git clone https://github.com/DSurya11/Event-Management-System.git
cd Event-Management-System
```

---

## Install Frontend Dependencies

```id="p5u8dq"
npm install
```

Run frontend

```id="trzv8c"
npm run dev
```

---

## Start Backend Server

Navigate to backend folder

```id="dz6y35"
cd BackEnd
```

Install backend dependencies

```id="2nbsgb"
npm install
```

Run server

```id="h3xvd3"
node server.js
```

---

