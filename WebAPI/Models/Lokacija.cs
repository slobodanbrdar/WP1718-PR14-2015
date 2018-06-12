using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiSluzba.Models
{
    public class Lokacija
    {
        public Double XKoordinata { get; set; }
        public Double YKoordinata { get; set; }
        public Adresa Adresa { get; set; }
    }
}