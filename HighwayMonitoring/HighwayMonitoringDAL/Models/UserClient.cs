using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace HighwayMonitoring_DAL.Models
{
    [Table("UserClient", Schema = "dbo")]
    public partial class UserClient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string InvestorId { get; set; }
        public string PbiUrl { get; set; }
    }
}
