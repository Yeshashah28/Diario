using Journal_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Journal_backend.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<JournalEntries> JournalData { get; set; }

    }
}
