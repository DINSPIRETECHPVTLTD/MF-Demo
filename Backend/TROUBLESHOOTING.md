# Troubleshooting Guide

## Entity Framework Tools Installation Issues

### Problem: "Settings file 'DotnetToolSettings.xml' was not found in the package"

**Solution:**
1. Clear NuGet cache:
   ```powershell
   dotnet nuget locals all --clear
   ```

2. Install with specific version:
   ```powershell
   dotnet tool install --global dotnet-ef --version 8.0.0
   ```

3. Verify installation:
   ```powershell
   dotnet ef --version
   ```

### Alternative: Use SQL Scripts Instead

If you continue to have issues with EF migrations, you can use the SQL scripts directly:

1. Run `Backend/Database/Schema.sql` to create the database schema
2. Run `Backend/Database/SeedData.sql` to populate test data

This bypasses the need for EF migrations entirely.

## Database Connection Issues

### Problem: Cannot connect to SQL Server

**Solutions:**
1. **Check SQL Server is running:**
   ```powershell
   Get-Service -Name "MSSQLSERVER" | Select-Object Status, Name
   ```

2. **For LocalDB, start it:**
   ```powershell
   sqllocaldb start mssqllocaldb
   ```

3. **Verify connection string in `appsettings.json`:**
   - LocalDB: `Server=(localdb)\\mssqllocaldb;Database=MFDemoDb;Trusted_Connection=True;`
   - SQL Server: `Server=localhost;Database=MFDemoDb;User Id=sa;Password=YourPassword;`

4. **Test connection:**
   ```powershell
   sqlcmd -S (localdb)\mssqllocaldb -Q "SELECT @@VERSION"
   ```

## Migration Issues

### Problem: "No migrations found"

**Solution:**
1. Navigate to Backend directory:
   ```powershell
   cd Backend
   ```

2. Create initial migration:
   ```powershell
   dotnet ef migrations add InitialCreate
   ```

3. Apply migration:
   ```powershell
   dotnet ef database update
   ```

### Problem: "Migration already exists"

**Solution:**
1. Remove the migration:
   ```powershell
   dotnet ef migrations remove
   ```

2. Recreate it:
   ```powershell
   dotnet ef migrations add InitialCreate
   ```

## Build Errors

### Problem: "Package restore failed"

**Solution:**
```powershell
cd Backend
dotnet restore
dotnet build
```

### Problem: "BCrypt.Net-Next not found"

**Solution:**
```powershell
cd Backend
dotnet add package BCrypt.Net-Next --version 4.0.3
dotnet restore
```

## File Lock Errors

### Problem: "The process cannot access the file 'Backend.exe' because it is being used by another process"

This happens when the application is already running and you try to build/run it again.

**Solution:**
1. **Stop the running process:**
   ```powershell
   # Option 1: Find and kill by name
   Get-Process -Name "Backend" -ErrorAction SilentlyContinue | Stop-Process -Force
   
   # Option 2: Kill all dotnet processes (be careful!)
   Get-Process -Name "dotnet" -ErrorAction SilentlyContinue | Where-Object {$_.Path -like "*MF-Demo*"} | Stop-Process -Force
   
   # Option 3: Use taskkill
   taskkill /F /IM Backend.exe /T
   ```

2. **Wait a moment, then try again:**
   ```powershell
   dotnet build
   dotnet run
   ```

3. **Alternative: Use different ports** if you need multiple instances running

## Runtime Errors

### Problem: "JWT Key not configured"

**Solution:**
Ensure `appsettings.json` has:
```json
{
  "Jwt": {
    "Key": "YourSuperSecretKeyThatIsAtLeast32CharactersLong!",
    "Issuer": "MF-Demo",
    "Audience": "MF-Demo"
  }
}
```

### Problem: CORS errors in browser

**Solution:**
1. Check `Program.cs` has CORS configured
2. Verify frontend URL matches allowed origins
3. For development, the current setup allows all origins

## Port Conflicts

### Problem: Port 5000 or 7000 already in use

**Solution:**
1. Change ports in `Properties/launchSettings.json`:
   ```json
   {
     "applicationUrl": "http://localhost:5001;https://localhost:7001"
   }
   ```

2. Update frontend API URLs accordingly

## Still Having Issues?

1. Check .NET SDK version:
   ```powershell
   dotnet --version
   ```
   Should be 8.0 or higher

2. Verify all packages are restored:
   ```powershell
   cd Backend
   dotnet restore
   dotnet build
   ```

3. Check SQL Server version compatibility
4. Review error logs in detail
5. Use SQL scripts as fallback option

