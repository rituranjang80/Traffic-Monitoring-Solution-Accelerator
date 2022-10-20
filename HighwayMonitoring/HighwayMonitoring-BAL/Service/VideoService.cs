using HighwayMonitoring_DAL.Interface;
using HighwayMonitoring_DAL.Modelss;
using HighwayMonitoring_DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HighwayMonitoring_BAL.Service
{
    public class VideoService
    {
        private readonly IRepository<VideoDetails> _VideoDetail;
       

        public VideoService( IRepository<VideoDetails> VideoDetail)
        {
        
            _VideoDetail = VideoDetail;

        }
        public async Task<VideoDetails> AddVideoDetail(VideoDetails Person)
        {
            return await _VideoDetail.Create(Person);
        }

        public VideoDetails GetvideoByCameraID(VideoDetails videoDetails)
        {
            try
            {

                var s = (_VideoDetail.GetAll()).Where(x => x.CameraIp.ToLower() == videoDetails.CameraIp.ToLower()).LastOrDefault();
                return s;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public IEnumerable <VideoDetails> GetAllVideo(VideoDetails videoDetails)
        {
            try
            {

                return _VideoDetail.GetAll().ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public VideoDetails GetVideoByID(int id)
        {
            try
            {

                return _VideoDetail.GetAll().Where(x => x.VideoId == id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public bool update(VideoDetails videoDetails)
        {
            try
            {
                var Result = GetVideoByID(videoDetails.VideoId);
                if (Result != null)
                {
                     if (string.IsNullOrEmpty(videoDetails.ProcessSasURL))
                    {

                        Result.Remark = videoDetails.Remark;
                        Result.Name = videoDetails.Name;
                        Result.CameraIp = videoDetails.CameraIp;
                       //Result.Analyse = videoDetails.Analyse;
                        _VideoDetail.Update(Result);
                    }
                    else
                    {
                        Result.ProcessSasURL = videoDetails.ProcessSasURL;
                        Result.ProcessSasURLUpdateTime = videoDetails.ProcessSasURLUpdateTime;
                        Result.Analyse = videoDetails.Analyse;
                        _VideoDetail.Update(Result);
                    }
                    


                }
                return true;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IEnumerable<VideoDetails> GetVideoBySearch(string text)
        {
            try
            {

                return _VideoDetail.GetAll().Where(x => x.Remark.ToLower().Contains(text.ToLower())).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public Boolean AIanalysis (VideoDetails videoDetails )
        {
            try
            {

               // var vidoe = _VideoDetail.GetAll().Where(x => x.VideoId == videoDetails.VideoId).FirstOrDefault();
                if (videoDetails != null)
                {
                    videoDetails.Analyse = 1;
                    _VideoDetail.Update(videoDetails);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            
        }
        public Boolean DeleteVideoByid(VideoDetails videoDetails)
        {
            try
            {

                var vidoe = _VideoDetail.GetAll().Where(x => x.VideoId == videoDetails.VideoId).FirstOrDefault();
                if (vidoe != null)
                {
                    _VideoDetail.Delete(vidoe);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw;
            }

        }



        public IEnumerable<VideoDetails> GetAll_cameraDetail()
        {
            try
            {
       
                return _VideoDetail.GetAll().ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public IEnumerable<VideoDetails> GetCameraVideo(CameraDetails cameraDetails)
        {
            try
            {

                
                var result = _VideoDetail.GetAll().Where(x => x.CameraIp == cameraDetails.CameraIp).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
    }
}