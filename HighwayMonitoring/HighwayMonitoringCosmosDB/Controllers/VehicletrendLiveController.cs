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
using System.Threading;
using System.Linq;

namespace HighwayMonitoringCosmosDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicletrendLiveController : ControllerBase
    {
        private readonly ICosmosDbServiceLive _cosmosDbService;
        ICosmosDbServiceLiveAccidennt _cosmosDbServiceLiveAccident;

        private readonly IConfiguration _configuration;
        #region Vechile Trends CRUD
        public VehicletrendLiveController(ICosmosDbServiceLive cosmosDbService, IConfiguration configuration, ICosmosDbServiceLiveAccidennt  cosmosDbServiceLiveAccidennt)
        {
            _cosmosDbService = cosmosDbService ?? throw new ArgumentNullException(nameof(cosmosDbService));
            _configuration = configuration;
            _cosmosDbServiceLiveAccident= cosmosDbServiceLiveAccidennt ?? throw new ArgumentNullException(nameof(cosmosDbServiceLiveAccidennt));
        }


        
        [HttpPost("GetBycameraId")]
        public async Task<IActionResult> GetBycameraId(LiveStramFilter liveStramFilter)
        {
            try
            {
                LiveChartData liveChartData = new LiveChartData();

                if (liveStramFilter.currenttimestamp == 0)
                {
                    liveStramFilter.currenttimestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds() - 100;
                    VehicleTrendingLive vehicleTrendingLive = new VehicleTrendingLive();
                    vehicleTrendingLive.current_time = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                    List<VehicleTrendingLive> vehicleTrendingLive_ = new List<VehicleTrendingLive>();
                    vehicleTrendingLive_.Add(vehicleTrendingLive);
                    liveChartData.VehicleTrendingLive = vehicleTrendingLive_.ToArray();
                    List<VehicleAccidentLive> vehicleAccidentLives = new List<VehicleAccidentLive>();
                    VehicleAccidentLive vehicleAccidentLive = new VehicleAccidentLive();
                    vehicleAccidentLive.current_timestamp = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                    vehicleAccidentLives.Add(vehicleAccidentLive);
                    liveChartData.trafficAccidentLive = vehicleAccidentLives.ToArray();

                }
                else {
                    string query = "SELECT * FROM VehicleTrendingLive v ";
                    //liveStramFilter.cameraId = 1;
                    query = "SELECT * FROM VehicleTrendingLive v where v.camera_Id = " + liveStramFilter.cameraId + " and v.current_time > " + liveStramFilter.currenttimestamp;
                    var result = await _cosmosDbService.GetMultipleAsync(query);
                    liveChartData.VehicleTrendingLive = result.Cast<VehicleTrendingLive>().ToArray();
                    query = "SELECT * FROM VehicleAccidentLive v ";
                    query = "SELECT * FROM VehicleAccidentLive v where v.tAcamera_id = " + liveStramFilter.cameraId + " and v.current_timestamp > " + liveStramFilter.currenttimestamp;
                    var r = await _cosmosDbServiceLiveAccident.GetMultipleAsync(query);
                    liveChartData.trafficAccidentLive= r.Cast<VehicleAccidentLive>().ToArray();
                }
                return Ok(liveChartData);
            }
            catch (Exception ex)
            {
                throw ;
            }
        }

    }
    #endregion
}

