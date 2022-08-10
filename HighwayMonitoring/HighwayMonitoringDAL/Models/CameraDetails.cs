using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace HighwayMonitoring_DAL.Modelss
{
    [Table("CameraDetails", Schema = "dbo")]
    public partial class CameraDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CameraId { get; set; }
        public string CameraIp { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public DateTime Created_Date { get; set; }
        public DateTime Updated_Date { get; set; }
        public string Remark { get; set; }
        public int Created_By { get; set; }
        public int Updated_By { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string IP_Address { get; set; }
        public string Place { get; set; }

    }
}
