-- Fix Password Hashes in Database
-- This script updates all password hashes with proper BCrypt hashes
-- Default password for all users: Admin123!

USE MFDemoDb;
GO

-- Generate a proper BCrypt hash for "Admin123!"
-- You can generate this using: BCrypt.Net.BCrypt.HashPassword("Admin123!")
-- Example hash (replace with your generated hash):
-- $2a$11$KIXvJ8qJ8qJ8qJ8qJ8qJ8uJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8q

-- IMPORTANT: Replace the hash below with a real BCrypt hash!
-- You can generate one using the C# code in FixPasswords.cs
-- Or use an online BCrypt generator: https://bcrypt-generator.com/

DECLARE @NewPasswordHash NVARCHAR(MAX) = '$2a$11$KIXvJ8qJ8qJ8qJ8qJ8qJ8uJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8q';

-- Update Organization Users
UPDATE OrganizationUsers
SET PasswordHash = @NewPasswordHash
WHERE PasswordHash IS NULL 
   OR PasswordHash = '' 
   OR PasswordHash NOT LIKE '$2a$%'
   OR LEN(PasswordHash) < 50;

-- Update Branch Users  
UPDATE BranchUsers
SET PasswordHash = @NewPasswordHash
WHERE PasswordHash IS NULL 
   OR PasswordHash = '' 
   OR PasswordHash NOT LIKE '$2a$%'
   OR LEN(PasswordHash) < 50;

PRINT 'Password hashes updated!';
PRINT 'IMPORTANT: Replace @NewPasswordHash with a real BCrypt hash before running!';
GO

-- Verify
SELECT 
    'OrganizationUsers' AS TableName,
    Email,
    CASE 
        WHEN PasswordHash LIKE '$2a$%' AND LEN(PasswordHash) >= 50 THEN 'Valid BCrypt'
        ELSE 'Invalid - Needs Update'
    END AS HashStatus
FROM OrganizationUsers
UNION ALL
SELECT 
    'BranchUsers' AS TableName,
    Email,
    CASE 
        WHEN PasswordHash LIKE '$2a$%' AND LEN(PasswordHash) >= 50 THEN 'Valid BCrypt'
        ELSE 'Invalid - Needs Update'
    END AS HashStatus
FROM BranchUsers;
GO

