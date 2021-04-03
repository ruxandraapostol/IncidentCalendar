using System;
using System.ComponentModel.DataAnnotations;

namespace IncidentCalendar.DM
{
    public class Login
    {
        public Guid Id { get; set; }

        [Required]
        [Display(Name = "Username")]
        public String Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public String Password { get; set; }
    }
}