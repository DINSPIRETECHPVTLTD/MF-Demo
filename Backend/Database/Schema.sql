-- =============================================
-- Organization & Loan Management System
-- Database Schema Script for SQL Server
-- =============================================

USE master;
GO

-- Create database if it doesn't exist
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'MFDemoDb')
BEGIN
    CREATE DATABASE MFDemoDb;
END
GO

USE MFDemoDb;
GO

-- =============================================
-- Drop existing tables (if any) in correct order
-- =============================================
IF OBJECT_ID('Guardians', 'U') IS NOT NULL DROP TABLE Guardians;
IF OBJECT_ID('Members', 'U') IS NOT NULL DROP TABLE Members;
IF OBJECT_ID('Centers', 'U') IS NOT NULL DROP TABLE Centers;
IF OBJECT_ID('BranchUsers', 'U') IS NOT NULL DROP TABLE BranchUsers;
IF OBJECT_ID('Branches', 'U') IS NOT NULL DROP TABLE Branches;
IF OBJECT_ID('OrganizationUsers', 'U') IS NOT NULL DROP TABLE OrganizationUsers;
IF OBJECT_ID('Organizations', 'U') IS NOT NULL DROP TABLE Organizations;
GO

-- =============================================
-- Create Tables
-- =============================================

-- Organizations Table
CREATE TABLE Organizations (
    OrganizationId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Address NVARCHAR(500) NULL,
    Phone NVARCHAR(20) NULL,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

-- Organization Users Table
CREATE TABLE OrganizationUsers (
    OrgUserId INT IDENTITY(1,1) PRIMARY KEY,
    OrganizationId INT NOT NULL,
    Role INT NOT NULL, -- 1 = Owner, 2 = OrgUser
    FirstName NVARCHAR(100) NOT NULL,
    MiddleName NVARCHAR(100) NULL,
    LastName NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NULL,
    Address NVARCHAR(500) NULL,
    Email NVARCHAR(100) NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_OrganizationUsers_Organizations 
        FOREIGN KEY (OrganizationId) REFERENCES Organizations(OrganizationId)
);
GO

-- Branches Table
CREATE TABLE Branches (
    BranchId INT IDENTITY(1,1) PRIMARY KEY,
    OrganizationId INT NOT NULL,
    Name NVARCHAR(200) NOT NULL,
    Address NVARCHAR(500) NULL,
    Phone NVARCHAR(20) NULL,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Branches_Organizations 
        FOREIGN KEY (OrganizationId) REFERENCES Organizations(OrganizationId)
);
GO

-- Branch Users Table
CREATE TABLE BranchUsers (
    BranchUserId INT IDENTITY(1,1) PRIMARY KEY,
    BranchId INT NOT NULL,
    Role INT NOT NULL, -- 1 = BranchUser, 2 = Staff
    FirstName NVARCHAR(100) NOT NULL,
    MiddleName NVARCHAR(100) NULL,
    LastName NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NULL,
    Address NVARCHAR(500) NULL,
    Email NVARCHAR(100) NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_BranchUsers_Branches 
        FOREIGN KEY (BranchId) REFERENCES Branches(BranchId)
);
GO

-- Centers Table
CREATE TABLE Centers (
    CenterId INT IDENTITY(1,1) PRIMARY KEY,
    BranchId INT NOT NULL,
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(1000) NULL,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Centers_Branches 
        FOREIGN KEY (BranchId) REFERENCES Branches(BranchId)
);
GO

-- Members Table
CREATE TABLE Members (
    MemberId INT IDENTITY(1,1) PRIMARY KEY,
    BranchId INT NOT NULL,
    CenterId INT NULL,
    FirstName NVARCHAR(100) NOT NULL,
    MiddleName NVARCHAR(100) NULL,
    LastName NVARCHAR(100) NOT NULL,
    DOB DATE NULL,
    Age INT NULL,
    Phone NVARCHAR(20) NULL,
    Address NVARCHAR(500) NULL,
    Aadhaar NVARCHAR(12) NULL,
    Occupation NVARCHAR(100) NULL,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Members_Branches 
        FOREIGN KEY (BranchId) REFERENCES Branches(BranchId),
    CONSTRAINT FK_Members_Centers 
        FOREIGN KEY (CenterId) REFERENCES Centers(CenterId)
);
GO

-- Guardians Table
CREATE TABLE Guardians (
    GuardianId INT IDENTITY(1,1) PRIMARY KEY,
    MemberId INT NOT NULL,
    FirstName NVARCHAR(100) NOT NULL,
    MiddleName NVARCHAR(100) NULL,
    LastName NVARCHAR(100) NOT NULL,
    DOB DATE NULL,
    Age INT NULL,
    Phone NVARCHAR(20) NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Guardians_Members 
        FOREIGN KEY (MemberId) REFERENCES Members(MemberId) ON DELETE CASCADE
);
GO

-- =============================================
-- Create Indexes
-- =============================================

-- Unique index on OrganizationUsers.Email
CREATE UNIQUE NONCLUSTERED INDEX IX_OrganizationUsers_Email 
    ON OrganizationUsers(Email) 
    WHERE IsDeleted = 0;
GO

-- Unique index on BranchUsers.Email
CREATE UNIQUE NONCLUSTERED INDEX IX_BranchUsers_Email 
    ON BranchUsers(Email) 
    WHERE IsDeleted = 0;
GO

-- Index on OrganizationUsers.OrganizationId
CREATE NONCLUSTERED INDEX IX_OrganizationUsers_OrganizationId 
    ON OrganizationUsers(OrganizationId);
GO

-- Index on Branches.OrganizationId
CREATE NONCLUSTERED INDEX IX_Branches_OrganizationId 
    ON Branches(OrganizationId);
GO

-- Index on BranchUsers.BranchId
CREATE NONCLUSTERED INDEX IX_BranchUsers_BranchId 
    ON BranchUsers(BranchId);
GO

-- Index on Centers.BranchId
CREATE NONCLUSTERED INDEX IX_Centers_BranchId 
    ON Centers(BranchId);
GO

-- Index on Members.BranchId
CREATE NONCLUSTERED INDEX IX_Members_BranchId 
    ON Members(BranchId);
GO

-- Index on Members.CenterId
CREATE NONCLUSTERED INDEX IX_Members_CenterId 
    ON Members(CenterId);
GO

-- Index on Guardians.MemberId
CREATE NONCLUSTERED INDEX IX_Guardians_MemberId 
    ON Guardians(MemberId);
GO

PRINT 'Database schema created successfully!';
GO

