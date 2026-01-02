-- Quick script to create database if it doesn't exist
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'MFDemoDb')
BEGIN
    CREATE DATABASE MFDemoDb;
    PRINT 'Database MFDemoDb created successfully!';
END
ELSE
BEGIN
    PRINT 'Database MFDemoDb already exists.';
END
GO

USE MFDemoDb;
GO

