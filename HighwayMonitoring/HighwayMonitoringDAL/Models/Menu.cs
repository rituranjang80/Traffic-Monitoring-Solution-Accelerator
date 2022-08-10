using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HighwayMonitoring_DAL.Models
{
    [Table("Menu", Schema = "dbo")]
    public partial class Menu
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MenuId { get; set; }
        public int? ParentId { get; set; }
        public bool? IsBase { get; set; }
        public bool? IsParent { get; set; }
        public bool? IsChild { get; set; }
        public bool? IsFunction { get; set; }
        public int? MenuIndex { get; set; }
        public string MenuText { get; set; }
        public string MenuUrl { get; set; }
    }
}
