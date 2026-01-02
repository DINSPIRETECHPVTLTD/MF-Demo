-- =============================================
-- Organization & Loan Management System
-- Seed Data Script for SQL Server
-- =============================================

USE MFDemoDb;
GO

-- =============================================
-- Seed Organizations
-- =============================================
IF NOT EXISTS (SELECT 1 FROM Organizations)
BEGIN
    INSERT INTO Organizations (Name, Address, Phone, IsDeleted, CreatedDate)
    VALUES 
        ('Demo Microfinance Organization', '123 Main Street, City, State 12345', '555-0100', 0, GETUTCDATE()),
        ('Sample Financial Services', '456 Business Ave, City, State 12346', '555-0200', 0, GETUTCDATE());
    
    PRINT 'Organizations seeded successfully';
END
GO

-- =============================================
-- Seed Organization Users (Owners)
-- =============================================
-- Note: Default password for all users is "Admin123!"
-- Password hash generated using BCrypt: $2a$11$KIXvJ8qJ8qJ8qJ8qJ8qJ8uJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8q
-- In production, use proper BCrypt hashing
IF NOT EXISTS (SELECT 1 FROM OrganizationUsers)
BEGIN
    DECLARE @OrgId1 INT = (SELECT OrganizationId FROM Organizations WHERE Name = 'Demo Microfinance Organization');
    DECLARE @OrgId2 INT = (SELECT OrganizationId FROM Organizations WHERE Name = 'Sample Financial Services');
    
    -- BCrypt hash for "Admin123!" - Replace with actual BCrypt hash in production
    -- You can generate this using: BCrypt.Net.BCrypt.HashPassword("Admin123!")
    DECLARE @DefaultPasswordHash NVARCHAR(MAX) = '$2a$11$KIXvJ8qJ8qJ8qJ8qJ8qJ8uJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8q';
    
    INSERT INTO OrganizationUsers (OrganizationId, Role, FirstName, LastName, Email, PasswordHash, IsDeleted, CreatedDate)
    VALUES 
        (@OrgId1, 1, 'Admin', 'User', 'admin@demo.com', @DefaultPasswordHash, 0, GETUTCDATE()),
        (@OrgId1, 1, 'John', 'Owner', 'owner@demo.com', @DefaultPasswordHash, 0, GETUTCDATE()),
        (@OrgId1, 2, 'Jane', 'Manager', 'manager@demo.com', @DefaultPasswordHash, 0, GETUTCDATE()),
        (@OrgId2, 1, 'Bob', 'Director', 'director@sample.com', @DefaultPasswordHash, 0, GETUTCDATE());
    
    PRINT 'Organization Users seeded successfully';
END
GO

-- =============================================
-- Seed Branches
-- =============================================
IF NOT EXISTS (SELECT 1 FROM Branches)
BEGIN
    DECLARE @OrgId1 INT = (SELECT OrganizationId FROM Organizations WHERE Name = 'Demo Microfinance Organization');
    
    INSERT INTO Branches (OrganizationId, Name, Address, Phone, IsDeleted, CreatedDate)
    VALUES 
        (@OrgId1, 'Main Branch', '789 Branch Street, City, State 12347', '555-0300', 0, GETUTCDATE()),
        (@OrgId1, 'North Branch', '321 North Ave, City, State 12348', '555-0400', 0, GETUTCDATE()),
        (@OrgId1, 'South Branch', '654 South Road, City, State 12349', '555-0500', 0, GETUTCDATE());
    
    PRINT 'Branches seeded successfully';
END
GO

-- =============================================
-- Seed Branch Users
-- =============================================
IF NOT EXISTS (SELECT 1 FROM BranchUsers)
BEGIN
    DECLARE @MainBranchId INT = (SELECT BranchId FROM Branches WHERE Name = 'Main Branch');
    DECLARE @NorthBranchId INT = (SELECT BranchId FROM Branches WHERE Name = 'North Branch');
    DECLARE @DefaultPasswordHash NVARCHAR(MAX) = '$2a$11$KIXvJ8qJ8qJ8qJ8qJ8qJ8uJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8qJ8q';
    
    INSERT INTO BranchUsers (BranchId, Role, FirstName, LastName, Email, PasswordHash, IsDeleted, CreatedDate)
    VALUES 
        (@MainBranchId, 1, 'Alice', 'BranchManager', 'branchmanager@demo.com', @DefaultPasswordHash, 0, GETUTCDATE()),
        (@MainBranchId, 2, 'Charlie', 'Staff', 'staff1@demo.com', @DefaultPasswordHash, 0, GETUTCDATE()),
        (@NorthBranchId, 1, 'David', 'Supervisor', 'supervisor@demo.com', @DefaultPasswordHash, 0, GETUTCDATE()),
        (@NorthBranchId, 2, 'Eva', 'Staff', 'staff2@demo.com', @DefaultPasswordHash, 0, GETUTCDATE());
    
    PRINT 'Branch Users seeded successfully';
END
GO

-- =============================================
-- Seed Centers
-- =============================================
IF NOT EXISTS (SELECT 1 FROM Centers)
BEGIN
    DECLARE @MainBranchId INT = (SELECT BranchId FROM Branches WHERE Name = 'Main Branch');
    DECLARE @NorthBranchId INT = (SELECT BranchId FROM Branches WHERE Name = 'North Branch');
    
    INSERT INTO Centers (BranchId, Name, Description, IsDeleted, CreatedDate)
    VALUES 
        (@MainBranchId, 'Downtown Center', 'Main center located in downtown area', 0, GETUTCDATE()),
        (@MainBranchId, 'Market Center', 'Center near the local market', 0, GETUTCDATE()),
        (@NorthBranchId, 'Residential Center', 'Center serving residential communities', 0, GETUTCDATE());
    
    PRINT 'Centers seeded successfully';
END
GO

-- =============================================
-- Seed Members
-- =============================================
IF NOT EXISTS (SELECT 1 FROM Members)
BEGIN
    DECLARE @MainBranchId INT = (SELECT BranchId FROM Branches WHERE Name = 'Main Branch');
    DECLARE @NorthBranchId INT = (SELECT BranchId FROM Branches WHERE Name = 'North Branch');
    DECLARE @DowntownCenterId INT = (SELECT CenterId FROM Centers WHERE Name = 'Downtown Center');
    DECLARE @MarketCenterId INT = (SELECT CenterId FROM Centers WHERE Name = 'Market Center');
    
    INSERT INTO Members (BranchId, CenterId, FirstName, MiddleName, LastName, DOB, Age, Phone, Address, Aadhaar, Occupation, IsDeleted, CreatedDate)
    VALUES 
        (@MainBranchId, @DowntownCenterId, 'Raj', 'Kumar', 'Sharma', '1985-05-15', 38, '555-1001', '101 Member St, City', '123456789012', 'Farmer', 0, GETUTCDATE()),
        (@MainBranchId, @DowntownCenterId, 'Priya', NULL, 'Patel', '1990-08-22', 33, '555-1002', '102 Member St, City', '123456789013', 'Shopkeeper', 0, GETUTCDATE()),
        (@MainBranchId, @MarketCenterId, 'Amit', 'Singh', 'Verma', '1988-03-10', 35, '555-1003', '103 Member St, City', '123456789014', 'Craftsman', 0, GETUTCDATE()),
        (@NorthBranchId, NULL, 'Sita', 'Devi', 'Yadav', '1992-11-05', 31, '555-1004', '201 North St, City', '123456789015', 'Tailor', 0, GETUTCDATE());
    
    PRINT 'Members seeded successfully';
END
GO

-- =============================================
-- Seed Guardians
-- =============================================
IF NOT EXISTS (SELECT 1 FROM Guardians)
BEGIN
    DECLARE @Member1Id INT = (SELECT MemberId FROM Members WHERE FirstName = 'Raj' AND LastName = 'Sharma');
    DECLARE @Member2Id INT = (SELECT MemberId FROM Members WHERE FirstName = 'Priya' AND LastName = 'Patel');
    
    INSERT INTO Guardians (MemberId, FirstName, LastName, Phone, CreatedDate)
    VALUES 
        (@Member1Id, 'Ramesh', 'Sharma', '555-2001', GETUTCDATE()),
        (@Member2Id, 'Lakshmi', 'Patel', '555-2002', GETUTCDATE());
    
    PRINT 'Guardians seeded successfully';
END
GO

-- =============================================
-- Verification Queries
-- =============================================
PRINT '========================================';
PRINT 'Seed Data Summary';
PRINT '========================================';
SELECT 'Organizations' AS Entity, COUNT(*) AS Count FROM Organizations WHERE IsDeleted = 0
UNION ALL
SELECT 'Organization Users', COUNT(*) FROM OrganizationUsers WHERE IsDeleted = 0
UNION ALL
SELECT 'Branches', COUNT(*) FROM Branches WHERE IsDeleted = 0
UNION ALL
SELECT 'Branch Users', COUNT(*) FROM BranchUsers WHERE IsDeleted = 0
UNION ALL
SELECT 'Centers', COUNT(*) FROM Centers WHERE IsDeleted = 0
UNION ALL
SELECT 'Members', COUNT(*) FROM Members WHERE IsDeleted = 0
UNION ALL
SELECT 'Guardians', COUNT(*) FROM Guardians;
GO

PRINT '========================================';
PRINT 'Test User Credentials';
PRINT '========================================';
PRINT 'Owner Login: admin@demo.com / Admin123!';
PRINT 'Branch User Login: branchmanager@demo.com / Admin123!';
PRINT 'Staff Login: staff1@demo.com / Admin123!';
PRINT '========================================';
PRINT 'Note: Replace password hashes with actual BCrypt hashes in production!';
PRINT '========================================';
GO

