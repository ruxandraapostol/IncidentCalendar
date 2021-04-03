using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using IncidentCalender.DM;
using System.Configuration;

namespace IncidentCalendar.DAL
{
    public class GetServices
    {
        static public List<Services> getServicesList()
        {
            var services = new List<Services>();

            string connectionString = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString;
            SqlConnection conn = new SqlConnection(connectionString);

            try
            {
                conn.Open();

                //  create command
                SqlCommand cmd = new SqlCommand("SELECT [Id],[Name] FROM [dbo].[Service]");
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Connection = conn;

                // read from db
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    var currentService = new Services();
                    currentService.id = reader["Id"].ToString();
                    currentService.name = reader["Name"].ToString();

                    services.Add(currentService);
                }
            } finally
            {
                conn.Close();
            }

            services = services.OrderBy(x => x.name).ToList();
            return services;
        }
    }
}