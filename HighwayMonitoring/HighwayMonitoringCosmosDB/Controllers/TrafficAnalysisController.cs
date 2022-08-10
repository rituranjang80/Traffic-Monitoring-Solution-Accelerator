using HighwayMonitoringCosmosDB.Models;
using HighwayMonitoringCosmosDB.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using UtilityLibrary;

namespace HighwayMonitoringCosmosDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrafficAnalysisController : ControllerBase
    {
        #region TrafficAnalysis
        private readonly ICosmosDbServiceAccident _cosmosDbService;

        public TrafficAnalysisController(ICosmosDbServiceAccident cosmosDbService)
        {
            _cosmosDbService = cosmosDbService ?? throw new ArgumentNullException(nameof(cosmosDbService));

        }


       
        [HttpGet]
        public async Task<IActionResult> List()
        {
            try
            {
                return Ok(await _cosmosDbService.GetMultipleAsync("SELECT * FROM c"));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        [HttpGet("{VideoID}")]
        public async Task<IActionResult> GetByVideoID(int VideoID)
        {
            try
            {

                return Ok(await _cosmosDbService.GetMultipleAsyncAccient("SELECT * FROM VehicleMonitering v where v.tAvideo_Id=" + VideoID));
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //[HttpGet("{id}")]
        //public async Task<IActionResult> Get(string camera_Id)
        //{
        //    try
        //    {
        //        return Ok(await _cosmosDbService.GetAsync(camera_Id));
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


        [HttpPost]
        public async Task<string> Create([FromBody] List<TrafficAnalysis> item)
        {
            UtilityHttpRequest classHttpRequest = new UtilityHttpRequest();

            try
            {

                for (int i = 0; i < item.Count; i++)
                {
                    if (i == 0)
                    {
                        classHttpRequest.WritetoFile(null, "Vechile Json recived" + item[0].TAcamera_Id.ToString());
                    }
                    item[i].Id = Guid.NewGuid().ToString();
                    await _cosmosDbService.AddAsync(item[i]);
                }
                return "success";
            }

            catch (Exception ex)
            {
                throw;
            }
        }


        [HttpPut("{camera_Id}")]
        public async Task<IActionResult> Edit([FromBody] TrafficAnalysis item)
        {
            try
            {
                await _cosmosDbService.UpdateAsync(item.Id, item);
                return NoContent();
            }

            catch (Exception ex)
            {
                throw;
            }
        }


        //[HttpDelete("{camera_Id}")]
        //public async Task<IActionResult> Delete(string camera_Id)
        //{
        //    try
        //    {
        //        await _cosmosDbService.DeleteAsync(camera_Id);
        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //}

        [HttpDelete("{id}")]
        public async Task<string> Delete(int VideoID)
        {
            try
            {

                var data = await _cosmosDbService.GetMultipleAsync("SELECT * FROM VehicleMonitering v where v.tAvideo_Id=" + VideoID);
                foreach (TrafficAnalysis d in data)
                {
                    await _cosmosDbService.DeleteAsync(d.Id);
                }
                return "success";
            }
            catch (Exception ex)
            {
                throw;
            }
        }


    }
    #endregion
}

