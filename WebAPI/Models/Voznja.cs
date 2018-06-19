using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Voznja
    {
        [Key]
        [Display(Name = "VremeVoznje")]
        public String VoznjaID { get; set; }

        [Required]
        public String Lokacija_XKoordinata { get; set; }
        [Required]
        public String Lokacija_YKoordinata { get; set; }

        [ForeignKey("Lokacija_XKoordinata, Lokacija_YKoordinata")]
        public Lokacija Lokacija { get; set; }
        public ETipAutomobila ZeljeniTip { get; set; }
        public Double Iznos { get; set; }

        
        public String Odrediste_XKoordinata { get; set; }
        public String Odrediste_YKoordinata { get; set; }

        [ForeignKey("Odrediste_XKoordinata, Lokacija_YKoordinata")]
        public Lokacija Odrediste { get; set; }


        public String MusterijaID { get; set; }
        [ForeignKey("MusterijaID")]
        public Korisnik Musterija { get; set; }

        
        public String DispecerID { get; set; }
        [ForeignKey("DispecerID")]
        public Korisnik Dispecer { get; set; }

        public String VozacID { get; set; }
        [ForeignKey("VozacID")]
        public Korisnik Vozac { get; set; }

        public String KomentarID { get; set; }

        [ForeignKey("KomentarID")]
        public Komentar KomentarVoznje { get; set; }
        public EStatus StatusVoznje { get; set; }


        public Voznja() { }
        public Voznja(String id)
        {
            VoznjaID = id;
        }

    }
}