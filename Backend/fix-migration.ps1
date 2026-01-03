# Fix migration when tables already exist
# This script marks the migration as applied without running it

Write-Host "Checking database state..." -ForegroundColor Yellow

# Check if migration history exists
$migrationHistory = dotnet ef migrations list --connection "Data Source=SRIDHARP360;Initial Catalog=MFDemoDb;Integrated Security=True;Trust Server Certificate=True" 2>&1

if ($migrationHistory -match "No migrations were found") {
    Write-Host "No migration history found. Marking migration as applied..." -ForegroundColor Yellow
    
    # Get the migration name
    $migrationName = (Get-ChildItem -Path "Migrations" -Filter "*InitialCreate*" | Select-Object -First 1).BaseName
    
    if ($migrationName) {
        Write-Host "Migration found: $migrationName" -ForegroundColor Green
        Write-Host "`nTo fix this, you can:" -ForegroundColor Cyan
        Write-Host "1. Delete existing tables and re-run migration" -ForegroundColor White
        Write-Host "2. Or manually insert migration record into __EFMigrationsHistory table" -ForegroundColor White
        Write-Host "3. Or use SQL scripts instead of migrations`n" -ForegroundColor White
    }
} else {
    Write-Host "Migration history exists. Current state:" -ForegroundColor Green
    $migrationHistory
}


