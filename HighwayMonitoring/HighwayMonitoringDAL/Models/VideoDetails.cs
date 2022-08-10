using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace HighwayMonitoring_DAL.Modelss
{
    [Table("VideoDetails", Schema = "dbo")]
    public partial class VideoDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VideoId { get; set; }
        public string CameraIp { get; set; }
        public int Cameraid { get; set; }
        public string Name { get; set; }
        public string VideoPath { get; set; }
        public DateTime Created_Date { get; set; }
        public DateTime? Updated_Date { get; set; }
        public string Remark { get; set; }
        public int Created_By { get; set; }
        public int? Updated_By { get; set; }

        public int Analyse { get; set; }
        public string VideoImage { get; set; }

        public string SasURL { get; set; }
        public string? ProcessSasURL { get; set; }
        public DateTime? ProcessSasURLUpdateTime { get; set; }
       public bool? isDeleted { get; set; }


    }
}
