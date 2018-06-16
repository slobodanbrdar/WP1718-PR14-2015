using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Models.Entities;
using WebApi.Models;

namespace WebAPI.Controllers
{
    public class AutomobiliController : ApiController
    {
        private AutomobilEntity db = new AutomobilEntity();

        // GET: api/Automobili
        public IQueryable<Automobil> GetAutomobili()
        {
            return db.Automobili;
        }

        // GET: api/Automobili/5
        [ResponseType(typeof(Automobil))]
        public IHttpActionResult GetAutomobil(string id)
        {
            Automobil automobil = db.Automobili.Find(id);
            if (automobil == null)
            {
                return NotFound();
            }

            return Ok(automobil);
        }

        // PUT: api/Automobili/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAutomobil(string id, Automobil automobil)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != automobil.BrojTaxiVozila)
            {
                return BadRequest();
            }

            db.Entry(automobil).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AutomobilExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Automobili
        [ResponseType(typeof(Automobil))]
        public IHttpActionResult PostAutomobil(Automobil automobil)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Automobili.Add(automobil);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (AutomobilExists(automobil.BrojTaxiVozila))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = automobil.BrojTaxiVozila }, automobil);
        }

        // DELETE: api/Automobili/5
        [ResponseType(typeof(Automobil))]
        public IHttpActionResult DeleteAutomobil(string id)
        {
            Automobil automobil = db.Automobili.Find(id);
            if (automobil == null)
            {
                return NotFound();
            }

            db.Automobili.Remove(automobil);
            db.SaveChanges();

            return Ok(automobil);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AutomobilExists(string id)
        {
            return db.Automobili.Count(e => e.BrojTaxiVozila == id) > 0;
        }
    }
}