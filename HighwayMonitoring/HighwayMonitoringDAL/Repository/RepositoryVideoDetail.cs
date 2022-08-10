using HighwayMonitoring_DAL.Data;
using HighwayMonitoring_DAL.Interface;
using HighwayMonitoring_DAL.Models;
using HighwayMonitoring_DAL.Modelss;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HighwayMonitoring_DAL.Repository
{
    public class RepositoryVideoDetail : IRepository<VideoDetails>
    {
        ApplicationDbContext _dbContext;
        public RepositoryVideoDetail(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }

        public async Task<CameraDetails> Create(CameraDetails _object)
        {
            var obj = await _dbContext.CameraDetails.AddAsync(_object);
            _dbContext.SaveChanges();
            return obj.Entity;

        }

        public async Task<VideoDetails> Create(VideoDetails _object)
        {
            var obj = await _dbContext.VideoDetail.AddAsync(_object);
            _dbContext.SaveChanges();
            return obj.Entity;
        }

        //public void Delete(CameraDetails _object)
        //{
        //    _dbContext.Remove(_object);
        //    _dbContext.SaveChanges();
        //}

        //public void Delete(VideoDetails _object)
        //{
        //    throw new NotImplementedException();
        //}

        public IEnumerable<VideoDetails> GetAll()
        {
            try
            {
            //    var s = _dbContext.SqlQuery<VideoDetails>("select * from VideoDetails");
                return _dbContext.VideoDetail.ToList();
            }
            catch (Exception ee)
            {
                throw;
            }
        }

        public CameraDetails GetById(int Id)
        {
            var param = new SqlParameter("@IdParam", SqlDbType.VarChar, 10);
            param.Value = Id.ToString();

            string sqlQuery = "Exec [dbo].[usp_get_custom_type] @IdParam";
          //  var s=_dbContext.SqlQuery<VideoDetails>("select * from VideoDetails");
            
            //_dbContext.SqlQueryAsync(sqlQuery);
            return _dbContext.CameraDetails.Where(x => x.CameraId == Id).FirstOrDefault();
        }

        public void Update(CameraDetails _object)
        {
            _dbContext.CameraDetails.Update(_object);
            _dbContext.SaveChanges();
        }
        public void Delete(VideoDetails _object)
        {
            _dbContext.Remove(_object);
            _dbContext.SaveChanges();
        }

        public void Update(VideoDetails _object)
        {
            _dbContext.VideoDetail.Update(_object);
            _dbContext.SaveChanges();
        }

        IEnumerable<VideoDetails> IRepository<VideoDetails>.GetAll()
        {
            return  _dbContext.VideoDetail.ToList();
        }

        VideoDetails IRepository<VideoDetails>.GetById(int Id)
        {
            throw new NotImplementedException();
        }
    }
}
