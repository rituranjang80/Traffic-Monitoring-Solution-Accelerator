using System;
using System.Collections.Generic;

#nullable disable

namespace HighwayMonitoring_DAL.Models
{
    public partial class Person1
    {
        public bool Id { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string UserEmail { get; set; }
        public string CreatedOn { get; set; }
        public string IsDeleted { get; set; }
    }
}
