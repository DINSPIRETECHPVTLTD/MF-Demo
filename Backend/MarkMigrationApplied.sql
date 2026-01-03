-- Mark the InitialCreate migration as applied
-- Run this in SQL Server Management Studio connected to MFDemoDb database

USE MFDemoDb;
GO

-- Check if migration history table exists, create if not
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = '__EFMigrationsHistory')
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
    PRINT 'Created __EFMigrationsHistory table';
END
GO

-- Insert the migration record if it doesn't exist
IF NOT EXISTS (SELECT 1 FROM [__EFMigrationsHistory] WHERE [MigrationId] = '20260102042118_InitialCreate')
BEGIN
    INSERT INTO [__EFMigrationsHistory] (MigrationId, ProductVersion)
    VALUES ('20260102042118_InitialCreate', '8.0.0');
    PRINT 'Migration marked as applied successfully!';
END
ELSE
BEGIN
    PRINT 'Migration already marked as applied.';
END
GO

-- Verify
SELECT * FROM [__EFMigrationsHistory];
GO


