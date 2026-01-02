# Setup Instructions

## Prerequisites

- .NET 8.0 SDK
- Node.js 18+ and npm
- SQL Server (LocalDB or full instance)
- Visual Studio 2022 or VS Code (optional)

## Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Update the connection string in `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MFDemoDb;Trusted_Connection=True;MultipleActiveResultSets=true"
   }
   ```

3. Install Entity Framework tools (if not already installed):
   ```bash
   dotnet tool install --global dotnet-ef --version 8.0.0
   ```
   
   **If you encounter installation errors:**
   - Clear NuGet cache: `dotnet nuget locals all --clear`
   - Try installing with specific version: `dotnet tool install --global dotnet-ef --version 8.0.0`
   - Or use the SQL scripts in `Backend/Database/` folder instead of migrations

4. Create the database migration:
   ```bash
   dotnet ef migrations add InitialCreate
   ```

5. Apply the migration to create the database:
   ```bash
   dotnet ef database update
   ```

6. Run the API:
   ```bash
   dotnet run
   ```

   **Note:** If you get a "file is locked" error, stop any running instances:
   ```powershell
   # Quick fix - run the helper script
   .\Backend\stop-backend.ps1
   
   # Or manually
   Get-Process -Name "Backend" -ErrorAction SilentlyContinue | Stop-Process -Force
   ```

   The API will be available at:
   - HTTP: http://localhost:5000
   - HTTPS: https://localhost:7000
   - Swagger UI: https://localhost:7000/swagger

## Web Application Setup (Angular)

1. Navigate to the WebApp directory:
   ```bash
   cd WebApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the API URL in `src/app/services/auth.service.ts` and `src/app/services/api.service.ts` if needed (default: `https://localhost:7000/api`)

4. Run the development server:
   ```bash
   npm start
   ```

   The application will be available at http://localhost:4200

## Mobile Application Setup (Ionic React)

1. Navigate to the MobileApp directory:
   ```bash
   cd MobileApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the API URL in `src/services/authService.ts` and `src/services/apiService.ts` if needed (default: `https://localhost:7000/api`)

4. Run the development server:
   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:8100

## Creating Initial Users

After setting up the database, you'll need to create initial users. You can do this through:

1. **Swagger UI**: Use the API endpoints at https://localhost:7000/swagger
2. **Direct SQL**: Insert users directly into the database
3. **Seed Data Script**: Create a seed script (recommended for development)

### Example SQL to create an Owner user:

```sql
-- First create an organization
INSERT INTO Organizations (Name, Address, Phone, IsDeleted, CreatedDate)
VALUES ('Demo Organization', '123 Main St', '123-456-7890', 0, GETUTCDATE());

-- Then create an owner user (replace with your email and hashed password)
-- Password: 'Admin123!' (use BCrypt to hash)
INSERT INTO OrganizationUsers (OrganizationId, Role, FirstName, LastName, Email, PasswordHash, IsDeleted, CreatedDate)
VALUES (1, 1, 'Admin', 'User', 'admin@example.com', '$2a$11$YourHashedPasswordHere', 0, GETUTCDATE());
```

**Note**: Use BCrypt to hash passwords. You can use online tools or the API to create users.

## Testing the Application

1. Start the Backend API
2. Start the Web Application or Mobile Application
3. Login with your created user credentials
4. Navigate through the different sections based on your role

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the Backend `Program.cs` has CORS configured correctly and the frontend URLs are allowed.

### Database Connection Issues
- Verify SQL Server is running
- Check the connection string in `appsettings.json`
- Ensure the database exists or migrations have been run

### Port Conflicts
- Backend: Change ports in `Properties/launchSettings.json`
- WebApp: Change port in `angular.json`
- MobileApp: Change port in `vite.config.ts`

