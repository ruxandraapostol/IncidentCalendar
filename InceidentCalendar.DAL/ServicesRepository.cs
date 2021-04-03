using System.Collections.Generic;
using System.Linq;

namespace IncidentCalendar.DAL
{
    public class ServicesRepository
    {
        static public List<IncidentCalender.DM.Services> GetServicesList()
        {
            StatusEntitiesDB db = new StatusEntitiesDB();
            List<IncidentCalender.DM.Services> servicesList = null;

            foreach (var dbService in db.Services.ToList())
            {
                var currentService = new IncidentCalender.DM.Services
                {
                    ServerId = dbService.Id,
                    ServerName = dbService.Name.ToString()
                };

                if (servicesList == null)
                    servicesList = new List<IncidentCalender.DM.Services>();

                servicesList.Add(currentService);
            }

            if (servicesList != null)
                servicesList = servicesList.OrderBy(x => x.ServerName).ToList();

            return servicesList;
        }
    }
}