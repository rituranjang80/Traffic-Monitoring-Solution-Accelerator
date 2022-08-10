using Azure.Storage;
using Azure.Storage.Blobs.Models;
using HighwayMonitoring_BAL.Service;
using HighwayMonitoring_DAL.Data;
using HighwayMonitoring_DAL.Interface;
using HighwayMonitoring_DAL.Models;
using HighwayMonitoring_DAL.Modelss;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using HighwayMonitoring_DAL.Models.BussinessModels;
using System.Threading.Tasks;


namespace HighwayMonitoringWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class USCityController : ControllerBase
    {
        private readonly USCityervice _USCityervice;
        //MicrosoftTrafficMgmtContext microsoftTrafficMgmtContext;
        private readonly IRepository<USCity> _USCity;
        //private readonly ApplicationDbContext _applicationDbContext;
        private readonly IConfiguration _configuration;

        public USCityController(IRepository<USCity> USCity, USCityervice CameraService, IConfiguration configuration)
        {
            _USCityervice = CameraService;
            _USCity = USCity;
            _configuration = configuration; ;

        }


        //GET All Person
        [HttpGet("GetAllState")]
        public USState GetAllPersons()
        {
            try { 
            USState uSStateList = new USState();
            uSStateList.USStateList =  _USCityervice.GetAll_USCState();
           // var data = USStateList=_USCityervice.GetAll_USCState();
          
            return uSStateList;
        }
            catch (Exception ex)
            {
                throw ex;
            }
}

        //GET All Person
        [HttpPost("GetCity")]
        public Object GetCameraUSCity([FromBody]  string statename)
        {
            try { 
            var data = _USCityervice.GetAll_USCity(statename);
            return data;
        }
            catch (Exception ex)
            {
                throw ex;
            }
}

        //GET All Person
        [HttpPost("GetCityByID")]
        public Object GetCityByID([FromBody] string city)
        {
            try { 
            var data = _USCityervice.GetCityByID(city);
            return data;
        }
            catch (Exception ex)
            {
                throw ;
            }
}
    }
        

       
}