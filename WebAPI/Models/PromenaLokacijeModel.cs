using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Controllers
{
    public class PromenaLokacijeModel
    {
        public String KorisnikID { get; set; }
        public String LokacijaX { get; set; }
        public String LokacijaY { get; set; }
        public String SenderID { get; set; }

    }
}