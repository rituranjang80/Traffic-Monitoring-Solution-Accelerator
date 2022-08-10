using HighwayMonitoring_DAL.Data;
using HighwayMonitoring_DAL.Interface;
using HighwayMonitoring_DAL.Models;
using HighwayMonitoring_DAL.Modelss;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace HighwayMonitoring_DAL.Repository
{
    public class CustomType
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public static class DbContextExtensions
    {
        public static IList<T> SqlQuery<T>(this DbContext context, string sql, params object[] parameters) where T : class
        {
            using (var dbcontext = new ContextForQueryType<T>(context.Database.GetDbConnection()))
            {
                return dbcontext.Set<T>().FromSqlRaw(sql, parameters).AsNoTracking().ToList();
            }
        }

        public static async Task<IList<T>> SqlQueryAsync<T>(this DbContext context, string sql, params object[] parameters) where T : class
        {
            using (var dbcontext = new ContextForQueryType<T>(context.Database.GetDbConnection()))
            {
                return await dbcontext.Set<T>().FromSqlRaw(sql, parameters).AsNoTracking().ToListAsync();
            }
        }

        private class ContextForQueryType<T> : DbContext where T : class
        {
            private readonly System.Data.Common.DbConnection connection;

            public ContextForQueryType(System.Data.Common.DbConnection connection)
            {
                this.connection = connection;
            }

            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.UseSqlServer(connection, options => options.EnableRetryOnFailure());

                base.OnConfiguring(optionsBuilder);
            }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                modelBuilder.Ignore<Property>();  //property needed to be excluded

                modelBuilder.Entity<T>().HasNoKey();
                base.OnModelCreating(modelBuilder);
            }
        }


        public static DbCommand LoadStoredProc(  this DbContext context, string storedProcName)
        {
            var cmd = context.Database.GetDbConnection().CreateCommand();
            cmd.CommandText = storedProcName;
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            return cmd;
        }

        public static DbCommand WithSqlParam(
  this DbCommand cmd, string paramName, object paramValue)
        {
            if (string.IsNullOrEmpty(cmd.CommandText))
                throw new InvalidOperationException(
                  "Call LoadStoredProc before using this method");
            var param = cmd.CreateParameter();
            param.ParameterName = paramName;
            param.Value = paramValue;
            cmd.Parameters.Add(param);
            return cmd;
        }
        private static List<T> MapToList<T>(this DbDataReader dr)
        {
            var objList = new List<T>();
            var props = typeof(T).GetRuntimeProperties();

            var colMapping = dr.GetColumnSchema()
              .Where(x => props.Any(y => y.Name.ToLower() == x.ColumnName.ToLower()))
              .ToDictionary(key => key.ColumnName.ToLower());

            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    T obj = Activator.CreateInstance<T>();
                    foreach (var prop in props)
                    {
                        var val =
                          dr.GetValue(colMapping[prop.Name.ToLower()].ColumnOrdinal.Value);
                        prop.SetValue(obj, val == DBNull.Value ? null : val);
                    }
                    objList.Add(obj);
                }
            }
            return objList;
        }

        public static async Task<List<T>> ExecuteStoredProc<T>(this DbCommand command)
        {
            using (command)
            {
                if (command.Connection.State == System.Data.ConnectionState.Closed)
                    command.Connection.Open();
                try
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        return reader.MapToList<T>();
                    }
                }
                catch (Exception e)
                {
                    throw (e);
                }
                finally
                {
                    command.Connection.Close();
                }
            }
        }
    }
}
