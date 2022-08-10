using HighwayMonitoring_DAL.Models;
using HighwayMonitoring_DAL.Modelss;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Threading.Tasks;

namespace HighwayMonitoring_DAL.Data
{
    public  class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Ignore<Property>();  //property needed to be excluded
            base.OnModelCreating(builder);
        }
      

        public DbSet<Person> Persons { get; set; }
        public DbSet<CameraDetails> CameraDetails { get; set; }
        public DbSet<VideoDetails> VideoDetail { get; set; }


        public DbSet<USERS> User { get; set; }
        public DbSet<GROUP_AUTHORIZATION> GroupAuthorization { get; set; }

        public DbSet<USCity> USCity { get; set; }



        public virtual DbQuery<VideoDetails> VideoDetailQuery { get; set; }



    }
}
