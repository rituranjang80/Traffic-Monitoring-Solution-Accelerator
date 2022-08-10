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
    public class RepositoryUSCity : IRepository<USCity>
    {
        ApplicationDbContext _dbContext;
        public RepositoryUSCity(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
           // var s = _dbContext.SqlQuery<VideoDetails>("select * from VideoDetails");
        }
        public async Task<USCity> Create(USCity _object)
        {
            var obj = await _dbContext.USCity.AddAsync(_object);
            _dbContext.SaveChanges();
            return obj.Entity;
        }

        public void Delete(USCity _object)
        {
            _dbContext.Remove(_object);
            _dbContext.SaveChanges();
        }

        public IEnumerable<USCity> GetAll()
        {
            try
            {
               
             
                return _dbContext.USCity.ToList();
            }
            catch (Exception ee)
            {
                throw;
            }
        }

        public USCity GetById(int Id)
        {
            return _dbContext.USCity.Where(x =>  x.ID == Id).FirstOrDefault();
        }

        public void Update(USCity _object)
        {
            _dbContext.USCity.Update(_object);
            _dbContext.SaveChanges();
        }
    }
}
