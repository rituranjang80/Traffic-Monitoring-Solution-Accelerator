using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HighwayMonitoring_DAL.Models
{

    [Table("USERS", Schema = "dbo")]
    public partial class USERS
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int User_Id { get; set; }
        public string Email_Id { get; set; }
        public string User_Name { get; set; }
        public int? Group_Id { get; set; }
        public bool? Is_Active { get; set; }
        public string User_Organization { get; set; }
        public string User_Designation { get; set; }
        public string User_Department { get; set; }
        public string Phone_Number { get; set; }
        public string Mobile_Number { get; set; }
        public string User_Address { get; set; }
        public bool? Is_Internal { get; set; }

     //   public List <UserClient> userClients {get;set;}
       // public List<GROUP_AUTHORIZATION> GroupAuthorizations { get; set; }
    }
}
