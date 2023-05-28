using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BitirmeAPI.Model;

namespace BitirmeAPI.Data
{
    public class BitirmeAPIContext : DbContext,IDataContext
    {
        public BitirmeAPIContext (DbContextOptions<BitirmeAPIContext> options)
            : base(options)
        {
        }

        public DbSet<BitirmeAPI.Model.Parent> Parent { get; init; } 
        public DbSet<BitirmeAPI.Model.Student> Student { get; init; }    
        public DbSet<BitirmeAPI.Model.Comment> Comment { get; init; }
        public DbSet<BitirmeAPI.Model.Teache> Teache { get; init; }
        public DbSet<BitirmeAPI.Model.Teacher> Teacher { get; set; }
        public DbSet<BitirmeAPI.Model.Lesson> Lesson { get; set; }
        public DbSet<BitirmeAPI.Model.DersProgrami> DersProgrami { get; init; }
        public DbSet<BitirmeAPI.Model.SchoolLeader> SchoolLeader { get; init; }
        public DbSet<BitirmeAPI.Model.Note> Note { get; set; }
        public DbSet<BitirmeAPI.Model.Semester> Semester { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().ToTable("Student");
        }
        
    }
}
