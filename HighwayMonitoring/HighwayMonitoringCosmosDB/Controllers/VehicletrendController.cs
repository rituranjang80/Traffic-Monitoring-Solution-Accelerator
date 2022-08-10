using HighwayMonitoringCosmosDB.Models;
using HighwayMonitoringCosmosDB.Services;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using UtilityLibrary;

namespace HighwayMonitoringCosmosDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicletrendController : ControllerBase
    {
        private readonly ICosmosDbService _cosmosDbService;

        private readonly IConfiguration _configuration;

        private readonly IServer server;
        private readonly IHostApplicationLifetime hostApplicationLifetime;

        #region Vechile Trends CRUD
        //public VehicletrendController(ICosmosDbService cosmosDbService, IConfiguration configuration)
        //{
        //    _cosmosDbService = cosmosDbService ?? throw new ArgumentNullException(nameof(cosmosDbService));
        //    _configuration = configuration; ;
        //}

        public VehicletrendController(ICosmosDbService cosmosDbService, IConfiguration configuration, IServer server, IHostApplicationLifetime hostApplicationLifetime)
        {
            _cosmosDbService = cosmosDbService ?? throw new ArgumentNullException(nameof(cosmosDbService));
            _configuration = configuration;
            this.server = server;
            this.hostApplicationLifetime = hostApplicationLifetime;

        }

        private string GetAddresses()
        {
            var addresses = (server.Features.Get<IServerAddressesFeature>().Addresses) ;
            //string URI= addresses[0].ToString();
            //return addresses[0].ToString();
            string URL= string.Join(",", addresses);
            if (URL.Contains(","))
            {
                var Result = URL.Split(",");
                return Result[0];
            }
            return URL;
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

                return Ok(await _cosmosDbService.GetMultipleAsync("SELECT* FROM VehicleTrending v where v.VideoID=" + VideoID));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //        [HttpGet("{id}")]
        //        public async Task<IActionResult> Get(string id)
        //        {
        //            try { 
        //            return Ok(await _cosmosDbService.GetAsync(id));
        //        }
        //            catch (Exception ex)
        //            {
        //                throw ex;
        //            }
        //}


        [HttpPost]
        public async Task<string> Create([FromBody] List<Vehicletrend> item)
        {
            UtilityHttpRequest classHttpRequest = new UtilityHttpRequest();

            try
            {
                ;

                if (item.Count > 0)
                {

                    var content = new FormUrlEncodedContent(new[]
                    {
                    new KeyValuePair<string, string>("VideoId", item[0].VideoID.ToString())
                });
                   // string BaseURL = GetAddresses()+ "/api/Video/UpdateProcessVideo";//
                    string BaseURL =_configuration.GetValue<string>("BaseURL") + "Video/UpdateProcessVideo";
                    await classHttpRequest.PostAPI(BaseURL, content, item[0].VideoID);
                    classHttpRequest.WritetoFile(null, "Vechile Json recived" + item[0].VideoID.ToString());
                }
                for (int i = 0; i < item.Count; i++)
                {
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


        [HttpPut("{id}")]
        public async Task<IActionResult> Edit([FromBody] Vehicletrend item)
        {
            try
            {
                await _cosmosDbService.UpdateAsync(item.Id, item);
                return NoContent();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpDelete("{id}")]
        public async Task<string> Delete(int VideoID)
        {
            try
            {

                var data = await _cosmosDbService.GetMultipleAsync("SELECT* FROM VehicleTrending v where v.VideoID=" + VideoID);
                foreach (Vehicletrend d in data)
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

        //[HttpDelete("{VideoID}")]
        //public async Task<IActionResult> Delete(int VideoID)
        //{
        //    try
        //    {

        //        var configurationSection = _configuration.GetSection("CosmosDb");
        //        var databaseName = configurationSection["DatabaseName"];
        //        var containerName = configurationSection["ContainerName"];
        //        var account = configurationSection["Account"];
        //        var key = configurationSection["Key"];
        //        CosmosDBDeleteByQuery cosmosDBDeleteByQuery = new CosmosDBDeleteByQuery();
        //        cosmosDBDeleteByQuery.DeleteByQuerry()
        //        return Ok(await _cosmosDbService.GetMultipleAsync("delete FROM VehicleTrending v where v.VideoID=" + VideoID));
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


    }
    #endregion
}

