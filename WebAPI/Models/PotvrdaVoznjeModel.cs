using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class PotvrdaVoznjeModel
    {
        public String SenderID { get; set; }
        public String VoznjaID { get; set; }
        public Double Iznos { get; set; }
        public String OdredisteX { get; set; }
        public String OdredisteY { get; set; }
    }
}