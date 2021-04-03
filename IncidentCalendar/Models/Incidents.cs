using System;

namespace IncidentCalendar.DM
{
    public class Incidents
    {
        public String id { get; set; }
        public String servId { get; set; }
        public String servName { get; set; }
        public String description { get; set; }
        public String[] startDate { get; set; }
        public String[] endDate { get; set; }

        public Incidents(String id, String servId, String desc, String start, String end, String serverName)
        {
            this.id = id;
            this.description = desc;
            this.servId = servId;

            char[] separators = { '/', ' ', '-', '.' };
            this.endDate = end.Split(separators);
            this.startDate = start.Split(separators);
            this.servName = serverName;
        }
    }
}