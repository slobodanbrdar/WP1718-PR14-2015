using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApi.Models;

namespace WebAPI.Models.Entities
{
    public class KomentarEntity : DbContext
    {
        public DbSet<Komentar> Komentari { get; set; }
        

        public KomentarEntity() : base("name=TaxiSluzbaDBConnectionString") { }

        public System.Data.Entity.DbSet<WebApi.Models.Voznja> Voznjas { get; set; }
    }
}