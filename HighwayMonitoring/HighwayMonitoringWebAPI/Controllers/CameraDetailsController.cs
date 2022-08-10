using HighwayMonitoring_BAL.Service;
using HighwayMonitoring_DAL.Interface;
using HighwayMonitoring_DAL.Modelss;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighwayMonitoringWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class  CameraController : ControllerBase
    {
        private readonly CameraService _cameraService;

        private readonly IRepository<CameraDetails> _CameraDetails;

        public  CameraController(IRepository<CameraDetails> CameraDetails, CameraService CameraService)
        {
            _cameraService = CameraService;
            _CameraDetails = CameraDetails;

        }

        [HttpPost("GetCameraByID")]
        public CameraDetails GetCameraByID(CameraDetails cameraDetails)
        {
            try { 
            var data = _cameraService.GetCameraByID(cameraDetails.CameraId);
          
            return data;
        }

            catch (Exception ex)
            {
                throw ;
            }
}



        //GET All Person
        [HttpPost("GetAllCameraDetails")]
        public IEnumerable<CameraDetails> GetAllCameraDetails(dynamic d)
        {
            try { 
            var data = _cameraService.GetAll_cameraDetail();
            return data;
        }

            catch (Exception ex)
            {
                throw ;
            }
}

        [HttpGet("GetAllCameraDetails2")]
        public IEnumerable<CameraDetails> GetAllCameraDetails2()
        {
            try { 
            var data = _cameraService.GetAll_cameraDetail();               
            return data;
        }

            catch (Exception ex)
            {
                throw ;
            }
}
/// <summary>
/// Camera Create API
/// </summary>
/// <param name="cameraDetails"></param>
/// <returns></returns>

        [HttpPost("create")]
        public async Task<CameraDetails> create(CameraDetails cameraDetails)
        {
            try
            {
                var data = await _cameraService.create(cameraDetails);
           
            return data;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }
/// <summary>
/// Camera Update API
/// </summary>
/// <param name="cameraDetails"></param>
/// <returns></returns>
        [HttpPost("update")]
        public bool update(CameraDetails cameraDetails)
        {
            try
            {         
                    var data2 = _cameraService.Update(cameraDetails);
                    return data2;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("GetCameraByPlace")]
        public IEnumerable<CameraDetails> GetCameraByCity()
        {
            try { 
            var data =  _cameraService.GetCameraByPlace();
            return data;
        }

            catch (Exception ex)
            {
                throw ex;
            }

}


        [HttpPost("GetCameraByCity")]
        public IEnumerable<CameraDetails> GetCameraByCity(CameraDetails cameraDetails)
        {
            try { 
            var data = _cameraService.GetCameraByCity(cameraDetails);
            return data;
        }

            catch (Exception ex)
            {
                throw ;
            }
}
       
    }
}