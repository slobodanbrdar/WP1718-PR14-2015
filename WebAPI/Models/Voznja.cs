using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Voznja
    {
        [Key]
        [Display(Name = "VremeVoznje")]
        public String VoznjaID { get; set; }
        public Lokacija Lokacija { get; set; }
        public ETipAutomobila ZeljeniTip { get; set; }
        public Double Iznos { get; set; }
        public Lokacija Odrediste { get; set; }

        public String MusterijaID { get; set; }
        public Korisnik Musterija { get; set; }

        public String DispecerID { get; set; }
        public Korisnik Dispecer { get; set; }

        [Required]
        public String VozacID { get; set; }
        public Korisnik Vozac { get; set; }
        public Komentar KomentarVoznje { get; set; }
        public EStatus StatusVoznje { get; set; }


        public Voznja() { }
        public Voznja(String id)
        {
            VoznjaID = id;
        }

    }
}