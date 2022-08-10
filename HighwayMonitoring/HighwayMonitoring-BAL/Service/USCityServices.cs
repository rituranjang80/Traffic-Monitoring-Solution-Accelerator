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
    public class USCityervice
    {
        private readonly IRepository<USCity> _USCity;
    

        public USCityervice(IRepository<USCity> USCity)
        {
            _USCity = USCity;
        }
     
        public IEnumerable<string> GetAll_USCState()
        {
            try
            {

                return _USCity.GetAll().Select(x => x.STATE_NAME).Distinct().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<USCity> GetAll_USCity(string STATE_NAME)
        {
            try
            {

                return _USCity.GetAll().Where(x => x.STATE_NAME == STATE_NAME).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public USCity GetCityByID(string City)
        {
            try
            {

                return _USCity.GetAll().Where(x => x.CITY == City).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        
    }
}