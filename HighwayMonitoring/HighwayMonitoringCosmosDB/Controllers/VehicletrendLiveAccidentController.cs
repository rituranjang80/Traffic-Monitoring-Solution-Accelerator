using HighwayMonitoringCosmosDB.Models;
using HighwayMonitoringCosmosDB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using UtilityLibrary;
using System.Diagnostics;

namespace HighwayMonitoringCosmosDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicletrendLiveAccidentController : ControllerBase
    {
        private readonly ICosmosDbServiceLiveAccidennt _cosmosDbService;

        private readonly IConfiguration _configuration;

        
        #region Vechile Trends CRUD
        public VehicletrendLiveAccidentController(ICosmosDbServiceLiveAccidennt cosmosDbService, IConfiguration configuration)
        {
            _cosmosDbService = cosmosDbService ?? throw new ArgumentNullException(nameof(cosmosDbService));
            _configuration = configuration; ;
        }


        
        [HttpPost("GetBycameraId")]
        public async Task<IActionResult> GetBycameraId(LiveStramFilter liveStramFilter)        {
            try
            {
                if (liveStramFilter.currenttimestamp == 0) { 
                    liveStramFilter.currenttimestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();// GetTimestamp(DateTime.Now) -100;
                }
                string query = "SELECT * FROM VehicleAccidentLive v ";                
              //  query = "SELECT * FROM VehicleAccidentLive v where v.tAcamera_id = " + liveStramFilter.cameraId + " and v.current_timestamp > " + liveStramFilter.currenttimestamp;               
                var result = await _cosmosDbService.GetMultipleAsync(query);               
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ;
            }
        }

    }
    #endregion
}

