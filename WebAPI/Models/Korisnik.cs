using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

        [ForeignKey("LokacijaVozaca_XKoordinata, LokacijaVozaca_YKoordinata")]
        public Lokacija LokacijaVozaca { get; set; }
        public ETipAutomobila ZeljeniTip { get; set; }
        public String LokacijaVozaca_XKoordinata { get; set; }
        public String LokacijaVozaca_YKoordinata { get; set; }

        public Korisnik()
        {
            Voznje = new List<Voznja>();
        }

        public Korisnik(String korisnickoIme, String lozinka, EUloga uloga, String LokacijaVozaca_XKoordinata, String LokacijaVozaca_YKoordinata)
        {
            Lokacija l = new Lokacija(LokacijaVozaca_XKoordinata, LokacijaVozaca_YKoordinata);
            KorisnikID = korisnickoIme;
            Lozinka = lozinka;
            Uloga = uloga;
        }


    }
}
