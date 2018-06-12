using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace TaxiSluzba.Models
{
    public class Korisnik
    {
        
        public String KorisnickoIme { get; set; }
        public String Lozinka { get; set; }
        public String Ime { get; set; }
        public String Prezime { get; set; }
        public String JMBG { get; set; }
        public String Pol { get; set; }
        public String EMail { get; set; }
        public String Telefon { get; set; }
        List<Voznja> Voznje { get; set; }
        public String Uloga { get; set; }

    }
}
