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
    public class LokacijeController : ApiController
    {
        private LokacijaEntity db = new LokacijaEntity();

        // GET: api/Lokacije
        public IQueryable<Lokacija> GetLokacije()
        {
            return db.Lokacije;
        }

        // GET: api/Lokacije/5
        [ResponseType(typeof(Lokacija))]
        [Route("api/Lokacija")]
        public IHttpActionResult GetLokacija([FromBody]String id)
        {
            Lokacija lokacija = db.Lokacije.Find(id);
            if (lokacija == null)
            {
                return NotFound();
            }

            return Ok(lokacija);
        }

        // PUT: api/Lokacije/5
        [ResponseType(typeof(void))]
        [HttpPut, Route("api/Lokacije/PutLokacija")]
        public IHttpActionResult PutLokacija(Lokacija lokacija)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Lokacija l = db.Lokacije.Find(lokacija.LokacijaKey);
            
            if (l == null)
            {
                return NotFound();
            }
            l.Mesto = lokacija.Mesto;
            l.Ulica = lokacija.Ulica;
            l.Broj = lokacija.Broj;
            l.PozivniBroj = lokacija.PozivniBroj;

            db.Entry(l).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LokacijaExists(lokacija.LokacijaKey))
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

        // POST: api/Lokacije
        [ResponseType(typeof(Lokacija))]
        [HttpPost]
        public IHttpActionResult PostLokacija(Lokacija lokacija)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Lokacije.Add(lokacija);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (LokacijaExists(lokacija.LokacijaKey))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = lokacija.LokacijaKey }, lokacija);
        }

        // DELETE: api/Lokacije/5
        [ResponseType(typeof(Lokacija))]
        public IHttpActionResult DeleteLokacija(string id)
        {
            Lokacija lokacija = db.Lokacije.Find(id);
            if (lokacija == null)
            {
                return NotFound();
            }

            db.Lokacije.Remove(lokacija);
            db.SaveChanges();

            return Ok(lokacija);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LokacijaExists(string id)
        {
            return db.Lokacije.Count(e => e.LokacijaKey == id) > 0;
        }
    }
}