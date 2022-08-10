using Newtonsoft.Json;
using System;

namespace HighwayMonitoringCosmosDB.Models
{
    public class Vehicletrend
    {
        [JsonProperty(PropertyName = "id")]
        public string  Id { get; set; }

        [JsonProperty("camera_Id")]
        public int camera_Id { get; set; }

        [JsonProperty("car")]
        public int car { get; set; }

        [JsonProperty("bus")]
        public int bus { get; set; }

        [JsonProperty("motorbike")]
        public int motorbike { get; set; }

        [JsonProperty("truck")]
        public int truck { get; set; }

        [JsonProperty("frame_timestamp")]
        public Decimal frame_timestamp { get; set; }

        [JsonProperty("VideoID")]
        public int VideoID { get; set; }



    }

    public class VehicleTrendingLive
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty("camera_Id")]
        public int camera_Id { get; set; }

        [JsonProperty("current_time")]
        public long current_time { get; set; }

        

        [JsonProperty("car")]
        public int car { get; set; }

        [JsonProperty("bus")]
        public int bus { get; set; }

        [JsonProperty("motorbike")]
        public int motorbike { get; set; }

        [JsonProperty("truck")]
        public int truck { get; set; }

        [JsonProperty("frame_timestamp")]
        public Decimal frame_timestamp { get; set; }

        [JsonProperty("VideoID")]
        public int VideoID { get; set; }



    }

    public class LiveStramFilter
    {
        public int cameraId { get; set; }
        public long currenttimestamp { get; set; }
    }

    public class LiveChartData
    {
        public VehicleTrendingLive[] VehicleTrendingLive  { get; set; }
        public VehicleAccidentLive[] trafficAccidentLive  { get; set; }
    }
}
