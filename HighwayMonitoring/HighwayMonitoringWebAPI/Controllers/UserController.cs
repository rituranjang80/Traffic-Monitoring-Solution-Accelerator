using HighwayMonitoring_BAL.Service;
using HighwayMonitoring_DAL.Data;
using HighwayMonitoring_DAL.Interface;
using HighwayMonitoring_DAL.Models;
using HighwayMonitoring_DAL.Models.BussinessModels;
using HighwayMonitoring_DAL.Modelss;
using Microsoft.AspNetCore.Cors;
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
 
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        //MicrosoftTrafficMgmtContext microsoftTrafficMgmtContext;
        private readonly IRepository<USERS> _UserDetails;
        private readonly ApplicationDbContext _applicationDbContext ;

        public UserController(IRepository<USERS> User , UserService userService)
        {
            _userService = userService;
            _UserDetails = User;

        }




        //GET All Person
        [HttpPost("GetUserDataByEmail")]
        public UserGroup GetUserDataByEmail(USERS uSERS )
        {
            try { 
                    
            var data = _userService.GetByEmail(uSERS.Email_Id, null);
            var json = JsonConvert.SerializeObject(data, Formatting.Indented,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                }
            );
            var s = JsonConvert.DeserializeObject<UserGroup>(json);
            return s;
        }

            catch (Exception ex)
            {
                throw ;
            }
}



       
    }
}