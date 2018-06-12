using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiSluzba.Models
{
    public class Komentar
    {
        String Opis { get; set; } = "";
        DateTime DatumObjave { get; set; }
        Int32 Ocena { get; set; } = 0;
    }
}