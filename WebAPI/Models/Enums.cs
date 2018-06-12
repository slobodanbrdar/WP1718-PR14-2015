using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaxiSluzba.Models
{
    public enum EPol : ushort
    {
        MUSKO = 0,
        ZENSKO
    }

    public enum EStatus : ushort
    {
        KREIRANA = 0, OTKAZANA, FORMIRANA, OBRADJENA, PRIHVACENA, NEUSPESNA, USPESNA
    }

    public enum ETipAutomobila : ushort
    {
        PUTNICKI = 0,
        KOMBI
    }

    public enum EUloga : ushort
    {
        MUSTERIJA = 0,
        DISPECER,
        VOZAC
    }

}