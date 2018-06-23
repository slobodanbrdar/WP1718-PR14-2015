using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApi.Models;

namespace WebAPI.Models
{
    public class VozacRegistrationModel
    {
        public String KorisnikID { get; set; }
        public String IdSender { get; set; }
        public String Lozinka { get; set; }
        public String Ime { get; set; }
        public String Prezime { get; set; }
        public String JMBG { get; set; }
        public EPol Pol { get; set; }
        public String EMail { get; set; }
        public String Telefon { get; set; }
        public EUloga Uloga { get; set; }
        public ETipAutomobila ZeljeniTip { get; set; }
        public String AutomobilID { get; set; }

    }
}