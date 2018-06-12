using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiSluzba.Models
{
    public class Adresa
    {
        public String Ulica { get; set; }
        public Int32 Broj { get; set; }
        public String Mesto { get; set; }
        public Int32 PozivniBroj { get; set; }

    }
}