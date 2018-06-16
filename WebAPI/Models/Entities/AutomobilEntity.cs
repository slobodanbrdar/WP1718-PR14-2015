using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApi.Models;

namespace WebAPI.Models.Entities
{
    public class AutomobilEntity : DbContext
    {
        public DbSet<Automobil> Automobili { get; set; }
        public DbSet<Korisnik> Vozaci { get; set; }
        

        public AutomobilEntity() : base("name=TaxiSluzbaDBConnectionString") { }
    }
}