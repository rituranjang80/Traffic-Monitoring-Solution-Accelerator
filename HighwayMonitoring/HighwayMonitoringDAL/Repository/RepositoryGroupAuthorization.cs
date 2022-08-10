using HighwayMonitoring_DAL.Data;
using HighwayMonitoring_DAL.Interface;

using HighwayMonitoring_DAL.Modelss;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using HighwayMonitoring_DAL.Models;

namespace HighwayMonitoring_DAL.Repository
{
    public class RepositoryGroupAuthorization : IRepository<GROUP_AUTHORIZATION>
    {
        ApplicationDbContext _dbContext;
        public RepositoryGroupAuthorization(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
           // var s = _dbContext.SqlQuery<VideoDetails>("select * from VideoDetails");
        }
        public async Task<GROUP_AUTHORIZATION> Create(GROUP_AUTHORIZATION _object)
        {
            var obj = await _dbContext.GroupAuthorization.AddAsync(_object);
            _dbContext.SaveChanges();
            return obj.Entity;
        }

        public void Delete(GROUP_AUTHORIZATION _object)
        {
            _dbContext.Remove(_object);
            _dbContext.SaveChanges();
        }

        public IEnumerable<GROUP_AUTHORIZATION> GetAll()
        {
            try
            {
               
             
                return _dbContext.GroupAuthorization.ToList();
            }
            catch (Exception ee)
            {
                throw;
            }
        }

        public GROUP_AUTHORIZATION GetById(int Id)
        {
            return _dbContext.GroupAuthorization.Where(x =>  x.Group_Id == Id).FirstOrDefault();
        }

        public void Update(GROUP_AUTHORIZATION _object)
        {
            _dbContext.GroupAuthorization.Update(_object);
            _dbContext.SaveChanges();
        }
    }
}
