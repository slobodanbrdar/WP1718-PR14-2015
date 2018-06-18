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
    public class KorisniciController : ApiController
    {
        private KorisnikEntity db = new KorisnikEntity();

        // GET: api/Korisnici
        public IQueryable<Korisnik> GetKorisnici()
        {
            return db.Korisnici;
        }

        // GET: api/Korisnici/5
        [ResponseType(typeof(Korisnik))]
        public IHttpActionResult GetKorisnik(string id)
        {
            Korisnik korisnik = db.Korisnici.Include(e => e.LokacijaVozaca).ToList().Find(kor => kor.KorisnikID == id);
            if (korisnik == null)
            {
                return NotFound();
            }

            return Ok(korisnik);
        }

        // PUT: api/Korisnici/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKorisnik(string id, Korisnik korisnik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != korisnik.KorisnikID)
            {
                return BadRequest();
            }

            db.Entry(korisnik).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KorisnikExists(id))
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

        [HttpPost]
        [Route("api/Korisnici/Prijava")]
        public IHttpActionResult Login (PrijavaModel prijava)
        {
            if (!KorisnikExists(prijava.Username))
                return BadRequest("Neispravan username ili lozinka");

            Korisnik k = db.Korisnici.Include(e => e.LokacijaVozaca).ToList().Find(kor => kor.KorisnikID == prijava.Username);

            if (k.Lozinka != prijava.Password)
                return BadRequest("Neispravan username ili lozinka");

            return Ok(k);
        }

        // POST: api/Korisnici
        [ResponseType(typeof(Korisnik))]
        public IHttpActionResult PostKorisnik(Korisnik korisnik)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (KorisnikExists(korisnik.KorisnikID))
                return BadRequest("Korisnik vec postoji");

            db.Korisnici.Add(korisnik);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (KorisnikExists(korisnik.KorisnikID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = korisnik.KorisnikID }, korisnik);
        }

        // DELETE: api/Korisnici/5
        [ResponseType(typeof(Korisnik))]
        public IHttpActionResult DeleteKorisnik(string id)
        {
            Korisnik korisnik = db.Korisnici.Find(id);
            if (korisnik == null)
            {
                return NotFound();
            }

            db.Korisnici.Remove(korisnik);
            db.SaveChanges();

            return Ok(korisnik);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KorisnikExists(string id)
        {
            return db.Korisnici.Count(e => e.KorisnikID == id) > 0;
        }
    }
}