using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace UtilityLibrary
{
    public class UtilityHttpRequest
    {
        public async Task<string> PostAPI(string APIPath, FormUrlEncodedContent content,int id)
        {
            using (var client = new HttpClient())
            {                
                VideoDetailsProcess videoDetailsProcess = new VideoDetailsProcess();
                videoDetailsProcess.VideoId = id;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                var json = JsonConvert.SerializeObject(videoDetailsProcess);
                var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json"); 
                var result = await client.PostAsync(APIPath, stringContent);
                string resultContent = await result.Content.ReadAsStringAsync();
                return resultContent;
               // Console.WriteLine(resultContent);
            }
        }

       public void WritetoFile(Exception ex,string msg)
        {
            string date = (DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "_")).Replace("-","_")+".html";
            date = "Error.html";
            string root = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location)+"/" + date;//"/file.html";
            File.AppendAllText(root, DateTime.Now.ToString() + Environment.NewLine);
            if (!string.IsNullOrEmpty(msg))
            {
                File.AppendAllText(root, msg + Environment.NewLine);
            }
            if (ex != null)
            {
                
                if (!string.IsNullOrEmpty(ex.Message))
                    File.AppendAllText(root, ex.Message + Environment.NewLine);
                else
                {
                    File.AppendAllText(root, ex.InnerException.Message + Environment.NewLine);
                }
                File.AppendAllText(root, ex.StackTrace + Environment.NewLine);
            }
        }

        public partial class VideoDetailsProcess
        {
            public int VideoId { get; set; }
        }

        }
    }
