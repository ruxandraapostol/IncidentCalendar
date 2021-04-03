using System;

namespace IncidentCalendar.DM
{
    public class Incidents
    {
        public Guid Id { get; set; }
        public Guid ServerId { get; set; }
        public String ServerName { get; set; }
        public String Description { get; set; }

        public DateTime StartDateFormat { get; set; }

        public DateTime? EndDateFormat { get; set; }
        public double StartDate { get; set; }
        public double EndDate { get; set; }
        public int IncidentType { get; set; }

        public Incidents(Guid id, Guid servId,
             String desc, DateTime start, DateTime? end,
             String serverName, int incidentType)
        {
            this.Id = id;
            this.Description = desc;
            this.ServerId = servId;
            this.EndDate = (end.GetValueOrDefault(new DateTime(1969, 12, 30, 21, 0, 0)).ToUniversalTime() - new DateTime(1969, 12, 30, 21, 0, 0)).TotalSeconds;
            this.StartDate = (start.ToUniversalTime() - new DateTime(1969, 12, 31, 21, 0, 0)).TotalSeconds;
            this.ServerName = serverName;
            this.IncidentType = incidentType;
        }

        public Incidents() { }
    }
}