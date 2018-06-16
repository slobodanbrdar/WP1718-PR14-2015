using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace WebApi.Models
{
    public class Korisnik
    {
        [Key]
        [Display(Name = "KorisnickoIme")]
        public String KorisnikID { get; set; }
        [Required]
        public String Lozinka { get; set; }
        public String Ime { get; set; }
        public String Prezime { get; set; }
        public String JMBG { get; set; }
        [Required]
        public EPol Pol { get; set; }
        public String EMail { get; set; }
        public String Telefon { get; set; }
        public List<Voznja> Voznje { get; set; }
        [Required]
        public EUloga Uloga { get; set; }

        public Lokacija LokacijaVozaca { get; set; }
        public ETipAutomobila ZeljeniTip { get; set; }

        public Korisnik()
        {
            Voznje = new List<Voznja>();
        }

        public Korisnik(String korisnickoIme, String lozinka, EUloga uloga)
        {
            KorisnikID = korisnickoIme;
            Lozinka = lozinka;
            Uloga = uloga;
        }


    }
}
