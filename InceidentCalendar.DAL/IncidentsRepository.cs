using System.Collections.Generic;
using System.Linq;


namespace IncidentCalendar.DAL
{
    public class IncidentsRepository
    {
        public static List<DM.Incidents> ServerIncidents()
        {
            StatusEntitiesDB db = new StatusEntitiesDB();
            List<DM.Incidents> incidentsList = null;

            foreach (var dbIncident in db.Incidents.ToList())
            {
                string serverName = "";
                foreach (var currentService in db.Services.ToList())
                {
                    if (dbIncident.ServiceId == currentService.Id)
                    {
                        serverName = currentService.Name;
                        break;
                    }
                }

                var newIncident = new DM.Incidents(dbIncident.Id,
                    dbIncident.ServiceId, dbIncident.Description,
                    dbIncident.DateStarted, dbIncident.DateEnded,
                    serverName, dbIncident.IncidentType);

                if (incidentsList == null)
                    incidentsList = new List<DM.Incidents>();

                incidentsList.Add(newIncident);
            }

            if (incidentsList != null)
                incidentsList = incidentsList.OrderBy(x => x.ServerName).
                    ThenByDescending(x => x.IncidentType).ThenBy(x => x.StartDate).ToList();

            return incidentsList;
        }
    }
}