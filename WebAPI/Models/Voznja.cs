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
        private String lokacija_XKoordinata = "0";
        private String lokacija_YKoordinata = "0";
        private String odrediste_XKoordinata = "0";
        private String odrediste_YKoordinata = "0";

        [Key]
        [Display(Name = "VremeVoznje")]
        public String VoznjaID { get; set; }

        [Required]
        public String Lokacija_XKoordinata {
            get
            {
                return lokacija_XKoordinata;
            }
            set
            {
                lokacija_XKoordinata = value;
                Lokacija_Key = Lokacija_XKoordinata + Lokacija_YKoordinata;
            }
        }
        [Required]
        public String Lokacija_YKoordinata
        {
            get
            {
                return lokacija_YKoordinata;
            }
            set
            {
                lokacija_YKoordinata = value;
                Lokacija_Key = Lokacija_XKoordinata + Lokacija_YKoordinata;
            }
        }

        public String Lokacija_Key { get; private set; }

        [ForeignKey("Lokacija_Key")]
        public Lokacija Lokacija { get; set; }
        public ETipAutomobila ZeljeniTip { get; set; }
        public Double Iznos { get; set; }

        public String Odrediste_Key { get; private set; }
        public String Odrediste_XKoordinata
        {
            get
            {
                return odrediste_XKoordinata;
            }
            set
            {
                odrediste_XKoordinata = value;
                Odrediste_Key = Odrediste_XKoordinata + Odrediste_YKoordinata;
            }
        }
        public String Odrediste_YKoordinata
        {
            get
            {
                return odrediste_YKoordinata;
            }
            set
            {
                odrediste_YKoordinata = value;
                Odrediste_Key = Odrediste_XKoordinata + Odrediste_YKoordinata;
            }
        }

        [ForeignKey("Odrediste_Key")]
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
        public EStatus StatusVoznje { get; set; } = EStatus.KREIRANA;


        public Voznja() { }
        public Voznja(String id)
        {
            VoznjaID = id;
        }

    }
}