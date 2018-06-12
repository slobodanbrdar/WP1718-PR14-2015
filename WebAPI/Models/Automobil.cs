using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiSluzba.Models
{
    public class Automobil
    {
        public ushort Godiste { get; set; }
        public String RegistarskaOznaka { get; set; }
        public String BrojTaxiVozila { get; set; }
        public String TipAutomobila { get; set; }
        public Korisnik Vozac { get; set; }
    }
}