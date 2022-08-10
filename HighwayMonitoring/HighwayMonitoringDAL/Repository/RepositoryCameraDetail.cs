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

namespace HighwayMonitoring_DAL.Repository
{
    public class RepositoryCameraDetail : IRepository<CameraDetails>
    {
        ApplicationDbContext _dbContext;
        public RepositoryCameraDetail(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
           // var s = _dbContext.SqlQuery<VideoDetails>("select * from VideoDetails");
        }
        public async Task<CameraDetails> Create(CameraDetails _object)
        {
            var obj = await _dbContext.CameraDetails.AddAsync(_object);
            _dbContext.SaveChanges();
            return obj.Entity;
        }

        public void Delete(CameraDetails _object)
        {
            _dbContext.Remove(_object);
            _dbContext.SaveChanges();
        }

        public IEnumerable<CameraDetails> GetAll()
        {
            try
            {
               
                List<Microsoft.Data.SqlClient.SqlParameter> pc = new List<Microsoft.Data.SqlClient.SqlParameter>
{
   new Microsoft.Data.SqlClient.SqlParameter("@data", "b")

};

                string strSQL = "EXEC cameraVideoDetailsCRUD";
              //  var s = _dbContext.SqlQuery<List<object>>(strSQL, pc.ToArray());

                //using (var context =  _dbContext())
                //{
                //   var  myTypeList = _dbContext.LoadStoredProc("StoredProcedureName")
                //    .WithSqlParam("data", "b")
                //    .ExecureStoredProc<VideoDetails>();
                //}

                return _dbContext.CameraDetails.ToList();
            }
            catch (Exception ee)
            {
                throw;
            }
        }

        public CameraDetails GetById(int Id)
        {
            return _dbContext.CameraDetails.Where(x =>  x.CameraId == Id).FirstOrDefault();
        }

        public void Update(CameraDetails _object)
        {
            _dbContext.CameraDetails.Update(_object);
            _dbContext.SaveChanges();
        }
    }
}
