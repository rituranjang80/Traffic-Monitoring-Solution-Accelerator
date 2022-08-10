using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;


namespace HighwayMonitoring_DAL.Models.BussinessModels
{

    public partial class UserGroup
    {
        public List<USERS> USERS { get;set;}
        public List<GROUP_AUTHORIZATION> GROUP_AUTHORIZATION { get; set; }

        public string Message { get; set; }
        public int APIResult { get; set; }
    }
}
