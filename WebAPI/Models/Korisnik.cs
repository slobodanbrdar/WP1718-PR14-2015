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
        private String xKoordinata = "0";
        private String yKoordinata = "0";
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

        [ForeignKey("LokacijaKey")]
        public Lokacija LokacijaVozaca { get; set; }
        public ETipAutomobila ZeljeniTip { get; set; }
        
        public String AutomobilID { get; set; }
        [ForeignKey ("AutomobilID")]
        public Automobil TaxiVozilo { get; set; }
        public String LokacijaKey { get; private set; }
        public String XKoordinata
        {
            get
            {
                return xKoordinata;

            }
            set
            {
                xKoordinata = value;
                LokacijaKey = XKoordinata + YKoordinata;
            }
        }
        public String YKoordinata
        {
            get
            {
                return yKoordinata;

            }
            set
            {
                yKoordinata = value;
                LokacijaKey = XKoordinata + YKoordinata;
            }
        }

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
