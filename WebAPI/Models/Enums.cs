using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public enum EPol : byte
    {
        MUSKO = 0x1,
        ZENSKO,
    }

    public enum EStatus : byte
    {
        KREIRANA = 0x1, OTKAZANA, FORMIRANA, UTOKU, OBRADJENA, PRIHVACENA, NEUSPESNA, USPESNA,
    }

    public enum ETipAutomobila : byte
    {
        PUTNICKI = 0x1,
        KOMBI,
    }

    public enum EUloga : byte
    {
        MUSTERIJA = 0x1,
        DISPECER,
        VOZAC,
    }

}