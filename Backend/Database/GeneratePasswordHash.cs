// =============================================
// Password Hash Generator
// Run this to generate BCrypt hashes for seed data
// =============================================

using System;
using BCrypt.Net;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Password Hash Generator");
        Console.WriteLine("======================");
        Console.WriteLine();
        
        // Default password for seed data
        string password = "Admin123!";
        
        if (args.Length > 0)
        {
            password = args[0];
        }
        
        string hash = BCrypt.Net.BCrypt.HashPassword(password);
        
        Console.WriteLine($"Password: {password}");
        Console.WriteLine($"BCrypt Hash: {hash}");
        Console.WriteLine();
        Console.WriteLine("Use this hash in SeedData.sql");
        Console.WriteLine();
        Console.WriteLine("Example SQL:");
        Console.WriteLine($"DECLARE @DefaultPasswordHash NVARCHAR(MAX) = '{hash}';");
    }
}

// To compile and run:
// dotnet run --project GeneratePasswordHash.cs
// Or add to a console project and run

