using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApi.Models;

namespace WebAPI.Models.Entities
{
    public class KorisnikEntity : DbContext
    {
        public DbSet<Korisnik> Korisnici { get; set; }
        public KorisnikEntity() : base("name=TaxiSluzbaDBConnectionString") { }

        public System.Data.Entity.DbSet<WebApi.Models.Automobil> Automobils { get; set; }
    }
}