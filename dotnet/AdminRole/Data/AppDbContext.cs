using AdminRole.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminRole.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }  // name doesn't matter now
    }
}
