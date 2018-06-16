using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Komentar
    {
        [Key]
        [Display(Name = "Datum objave")]
        [ForeignKey("KomentarisanaVoznja")]
        public String KometarID { get; set; }
        public String Opis { get; set; }
        
        public String Ocena { get; set; }

        public Korisnik VlasnikKomentara { get; set; }
        public Voznja KomentarisanaVoznja { get; set; }

        public Komentar() { }
        public Komentar (String id)
        {
            KometarID = id;
        }
    }
}