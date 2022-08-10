using HighwayMonitoring_DAL.Interface;
using HighwayMonitoring_DAL.Models;
using HighwayMonitoring_DAL.Models.BussinessModels;
using HighwayMonitoring_DAL.Modelss;
using HighwayMonitoring_DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HighwayMonitoring_BAL.Service
{
    public class UserService
    {
        private readonly IRepository<USERS> _user;
        private readonly IRepository<GROUP_AUTHORIZATION> _groupAuthorization;
        // private readonly IRepository<VideoDetails> _VideoDetail;

        public UserService(IRepository<USERS> User, IRepository<GROUP_AUTHORIZATION> groupAuthorization)
        {
            _user = User;
            _groupAuthorization = groupAuthorization;
           // _VideoDetail = VideoDetails;

        }
        public UserGroup GetByEmail(string user, USERS uSERS1)
        {
            try
            {
               
                var Userlist = _user.GetAll().Where(x => x.Email_Id == user).ToList();
                if (Userlist.Count == 0)
                {
                    if (!string.IsNullOrEmpty(user))   {
                        
                        USERS uSERS = new USERS();
                        uSERS.User_Name = user;
                        uSERS.Email_Id = user;
                        uSERS.Group_Id = 1;
                        uSERS.Is_Active = true;
                        uSERS.User_Name = user;
                        uSERS.User_Organization = "Microsoft";
                        uSERS.User_Designation = "Manager";
                        uSERS.Phone_Number = "11111";
                        uSERS.Mobile_Number = "11111";
                        uSERS.User_Address = "Microsoft Office";
                        uSERS.Is_Internal = true;

                        _user.Create(uSERS);
                        Userlist = _user.GetAll().Where(x => x.Email_Id == user).ToList();
                    }

                }
                var s = _groupAuthorization.GetAll().Where(x => x.Group_Id == Userlist[0].Group_Id);
                UserGroup userGroup = new UserGroup();
                userGroup.GROUP_AUTHORIZATION = new List<GROUP_AUTHORIZATION>();
                userGroup.USERS = new List<USERS>();
                userGroup.GROUP_AUTHORIZATION.AddRange(s);
                userGroup.USERS.AddRange(Userlist);
                userGroup.APIResult = 1;
                return userGroup;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<USERS> GetAll_user()
        {
            try
            {
       
                return _user.GetAll().ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public IEnumerable<VideoDetails> GetCameraVideo(USERS User)
        {
            try
            {

                return null;// _VideoDetail.GetAll().Where(x=>x.CameraId==User.CameraId.ToString()).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
    }
}