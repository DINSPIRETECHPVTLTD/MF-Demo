# Organization & Loan Management System

A cloud-based multi-tenant system for managing organizations, branches, centers, members, and guardians.

## Technology Stack

- **Backend**: ASP.NET Core Web API (C#)
- **Database**: SQL Server with Entity Framework Core
- **Web Frontend**: Angular
- **Mobile Frontend**: Ionic React

## Project Structure

```
MF-Demo/
├── Backend/              # ASP.NET Core Web API
│   ├── Models/          # Entity models
│   ├── Data/            # DbContext and migrations
│   ├── Controllers/     # API controllers
│   ├── Services/        # Business logic
│   └── Middleware/      # Authentication, authorization
├── WebApp/              # Angular web application
└── MobileApp/           # Ionic React mobile application
```

## Features

- Multi-tenant organization management
- Role-based access control (Owner, Organization User, Branch User, Staff)
- Soft delete for all entities
- Branch and center management
- Member and guardian management
- Web and mobile support

## Getting Started

### Backend Setup
1. Navigate to `Backend` directory
2. Update `appsettings.json` with your SQL Server connection string
3. Run migrations: `dotnet ef database update`
4. Run the API: `dotnet run`

### Web App Setup
1. Navigate to `WebApp` directory
2. Install dependencies: `npm install`
3. Run: `ng serve`

### Mobile App Setup
1. Navigate to `MobileApp` directory
2. Install dependencies: `npm install`
3. Run: `ionic serve`

## User Roles

- **Owner**: Full control at organization level
- **Organization User**: Limited admin access
- **Branch User**: Branch management and member operations
- **Staff**: Member creation only

