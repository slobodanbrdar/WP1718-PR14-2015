using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Automobil
    {
        [Key]
        [Display(Name = "Oznaka taksi vozila")]
        public String BrojTaxiVozila { get; set; }
        public String Godiste { get; set; }
        public String RegistarskaOznaka { get; set; }
        
        public ETipAutomobila TipAutomobila { get; set; }
        public String Vozac { get; set; }

        public Automobil() { }

        public Automobil(String brojTaxiVozila, Korisnik vozac)
        {
            BrojTaxiVozila = brojTaxiVozila;
        }
    }
}