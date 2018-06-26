using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Lokacija
    {
        private String xKoordinata = "0";
        private String yKoordinata = "0";
        [Required]
        public String XKoordinata { 
            get
            {
                return xKoordinata;
            }
            set
            {
                xKoordinata = value;
                LokacijaKey = XKoordinata + "_" + YKoordinata;
            }
        }
        [Required]
        public String YKoordinata
        {
            get
            {
                return yKoordinata;
            }
            set
            {
                yKoordinata = value;
                LokacijaKey = XKoordinata + "_" + YKoordinata;
            }
        }
        [Key]
        public String LokacijaKey { get; set; }
        public String Ulica { get; set; }
        public String Broj { get; set; }
        public String Mesto { get; set; }
        public String PozivniBroj { get; set; }

        public Lokacija() { }
        public Lokacija(String x, String y)
        {
            XKoordinata = x;
            YKoordinata = y;
            LokacijaKey = x +"_"+ y;
        }
    }
}