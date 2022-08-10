using System;
using HighwayMonitoring_DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace HighwayMonitoring_DAL.Model
{
    public partial class MicrosoftTrafficMgmtContext : DbContext
    {
        public MicrosoftTrafficMgmtContext()
        {
        }

        public MicrosoftTrafficMgmtContext(DbContextOptions<MicrosoftTrafficMgmtContext> options)
            : base(options)
        {
        }

      //  public virtual DbSet<CameraDetail> CameraDetails { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<GroupAuthorization> GroupAuthorizations { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<Person> People { get; set; }
        public virtual DbSet<Person1> Persons { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserClient> UserClients { get; set; }
        public virtual DbSet<VideoDetails> VideoDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=MicrosoftTrafficMgmt;Persist Security Info=False;User ID=sa6;Password=P@ssword_12;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");


            modelBuilder.Entity<Group>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("GROUPS");

                entity.Property(e => e.GroupId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("GROUP_ID");

                entity.Property(e => e.GroupName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("GROUP_NAME");
            });

            modelBuilder.Entity<GroupAuthorization>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("GROUP_AUTHORIZATION");

                entity.Property(e => e.AccessRight).HasColumnName("ACCESS_RIGHT");

                entity.Property(e => e.AddRight).HasColumnName("ADD_RIGHT");

                entity.Property(e => e.DeleteRight).HasColumnName("DELETE_RIGHT");

                entity.Property(e => e.EditRight).HasColumnName("EDIT_RIGHT");

                entity.Property(e => e.GroupId).HasColumnName("GROUP_ID");

                entity.Property(e => e.MenuId).HasColumnName("MENU_ID");
            });

            modelBuilder.Entity<Menu>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("MENU");

                entity.Property(e => e.IsBase).HasColumnName("IS_BASE");

                entity.Property(e => e.IsChild).HasColumnName("IS_CHILD");

                entity.Property(e => e.IsFunction).HasColumnName("IS_FUNCTION");

                entity.Property(e => e.IsParent).HasColumnName("IS_PARENT");

                entity.Property(e => e.MenuId).HasColumnName("MENU_ID");

                entity.Property(e => e.MenuIndex).HasColumnName("MENU_INDEX");

                entity.Property(e => e.MenuText)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("MENU_TEXT");

                entity.Property(e => e.MenuUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MENU_URL");

                entity.Property(e => e.ParentId).HasColumnName("PARENT_ID");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.ToTable("Person");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedOn)
                    .IsRequired()
                    .HasMaxLength(24)
                    .IsUnicode(false)
                    .HasColumnName("createdOn");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .HasColumnName("isDeleted");

                entity.Property(e => e.UserEmail)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("userEmail");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("userName");

                entity.Property(e => e.UserPassword)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("userPassword");
            });

            modelBuilder.Entity<Person1>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedOn)
                    .IsRequired()
                    .HasMaxLength(24)
                    .IsUnicode(false)
                    .HasColumnName("createdOn");

                entity.Property(e => e.IsDeleted)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .HasColumnName("isDeleted");

                entity.Property(e => e.UserEmail)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("userEmail");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("userName");

                entity.Property(e => e.UserPassword)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false)
                    .HasColumnName("userPassword");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("USERS");

                entity.Property(e => e.EmailId)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("EMAIL_ID");

                entity.Property(e => e.GroupId).HasColumnName("GROUP_ID");

                entity.Property(e => e.IsActive).HasColumnName("IS_ACTIVE");

                entity.Property(e => e.IsInternal).HasColumnName("IS_INTERNAL");

                entity.Property(e => e.MobileNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("MOBILE_NUMBER");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("PHONE_NUMBER");

                entity.Property(e => e.UserAddress)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("USER_ADDRESS");

                entity.Property(e => e.UserDepartment)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("USER_DEPARTMENT");

                entity.Property(e => e.UserDesignation)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("USER_DESIGNATION");

                entity.Property(e => e.UserId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("USER_ID");

                entity.Property(e => e.UserName)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("USER_NAME");

                entity.Property(e => e.UserOrganization)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("USER_ORGANIZATION");
            });

            modelBuilder.Entity<UserClient>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("USER_CLIENT");

                entity.Property(e => e.InvestorId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("INVESTOR_ID");

                entity.Property(e => e.PbiUrl)
                    .IsUnicode(false)
                    .HasColumnName("PBI_URL");

                entity.Property(e => e.UserId).HasColumnName("USER_ID");
            });

            modelBuilder.Entity<VideoDetails>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CameraId)
                    .IsRequired()
                    .HasMaxLength(400)
                    .HasColumnName("CameraID");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("date")
                    .HasColumnName("Created_date");

                entity.Property(e => e.Remark)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");

                entity.Property(e => e.UpdatedDate)
                    .HasColumnType("date")
                    .HasColumnName("updated_date");

                entity.Property(e => e.VideoId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("VideoID");

                entity.Property(e => e.VideoPath).IsRequired();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
