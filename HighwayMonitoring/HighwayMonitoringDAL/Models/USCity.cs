using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace HighwayMonitoring_DAL.Modelss
{
    [Table("USCity", Schema = "dbo")]
    public partial class USCity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string STATE_CODE { get; set; }
        public string STATE_NAME { get; set; }
        public string CITY { get; set; }
        public string COUNTY { get; set; }
        public decimal LATITUDE { get; set; }
        public decimal LONGITUDE { get; set; }
    }
}
