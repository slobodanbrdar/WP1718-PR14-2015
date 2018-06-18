using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Adresa
    {
        public String Ulica { get; set; }
        public String Broj { get; set; }
        public String Mesto { get; set; }
        public String PozivniBroj { get; set; }

        public Adresa(String ulica, String broj, String mesto, String pozivniBroj)
        {
            Ulica = ulica;
            Broj = broj;
            Mesto = mesto;
            PozivniBroj = pozivniBroj;
        }

        public Adresa() { }
        public override string ToString()
        {
            return $"{Ulica} {Broj}\n{Mesto} {PozivniBroj}";
        }
    }
}