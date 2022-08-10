using Newtonsoft.Json;
using System;

namespace HighwayMonitoringCosmosDB.Models
{
    public class TrafficAnalysis
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty("tAcamera_Id")]
        public string TAcamera_Id { get; set; }

        [JsonProperty("Taccident")]
        public int Taccident { get; set; }

        [JsonProperty("noaccident")]
        public int noaccident { get; set; }

        [JsonProperty("tAccidentStatus")]
        public long tAccidentStatus { get; set; }

        [JsonProperty("tAccident_percent")]
        public long tAccident_percent { get; set; }



        [JsonProperty("tAframe_timestamp")]
        public int TAframe_timestamp { get; set; }

        [JsonProperty("tAvideo_Id")]
        public int tAvideo_Id { get; set; }

    }

    public class VehicleAccidentLive
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty("tAcamera_id")]
        public string TAcamera_Id { get; set; }

        [JsonProperty("tAccident_percent")]
        public string tAccident_percent { get; set; }

 
        [JsonProperty("tAccidentStatus")]
        public long tAccidentStatus { get; set; }

        [JsonProperty("current_timestamp")]
        public long current_timestamp { get; set; }

        

        [JsonProperty("tAframe_Id")]
        public long tAframe_Id { get; set; }

       
    }
}
