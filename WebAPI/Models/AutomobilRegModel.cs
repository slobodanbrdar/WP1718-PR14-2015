using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApi.Models;

namespace WebAPI.Models
{
    public class AutomobilRegModel
    {
        public String BrojTaxiVozila { get; set; }
        public String Godiste { get; set; }
        public String RegistarskaOznaka { get; set; }

        public ETipAutomobila TipAutomobila { get; set; }
        public String KorisnikID { get; set; }
        public String IDSender { get; set; }

    }
}