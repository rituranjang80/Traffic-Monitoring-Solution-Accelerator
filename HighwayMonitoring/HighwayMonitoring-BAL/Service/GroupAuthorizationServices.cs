using HighwayMonitoring_DAL.Interface;
using HighwayMonitoring_DAL.Models;
using HighwayMonitoring_DAL.Modelss;
using HighwayMonitoring_DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HighwayMonitoring_BAL.Service
{
    public class GroupAuthorizationervice
    {
        private readonly IRepository<GROUP_AUTHORIZATION> _GroupAuthorization;
       // private readonly IRepository<VideoDetails> _VideoDetail;

        public GroupAuthorizationervice(IRepository<GROUP_AUTHORIZATION> GroupAuthorization)
        {
            _GroupAuthorization = GroupAuthorization;
           // _VideoDetail = VideoDetails;

        }
        //Get Person Details By Person Id

        public IEnumerable<GROUP_AUTHORIZATION> GetAll_GroupAuthorization()
        {
            try
            {
       
                return _GroupAuthorization.GetAll().ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public IEnumerable<VideoDetails> GetCameraVideo(GROUP_AUTHORIZATION GroupAuthorization)
        {
            try
            {

                return null;// _VideoDetail.GetAll().Where(x=>x.CameraId==GROUP_AUTHORIZATION.CameraId.ToString()).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
    }
}