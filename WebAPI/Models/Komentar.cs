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
        public String KometarID { get; set; }
        public String Opis { get; set; }
        
        public String Ocena { get; set; }

        public String VlasnikKomentara { get; set; }


        public String KomentarisanaVoznja { get; set; }


        public Komentar() { }
        public Komentar (String id)
        {
            KometarID = id;
        }
    }
}