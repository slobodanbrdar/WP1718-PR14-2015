using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApi.Models;

namespace WebAPI.Models.Entities
{
    public class LokacijaEntity : DbContext
    {
        public DbSet<Lokacija> Lokacije { get; set; }
        public LokacijaEntity() : base("name=TaxiSluzbaDBConnectionString") { }
    }
}