using HighwayMonitoring_DAL.Interface;
using HighwayMonitoring_DAL.Modelss;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HighwayMonitoring_BAL.Service
{
    public class DBService
    {
        private readonly IRepository<Person> _person;

        public DBService(IRepository<Person> perosn)
        {
            _person = perosn;
        }
        //Get Person Details By Person Id
       
    }
}