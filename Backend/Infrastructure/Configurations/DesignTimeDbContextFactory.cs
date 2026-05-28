using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Configurations
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            // Build configuration from appsettings.json
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../WebApi"))
                .AddJsonFile("appsettings.json", optional: false)
                .AddJsonFile("appsettings.Development.json", optional: true)
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            var dbProvider = configuration.GetValue<string>("DatabaseProvider") ?? "sqlserver";
            var connectionString = configuration.GetConnectionString("default");

            switch (dbProvider.ToLower())
            {
                case "postgres":
                case "postgresql":
                    optionsBuilder.UseNpgsql(connectionString, x => x.MigrationsAssembly("Infrastructure"));
                    break;
                case "sqlserver":
                default:
                    optionsBuilder.UseSqlServer(connectionString, x => x.MigrationsAssembly("Infrastructure"));
                    break;
            }

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
