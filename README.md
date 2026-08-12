\# TaskFlow



TaskFlow is a modern full-stack task management application built with \*\*React.js\*\* and \*\*ASP.NET Core Web API\*\*.



It provides a clean productivity dashboard for creating, updating, organizing, filtering, and tracking tasks while maintaining persistent activity history.



\## Screenshots



\### Dashboard



!\[TaskFlow Dashboard](screenshots/dashboard.png)



\### Activity



!\[TaskFlow Activity](screenshots/activity.png)



\### Dark Mode



!\[TaskFlow Dark Mode](screenshots/dark-mode.png)



\## Features



\- Create, edit, and delete tasks

\- Task status management

\- Priority management

\- Due-date tracking

\- Search and filtering

\- Dashboard statistics

\- Completion-rate visualization

\- Persistent activity history

\- Dark mode

\- Toast notifications

\- Responsive user interface

\- REST API architecture

\- SQLite data persistence



\## Tech Stack



\### Frontend



\- React.js

\- JavaScript

\- Vite

\- HTML5

\- CSS3

\- Lucide React

\- React Hot Toast



\### Backend



\- C#

\- .NET 9

\- ASP.NET Core Web API

\- Entity Framework Core

\- SQLite



\### Development Tools



\- Git

\- GitHub

\- Visual Studio Code

\- REST Client

\- npm

\- .NET CLI



\## Architecture



```text

React Frontend

&#x20;     |

&#x20;     | HTTP / REST / JSON

&#x20;     v

ASP.NET Core Web API

&#x20;     |

&#x20;     v

Entity Framework Core

&#x20;     |

&#x20;     v

SQLite Database



The React frontend communicates with the ASP.NET Core backend through RESTful API calls. Entity Framework Core acts as the ORM layer between the C# application and SQLite database.



API Endpoints

Tasks

GET     /api/tasks

GET     /api/tasks/{id}

POST    /api/tasks

PUT     /api/tasks/{id}

DELETE  /api/tasks/{id}

Activity

GET     /api/activity

POST    /api/activity

Project Structure

Taskflow

│

├── Taskflow.api

│   ├── Controllers

│   ├── Data

│   ├── Migrations

│   ├── Models

│   ├── Properties

│   ├── Program.cs

│   ├── appsettings.json

│   └── Taskflow.api.csproj

│

├── taskflow-ui

│   ├── src

│   │   ├── components

│   │   ├── services

│   │   ├── App.jsx

│   │   └── App.css

│   ├── package.json

│   └── vite.config.js

│

├── screenshots

│   ├── dashboard.png

│   ├── activity.png

│   └── dark-mode.png

│

├── .gitignore

└── README.md

Getting Started

Prerequisites



Make sure the following are installed:



.NET SDK

Node.js

npm

Git

Run the Backend

cd Taskflow.api

dotnet restore

dotnet ef database update

dotnet run



The backend runs locally at:



http://localhost:5023

Run the Frontend



Open another terminal:



cd taskflow-ui

npm install

npm run dev



The frontend runs locally at:



http://localhost:5173

Key Concepts Demonstrated

Object-Oriented Programming with C#

ASP.NET Core Web API development

RESTful API design

CRUD operations

Dependency Injection

Entity Framework Core ORM

Database migrations

Relational database persistence

React component architecture

React hooks and state management

Async API communication

Search and filtering

Responsive UI development

Dark mode using local storage

Persistent activity tracking

CORS configuration

Error handling and user feedback

Example Task Flow



When a user creates a task:



The React frontend collects the form input.

React sends a POST request containing JSON to the ASP.NET Core API.

The API controller receives the request.

Entity Framework Core maps the C# object to the SQLite database.

The task is stored.

The API returns the created task as JSON.

React refreshes the task list and displays a success notification.

Why I Built This



I built TaskFlow as a hands-on project to strengthen my understanding of full-stack development using C#, ASP.NET Core, REST APIs, Entity Framework Core, relational databases, and React.js.



The project helped me understand how a modern frontend communicates with a backend API, how application data is persisted using an ORM, and how to structure a maintainable full-stack application.



Future Enhancements

User authentication and authorization

Task categories and tags

Drag-and-drop task management

Email reminders

Pagination

Cloud deployment

SQL Server support

Automated unit and integration testing

Author



Ibaad Ahmed Ajaz



GitHub: Ibaad-AhmedAjaz

LinkedIn: ibaadahmed077

