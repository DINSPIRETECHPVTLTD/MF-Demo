# Stop Backend Process Script
# Run this if you get file lock errors when trying to build/run

Write-Host "Stopping Backend processes..." -ForegroundColor Yellow

# Stop by process name
$backendProcesses = Get-Process -Name "Backend" -ErrorAction SilentlyContinue
if ($backendProcesses) {
    $backendProcesses | Stop-Process -Force
    Write-Host "Stopped Backend processes" -ForegroundColor Green
} else {
    Write-Host "No Backend processes found" -ForegroundColor Gray
}

# Stop dotnet processes related to this project
$dotnetProcesses = Get-Process -Name "dotnet" -ErrorAction SilentlyContinue | 
    Where-Object { $_.Path -like "*MF-Demo*Backend*" }
if ($dotnetProcesses) {
    $dotnetProcesses | Stop-Process -Force
    Write-Host "Stopped related dotnet processes" -ForegroundColor Green
}

# Wait a moment for file handles to release
Start-Sleep -Seconds 2

Write-Host "Done! You can now run 'dotnet run' again." -ForegroundColor Green

