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
    public class RepositoryUser : IRepository<USERS>
    {
        ApplicationDbContext _dbContext;
        public RepositoryUser(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
           // var s = _dbContext.SqlQuery<VideoDetails>("select * from VideoDetails");
        }
        public async Task<USERS> Create(USERS _object)
        {
            var obj = await _dbContext.User.AddAsync(_object);
            _dbContext.SaveChanges();
            return obj.Entity;
        }

        public void Delete(USERS _object)
        {
            _dbContext.Remove(_object);
            _dbContext.SaveChanges();
        }

        public IEnumerable<USERS> GetAll()
        {
            try
            {
               
              
                return _dbContext.User.ToList();
            }
            catch (Exception ee)
            {
                throw;
            }
        }

        public USERS GetById(int Id)
        {
            return _dbContext.User.Where(x =>  x.User_Id == Id).FirstOrDefault();
        }

        public USERS GetByEmailId(string EmailID)
        {
            return _dbContext.User.Where(x => x.Email_Id == EmailID).FirstOrDefault();
        }

        public void Update(USERS _object)
        {
            _dbContext.User.Update(_object);
            _dbContext.SaveChanges();
        }
    }
}
