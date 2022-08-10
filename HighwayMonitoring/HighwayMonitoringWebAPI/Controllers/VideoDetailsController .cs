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
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using RestSharp.Authenticators;
using RestSharp.Extensions;
using System.Net.Http;
using UtilityLibrary;
using HighwayMonitoringCosmosDB.Controllers;
using HighwayMonitoringCosmosDB.Services;
using System.Text.RegularExpressions;
using System.Globalization;
using Microsoft.AspNetCore.Hosting;
using System.Text;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.Extensions.Hosting;

namespace HighwayMonitoringWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly VideoService _cameraService;
        private readonly IRepository<VideoDetails> _VideoDetails;
        // private readonly ApplicationDbContext _applicationDbContext;
        private readonly IConfiguration _configuration;
        UtilityHttpRequest classHttpRequest = new UtilityHttpRequest();
        private readonly ICosmosDbService _cosmosDbService;
        private readonly Microsoft.AspNetCore.Hosting.IHostingEnvironment _hostingEnvironment;
        private readonly ICosmosDbServiceAccident _cosmosDbServiceAccident;
        private readonly IServer server;
        private readonly IHostApplicationLifetime hostApplicationLifetime;

        public VideoController(IRepository<VideoDetails> VideoDetails, VideoService CameraService, IConfiguration configuration, ICosmosDbService cosmosDbService, Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment, ICosmosDbServiceAccident cosmosDbServiceAccident)
        {
            _cameraService = CameraService;
            _VideoDetails = VideoDetails;
            _configuration = configuration;
            _cosmosDbService = cosmosDbService;
            _hostingEnvironment = hostingEnvironment;
            _cosmosDbServiceAccident = cosmosDbServiceAccident;
            this.server = server;
            this.hostApplicationLifetime = hostApplicationLifetime;

        }



        [HttpPost("GetAllCameraDetails")]
        public Object GetAllPersons(CameraDetails cameraDetails)
        {
            try {
                var data = _cameraService.GetCameraVideo(cameraDetails);
                var json = JsonConvert.SerializeObject(data, Formatting.Indented,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                    }
                );
                return json;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("GetVideoContent")]
        public async Task<IActionResult> GetVideoContent(string fileName)
        {
            string path = Path.Combine(_hostingEnvironment.WebRootPath, "Video/") + fileName;
            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite, 65536, FileOptions.Asynchronous | FileOptions.SequentialScan))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "application/octet-stream", Path.GetFileName(path), true); //enableRangeProcessing = true
        }
    

    [HttpPost("GetCameraVideo")]
        public Object GetCameraVideo(VideoDetails VideoDetails)
        {
            try {
                var data = _cameraService.GetvideoByCameraID(VideoDetails);
                var json = JsonConvert.SerializeObject(data, Formatting.Indented,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                    }
                );
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost("GetAllVideo")]
        public Object GetAllVideo(VideoDetails VideoDetails)
        {
            try {
                var data = _cameraService.GetAllVideo(VideoDetails);
                var json = JsonConvert.SerializeObject(data, Formatting.Indented,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                    }
                );
                return data;
            }
            catch (Exception ex)
            {
                throw ;
            }
        }



        [HttpPost("GetVideoByID")]
        public Object GetVideoByID([FromBody] int id)
        {
            try {
                var data = _cameraService.GetVideoByID(id);
                var json = JsonConvert.SerializeObject(data, Formatting.Indented,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                    }
                );
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpPost("GetVideoBySearch")]
        public Object GetVideoBySearch(VideoDetails VideoDetails)
        {

            try {

                var data = _cameraService.GetVideoBySearch(VideoDetails.Remark);
                var json = JsonConvert.SerializeObject(data, Formatting.Indented,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                    }
                );
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        [HttpPost("deleteVideoByid")]
        public async Task<Object> DeleteVideoByid(VideoDetails VideoDetails)
        {
            try {
                var data = _cameraService.DeleteVideoByid(VideoDetails);
                await DeleteFileBlobAPI(VideoDetails);
                var json = JsonConvert.SerializeObject(data, Formatting.Indented,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                    }
                );
                return data;
            }
            catch (Exception ex)
            {
                throw ;
            }
        }

        [HttpPost("AIanalysis")]
        public async Task<Object> AIanalysis(VideoDetails VideoDetails)
        {
            string blobstorageconnection = (_configuration.GetValue<string>("BlobConnectionString"));
            string BlobContainerName = _configuration.GetValue<string>("BlobContainerNameprocessvideo");
            string fileName = Path.GetFileNameWithoutExtension(VideoDetails.VideoPath) + ".webm";
            try
            {
                VideoDetails.Analyse = 2;
                _cameraService.update(VideoDetails);
                var result = await PostAFile(null, VideoDetails.VideoPath);
                // var data = "success";
                return result;
            }
            catch (Exception ex)
            {
                classHttpRequest.WritetoFile(ex,null);
                //  UpdateProcessVideo(fileName);
                throw;
            }
        }

        [HttpPost("DeleteFileBlobAPI")]
        public async Task<Object> DeleteFileBlobAPI(VideoDetails VideoDetails)
        {
            try
            {
                string blobstorageconnection = (_configuration.GetValue<string>("BlobConnectionString"));
                string BlobContainerName = _configuration.GetValue<string>("BlobContainerNameprocessvideo");
                VehicletrendController vehicletrendController = new VehicletrendController(_cosmosDbService, _configuration,server,hostApplicationLifetime);

                if (await DeleteFile(VideoDetails.VideoId + ".webm", blobstorageconnection, BlobContainerName))
                {
                    BlobContainerName = _configuration.GetValue<string>("BlobContainerNameUnProcessvideo");
                    if (await DeleteFile(VideoDetails.VideoPath, blobstorageconnection, BlobContainerName))
                    {
                        var result2 = _cameraService.DeleteVideoByid(VideoDetails);
                    }
                }
                var r = await vehicletrendController.Delete(VideoDetails.VideoId);
                TrafficAnalysisController trafficAnalysisController = new TrafficAnalysisController(_cosmosDbServiceAccident);
                var result = await trafficAnalysisController.Delete(VideoDetails.VideoId);




                return true;
            }
            catch (Exception ex)
            {
                return ex;
            }


        }
        #region





        async Task<bool> PostAFile(IFormFile file, string fileName)
        {
            string blobstorageconnection = _configuration.GetValue<string>("BlobConnectionString");
            CloudBlockBlob blockBlob;
            byte[] data;
            await using (MemoryStream memoryStream = new MemoryStream())
            {

                CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(blobstorageconnection);
                CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(_configuration.GetValue<string>("BlobContainerNameUnProcessvideo"));
                blockBlob = cloudBlobContainer.GetBlockBlobReference(fileName);
                await blockBlob.DownloadToStreamAsync(memoryStream);
                data = memoryStream.ToArray();
                //System.IO.File.WriteAllBytes(fileName, data);
            }
            Stream blobStream = blockBlob.OpenReadAsync().Result;
            ByteArrayContent bytes = new ByteArrayContent(data);
            MultipartFormDataContent multiContent = new MultipartFormDataContent
        {
            { bytes, "file", fileName }
        };
           //var result =  await MLAPI(fileName, blobstorageconnection, multiContent,data);
           var result = await MPAPIparallel(multiContent,fileName,data  );
            
            return result;

        }

        async Task<bool> MPAPIparallel(MultipartFormDataContent multiContent, string fileName, byte[] file)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "multipart/form-data");
            string ML_VechileDetection_API = (_configuration.GetValue<string>("ML_VechileDetection_API"));
            string ML_Accident_API = (_configuration.GetValue<string>("ML_Accident_API"));


            //Start with a list of URLs
            var urls = new string[]
                {
                  ML_VechileDetection_API,
                  ML_Accident_API
                };

            var content =
                   new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture));
            
                content.Add(new StreamContent(new MemoryStream(file)), "file", fileName);

            var requests = urls.Select
          (
              url =>  client.PostAsync(url, content)/*.PostAsync(urls + fileName, multiContent)*/

              ).ToList();
            
            
            await Task.WhenAll(requests);

            //Get the responses
            var responses = requests.Select
                (
                    task => task.Result
                );

            foreach (var r in responses)
            {
                // Extract the message body
                var s = await r.Content.ReadAsStringAsync();
                Console.WriteLine(s);
            }
            return true; 
        }

        async Task<bool> MLAPI(string fileName, string blobstorageconnection, MultipartFormDataContent multiContent, byte[] data)
        {
            string ML_Accident_API = (_configuration.GetValue<string>("ML_Accident_API"));
            string ML_VechileDetection_API = (_configuration.GetValue<string>("ML_VechileDetection_API"));
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    // client.Timeout = TimeSpan.FromMinutes(15);
                    client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "multipart/form-data");
                    
                    classHttpRequest.WritetoFile(null, "VideoID"+ fileName+" send to AIML");
                  
                  var result= await client.PostAsync(ML_VechileDetection_API + fileName, multiContent);
                  string result3 = await Upload(data, ML_Accident_API, fileName);
                    return true;
                   
                }
            }
            catch (Exception ex)
            {
                // return true;
                
                if (ex.Message.Contains("Timeout of 100 seconds"))
                {
                    try
                    {
                        string result3 = await Upload(data, ML_Accident_API, fileName);

                    }
                    catch (Exception ex1)
                    {
                        if (ex1.Message.Contains("Timeout of 100 seconds"))
                        {
                            return true;
                        }


                    }
                }


            }
            return true;


        }

        [HttpPost(nameof(UpdateProcessVideo))]
        public string UpdateProcessVideo(VideoDetails videoDetails)
        {
            try
            {
                string blobstorageconnection = _configuration.GetValue<string>("BlobConnectionString");
                VideoDetails VideoClass1 = new VideoDetails();
                VideoClass1.VideoId = Convert.ToInt32(videoDetails.VideoId);
                string BlobfileName = videoDetails.VideoId + ".webm";
                string BlobContainerName = _configuration.GetValue<string>("BlobContainerNameProcessvideo");
                VideoClass1.ProcessSasURL = GenerateSASURL(blobstorageconnection, BlobContainerName, BlobfileName);
                VideoClass1.ProcessSasURLUpdateTime = DateTime.Now;
                VideoClass1.Analyse = 1;
                var update = _cameraService.update(VideoClass1);
                return "success";
            }catch(Exception ex)
            {
                throw ;
            }

        }


        #endregion

        #region Azure Blob

        [HttpPost(nameof(UploadFile))]
        [DisableRequestSizeLimit, RequestFormLimits(MultipartBodyLengthLimit = int.MaxValue, ValueLengthLimit = int.MaxValue)]

        public async Task<IActionResult> UploadFile(IFormFile files1, [FromForm] string name)
        {

            try {
                //PostAFile(files1);

                VideoDetails VideoClass1 = JsonConvert.DeserializeObject<VideoDetails>(name);
                Random rnd = new Random();
                VideoClass1.VideoPath = "";//BlobPath + files.FileName;
                VideoClass1.CameraIp = VideoClass1.CameraIp; ;
                VideoClass1.VideoImage = (_configuration.GetValue<string>("videoImage"));
                if (VideoClass1.VideoId > 0)
                {
                    var update =  _cameraService.update(VideoClass1);
                    return Ok("Record updated successfully"); ;
                }
                var result= await _cameraService.AddVideoDetail(VideoClass1);  
                string blobstorageconnection = (_configuration.GetValue<string>("BlobConnectionString"));
                string BlobContainerName = _configuration.GetValue<string>("BlobContainerNameUnProcessvideo");
                CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(blobstorageconnection);
                CloudBlobClient blobClient1 = cloudStorageAccount.CreateCloudBlobClient();
                CloudBlobContainer container1 = blobClient1.GetContainerReference(BlobContainerName);
                var files = Request.Form.Files[0];
                string systemFileName = result.VideoId+ Path.GetExtension(files.FileName);
                CloudBlockBlob blockBlob = container1.GetBlockBlobReference(systemFileName);
                blockBlob.Properties.ContentType = "video/mp4";
                BlobHttpHeaders blobHttpHeaders = new BlobHttpHeaders()
                {
                    ContentType = "video/mp4"
                };
                await using (var data = files.OpenReadStream())
                {
                    await blockBlob.UploadFromStreamAsync(data, data.Length);
                }
                VideoClass1.SasURL =  GenerateSASURL(blobstorageconnection, BlobContainerName, systemFileName);
                VideoClass1.Created_Date = DateTime.Now;
                VideoClass1.VideoPath = systemFileName;
                var result2 =  _cameraService.update(VideoClass1);
                classHttpRequest.WritetoFile(null, " Upload File ");
                return Ok("File Uploaded Successfully");
            }
            catch (Exception ex)
            {
                classHttpRequest.WritetoFile(ex, " Upload File ");
                return (IActionResult)ex;
            }

        }


        [HttpPost(nameof(UploadFileLarge))]
        [Consumes("multipart/form-data")]
        [DisableRequestSizeLimit, RequestFormLimits(MultipartBodyLengthLimit = int.MaxValue, ValueLengthLimit = int.MaxValue)]

        public async Task<ActionResult> UploadFileLarge(IFormFile fileRequestObject, [FromForm] string name  )
        {
            UtilityHttpRequest classHttpRequest = new UtilityHttpRequest();
            try
            {

                VideoDetails VideoClass1 = JsonConvert.DeserializeObject<VideoDetails>(name);
                Random rnd = new Random();
                VideoClass1.VideoPath = "";//BlobPath + files.FileName;
                VideoClass1.CameraIp = VideoClass1.CameraIp; ;
                VideoClass1.VideoImage = (_configuration.GetValue<string>("videoImage"));
                if (VideoClass1.VideoId > 0)
                {
                    var update = _cameraService.update(VideoClass1);
                    return Ok("Record updated successfully"); ;
                }
                var result = await _cameraService.AddVideoDetail(VideoClass1);

                string storageAccountConnectionString = (_configuration.GetValue<string>("BlobConnectionString"));
                string BlobContainerName = _configuration.GetValue<string>("BlobContainerNameUnProcessvideo");
                CloudStorageAccount StorageAccount = CloudStorageAccount.Parse(storageAccountConnectionString);
                CloudBlobClient BlobClient = StorageAccount.CreateCloudBlobClient();
                CloudBlobContainer Container = BlobClient.GetContainerReference(BlobContainerName);
                await Container.CreateIfNotExistsAsync();
                CloudBlockBlob blob = Container.GetBlockBlobReference(fileRequestObject.FileName);
                HashSet<string> blocklist = new HashSet<string>();
                var files = Request.Form.Files[0];
                string systemFileName = result.VideoId + Path.GetExtension(files.FileName);
                CloudBlockBlob blockBlob = Container.GetBlockBlobReference(systemFileName);
                blockBlob.Properties.ContentType = "video/mp4";
                BlobHttpHeaders blobHttpHeaders = new BlobHttpHeaders()
                {
                    ContentType = "video/mp4"
                };

                var file = fileRequestObject;
                const int pageSizeInBytes = 10485760;
                long prevLastByte = 0;
                long bytesRemain = file.Length;

                byte[] bytes;

                using (MemoryStream ms = new MemoryStream())
                {
                    var fileStream = file.OpenReadStream();
                    await fileStream.CopyToAsync(ms);
                    bytes = ms.ToArray();
                }

                // Upload each piece
                do
                {
                    long bytesToCopy = Math.Min(bytesRemain, pageSizeInBytes);
                    byte[] bytesToSend = new byte[bytesToCopy];

                    Array.Copy(bytes, prevLastByte, bytesToSend, 0, bytesToCopy);
                    prevLastByte += bytesToCopy;
                    bytesRemain -= bytesToCopy;

                    //create blockId
                    string blockId = Guid.NewGuid().ToString();
                    string base64BlockId = Convert.ToBase64String(Encoding.UTF8.GetBytes(blockId));

                    await blob.PutBlockAsync(
                        base64BlockId,
                        new MemoryStream(bytesToSend, true),
                        null
                        );

                    blocklist.Add(base64BlockId);

                } while (bytesRemain > 0);

                //post blocklist
                await blob.PutBlockListAsync(blocklist);

                VideoClass1.SasURL = GenerateSASURL(storageAccountConnectionString, BlobContainerName, systemFileName);
                VideoClass1.Created_Date = DateTime.Now;
                VideoClass1.VideoPath = systemFileName;
                var result2 = _cameraService.update(VideoClass1);
                classHttpRequest.WritetoFile(null, " Upload File successfully");
                return Ok();
                // For more information on protecting this API from Cross Site Request Forgery (CSRF) attacks, see https://go.microsoft.com/fwlink/?LinkID=717803
               
            }
            catch(Exception ex)
            {
                classHttpRequest.WritetoFile(ex, " Upload File ");
                return null;
            }
        }

        public static async Task<string> Upload(byte[] file,string URL,string filename)
        {
            using (var client = new HttpClient())
            {
                using (var content =
                    new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture)))
                {
                    content.Add(new StreamContent(new MemoryStream(file)), "file", filename);

                    using (
                       var message =
                           await client.PostAsync(URL, content))
                    {
                        var input = await message.Content.ReadAsStringAsync();

                        return !string.IsNullOrWhiteSpace(input) ? Regex.Match(input, @"http://\w*\.directupload\.net/images/\d*/\w*\.[a-z]{3}").Value : null;
                    }
                }
            }
        }




        string GenerateSASURL(string blobstorageconnection, string containerName, string filename)
            {

               string blobName = filename;
                const SharedAccessBlobPermissions permissions = SharedAccessBlobPermissions.Read | SharedAccessBlobPermissions.Write | SharedAccessBlobPermissions.Create;
                var blobClient = CloudStorageAccount
                    .Parse(blobstorageconnection)
                    .CreateCloudBlobClient();
                var container = blobClient.GetContainerReference(containerName);
                var blob = container.GetBlockBlobReference(blobName);
                int SASURLValidYear = Convert.ToInt32(_configuration.GetValue<string>("SASURLValidYear"));
            
                var policy = new SharedAccessBlobPolicy
                {
                    SharedAccessExpiryTime = DateTime.UtcNow.AddYears(SASURLValidYear),
                    Permissions = permissions
                };
                var sasToken = blob.GetSharedAccessSignature(policy);
                var sasUri = blob.Uri.AbsoluteUri + sasToken;
                return sasUri;

            }
        
        [HttpPost(nameof(DownloadFile))]
        public async Task<IActionResult> DownloadFile(string fileName)
        {
            CloudBlockBlob blockBlob;
            await using (MemoryStream memoryStream = new MemoryStream())
            {
                string blobstorageconnection = _configuration.GetValue<string>("BlobConnectionString");
                CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(blobstorageconnection);
                CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(_configuration.GetValue<string>("BlobContainerName"));
                blockBlob = cloudBlobContainer.GetBlockBlobReference(fileName);
                await blockBlob.DownloadToStreamAsync(memoryStream);
            }

            Stream blobStream = blockBlob.OpenReadAsync().Result;
            return File(blobStream, blockBlob.Properties.ContentType, blockBlob.Name);
        }
        [HttpDelete(nameof(DeleteFile))]
        public async Task<bool> DeleteFile(string fileName, string blobstorageconnection,string strContainerName)
        {
           // string blobstorageconnection = _configuration.GetValue<string>("BlobConnectionString");
            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(blobstorageconnection);
            CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
           // string strContainerName = _configuration.GetValue<string>("BlobContainerName");
            CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(strContainerName);
            var blob = cloudBlobContainer.GetBlobReference(fileName);
            await blob.DeleteIfExistsAsync();
            return true;
        }
        #endregion
    }

   
}