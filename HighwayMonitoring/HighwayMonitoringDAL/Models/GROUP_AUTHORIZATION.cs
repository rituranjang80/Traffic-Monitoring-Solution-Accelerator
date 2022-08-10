using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace HighwayMonitoring_DAL.Models
{
    [Table("GROUP_AUTHORIZATION", Schema = "dbo")]
    public partial class GROUP_AUTHORIZATION
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Group_Id { get; set; }
        public int Menu_Id { get; set; }
        public bool? Access_Right { get; set; }
        public bool? Add_Right { get; set; }
        public bool? Edit_Right { get; set; }
        public bool? Delete_Right { get; set; }
    }
}
