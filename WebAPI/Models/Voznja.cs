using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiSluzba.Models
{
    public class Voznja
    {
        public DateTime DatumPorudzbine { get; set; }
        public Lokacija Lokacija { get; set; }
        public String ZeljeniTip { get; set; }
        public Double Iznos { get; set; }
        public Lokacija Odrediste { get; set; }
        public Korisnik Musterija { get; set; }
        public Korisnik Dispecer { get; set; }
        public Korisnik Vozac { get; set; }
        public Komentar Kometnar { get; set; }
        public String StatusVoznje { get; set; }



    }
}