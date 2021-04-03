using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InceidentCalendar.DAL
{
    public partial class _Default
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        public void AddIncident(object sender, EventArgs e)
        {

            StatusEntitiesDB db = new StatusEntitiesDB();
            var incidents = db.Set<Incident>();

            var id = Guid.NewGuid();
            Guid serviceId = new Guid();
            foreach (var currentService in db.Services.ToList())
            {
                if (TextBoxServerName.Text == currentService.Name)
                {
                    serviceId = currentService.Id;
                    break;
                }
            }

            incidents.Add(new Incident
            {
                Id = id,
                ServiceId = serviceId,
                DateStarted = TextBoxStartDate.Text,
                DateEnded = TextBoxEndDate.Text,
                Description = TextBoxDescription.Text,
                IncidentType = TextBoxType.Text
            });
        }
    }
}
