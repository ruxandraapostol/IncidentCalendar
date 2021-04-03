using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Security;
using IncidentCalendar.DAL;

namespace IncidentCalendar.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            StatusEntitiesDB db = new StatusEntitiesDB();

            List<Services> servicesList = db.Services.ToList();
            ViewBag.ServicesList = new SelectList(servicesList, "Id", "Name");

            ViewBag.Services = ServicesRepository.GetServicesList();
            ViewBag.Incidents = IncidentsRepository.ServerIncidents();
            return View();
        }

        [HttpPost]
        public ActionResult SaveRecord(DM.Incidents model)
        {
            StatusEntitiesDB db = new StatusEntitiesDB();

            Incidents newIncident = new Incidents
            {
                DateEnded = model.EndDateFormat,
                DateStarted = model.StartDateFormat,
                Description = model.Description,
                IncidentType = model.IncidentType,
                Id = Guid.NewGuid()
            };

            bool isValid = Guid.TryParse(model.ServerName, out Guid result);
            if (isValid)
            {
                newIncident.ServiceId = result;
            }
            else
            {
                var servicesList = ServicesRepository.GetServicesList();
                foreach (var service in servicesList)
                {
                    if (service.ServerName == model.ServerName)
                    {
                        newIncident.ServiceId = service.ServerId;
                        break;
                    }
                }
            }

            db.Incidents.Add(newIncident);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult DeleteRecord(DM.Incidents model)
        {
            StatusEntitiesDB db = new StatusEntitiesDB();
            DAL.Incidents deleteIncident = db.Incidents.Find(model.Id);
            db.Incidents.Remove(deleteIncident);
            db.SaveChanges();
            return RedirectToAction("Index");
        }


        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(DM.Login model)
        {
            StatusEntitiesDB db = new StatusEntitiesDB();
            var user = db.Login.Where(x => x.Password == model.Password && x.Username == model.Username).FirstOrDefault();
            if (user != null)
            {
                Session["Username"] = user.Username;
                Session["Password"] = user.Password;
                Session["Accessibility"] = user.Role[0].ToString();
                return RedirectToAction("Index");
            }
            else
            {
                ModelState.AddModelError("Failure", "Wrong Username and password combination !");
                return View();
            }
        }

        [HttpPost]
        [Authorize]
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Abandon(); // it will clear the session at the end of request
            return RedirectToAction("Login");
        }
    }
}