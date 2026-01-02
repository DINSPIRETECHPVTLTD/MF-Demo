-- =============================================
-- Update Password Hashes Script
-- Run this AFTER generating proper BCrypt hashes
-- =============================================

USE MFDemoDb;
GO

-- =============================================
-- IMPORTANT: Replace the hash below with a real BCrypt hash
-- Generate using: BCrypt.Net.BCrypt.HashPassword("Admin123!")
-- Or use the GeneratePasswordHash.cs helper
-- =============================================

DECLARE @NewPasswordHash NVARCHAR(MAX) = 'REPLACE_WITH_ACTUAL_BCRYPT_HASH';
DECLARE @OldPasswordHash NVARCHAR(MAX) = '$2a$11$KIXvJ8qJ8qJ8qJ8qJ8qJ8uJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8q';

-- Update Organization Users
UPDATE OrganizationUsers
SET PasswordHash = @NewPasswordHash
WHERE PasswordHash = @OldPasswordHash OR PasswordHash LIKE '$2a$11$KIX%';

-- Update Branch Users
UPDATE BranchUsers
SET PasswordHash = @NewPasswordHash
WHERE PasswordHash = @OldPasswordHash OR PasswordHash LIKE '$2a$11$KIX%';

PRINT 'Password hashes updated successfully!';
PRINT 'Make sure to replace @NewPasswordHash with actual BCrypt hash before running!';
GO

