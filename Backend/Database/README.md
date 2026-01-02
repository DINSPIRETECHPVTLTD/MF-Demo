# Database Scripts

This folder contains SQL Server scripts for setting up the database.

## Files

### Schema.sql
Creates the complete database schema including:
- All tables with proper relationships
- Foreign key constraints
- Indexes for performance
- Default values and constraints

**Usage:**
```sql
-- Run this script in SQL Server Management Studio or via sqlcmd
sqlcmd -S localhost -d master -i Schema.sql
```

### SeedData.sql
Populates the database with initial test data:
- 2 Organizations
- 4 Organization Users (2 Owners, 1 OrgUser)
- 3 Branches
- 4 Branch Users (2 BranchUsers, 2 Staff)
- 3 Centers
- 4 Members
- 2 Guardians

**Usage:**
```sql
-- Run after Schema.sql
sqlcmd -S localhost -d MFDemoDb -i SeedData.sql
```

## Important Notes

### Password Hashes
⚠️ **IMPORTANT**: The seed data script includes placeholder password hashes. In production:

1. Generate proper BCrypt hashes using:
   ```csharp
   BCrypt.Net.BCrypt.HashPassword("YourPassword")
   ```

2. Or use the API to create users (which will hash passwords automatically)

3. Default test password in seed data: `Admin123!`
   - Replace the `@DefaultPasswordHash` variable with actual BCrypt hash

### Test Credentials
After running the seed script, you can login with:
- **Owner**: `admin@demo.com` / `Admin123!`
- **Branch User**: `branchmanager@demo.com` / `Admin123!`
- **Staff**: `staff1@demo.com` / `Admin123!`

⚠️ **Change these passwords immediately in production!**

## Alternative: Using Entity Framework Migrations

Instead of running SQL scripts, you can use Entity Framework migrations:

```bash
cd Backend
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Then run the SeedData.sql script to populate test data.

## Database Connection

Update the connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=MFDemoDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

For SQL Server Express LocalDB:
```
Server=(localdb)\\mssqllocaldb;Database=MFDemoDb;Trusted_Connection=True;MultipleActiveResultSets=true
```

For SQL Server:
```
Server=localhost;Database=MFDemoDb;User Id=sa;Password=YourPassword;TrustServerCertificate=True;
```

