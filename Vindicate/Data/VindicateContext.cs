using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vindicate.Models;

namespace Vindicate.Models
{
    public class VindicateContext : DbContext
    {
        public VindicateContext (DbContextOptions<VindicateContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>().HasMany(s => s.Milestones).WithOne(s => s.Project);
            modelBuilder.Entity<Milestone>().HasMany(s => s.Deeds).WithOne(s => s.Milestone);
        }

        public DbSet<Vindicate.Models.Project> Project { get; set; }

        public DbSet<Vindicate.Models.Milestone> Milestone { get; set; }

        public DbSet<Vindicate.Models.Deed> Deed { get; set; }

        public DbSet<Vindicate.Models.User> User { get; set; }

        public DbSet<Vindicate.Models.Role> Role { get; set; }

        public DbSet<Vindicate.Models.Status> Status { get; set; }

        public DbSet<Vindicate.Models.UserRole> UserRole { get; set; }

        public DbSet<Vindicate.Models.Priority> Priority { get; set; }
    }
}
