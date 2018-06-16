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
        [Key]
        [Column(Order = 1)]
        public String XKoordinata { get; set; }
        [Key]
        [Column(Order = 2)]
        public String YKoordinata { get; set; }
        public Adresa Adresa { get; set; }

        public Lokacija() { }
        public Lokacija(String x, String y)
        {
            XKoordinata = x;
            YKoordinata = y;
        }
    }
}