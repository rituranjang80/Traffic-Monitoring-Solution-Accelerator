using HighwayMonitoring_DAL.Interface;
using HighwayMonitoring_DAL.Modelss;
using HighwayMonitoring_DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HighwayMonitoring_BAL.Service
{
    public class CameraService
    {
        private readonly IRepository<CameraDetails> _cameraDetail;
       // private readonly IRepository<VideoDetails> _VideoDetail;

        public CameraService(IRepository<CameraDetails> cameraDetail)
        {
            _cameraDetail = cameraDetail;
           // _VideoDetail = VideoDetails;

        }
        //Get Person Details By Person Id
        public async Task <CameraDetails> create (CameraDetails cameraDetails)
        {
            try
            {
                cameraDetails.Created_Date = DateTime.Now;
                return await _cameraDetail.Create(cameraDetails);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public bool Update(CameraDetails cameraDetails)
        {
            try
            {
                cameraDetails.Updated_Date = DateTime.Now;
                  _cameraDetail.Update(cameraDetails);
                return true;
            }

            catch (Exception ex)
            {
                throw ex;
            }
          
        }
        public IEnumerable<CameraDetails> GetCameraByPlace()
        {
            try
            {

                return _cameraDetail.GetAll().Where(x => ( (string.IsNullOrEmpty(x.City)) &&( !string.IsNullOrEmpty(x.Place)))).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public IEnumerable<CameraDetails> GetCameraByCity(CameraDetails cameraDetails)
        {
            try
            {

                return  _cameraDetail.GetAll().Where(x =>  ((x.City == cameraDetails.City)  )).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public CameraDetails GetCameraByID(int cameraDetails)
        {
            try
            {

                return _cameraDetail.GetAll().Where(x => ((x.CameraId == cameraDetails))).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public IEnumerable<CameraDetails> GetAll_cameraDetail()
        {
            try
            {
       
                return _cameraDetail.GetAll().ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public IEnumerable<VideoDetails> GetCameraVideo(CameraDetails cameraDetails)
        {
            try
            {

                return null;// _VideoDetail.GetAll().Where(x=>x.CameraId==cameraDetails.CameraId.ToString()).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
    }
}