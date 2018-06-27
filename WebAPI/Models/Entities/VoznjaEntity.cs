using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApi.Models;

namespace WebAPI.Models.Entities
{
    public class VoznjaEntity : DbContext
    {
        public DbSet<Voznja> Voznjas { get; set; }
        public VoznjaEntity() : base("name=TaxiSluzbaDBConnectionString") { }

        public System.Data.Entity.DbSet<WebApi.Models.Korisnik> Korisniks { get; set; }

        public System.Data.Entity.DbSet<WebApi.Models.Komentar> Komentars { get; set; }

        //public System.Data.Entity.DbSet<WebApi.Models.Lokacija> Lokacijas { get; set; }
    }
}