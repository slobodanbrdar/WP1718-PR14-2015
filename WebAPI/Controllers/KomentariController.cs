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
    public class KomentariController : ApiController
    {
        private KomentarEntity db = new KomentarEntity();

        // GET: api/Komentari
        public IQueryable<Komentar> GetKomentari()
        {
            return db.Komentari;
        }

        // GET: api/Komentari/5
        [ResponseType(typeof(Komentar))]
        public IHttpActionResult GetKomentar(string id)
        {
            Komentar komentar = db.Komentari.Find(id);
            if (komentar == null)
            {
                return NotFound();
            }

            return Ok(komentar);
        }

        // PUT: api/Komentari/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKomentar(string id, Komentar komentar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != komentar.KometarID)
            {
                return BadRequest();
            }

            db.Entry(komentar).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KomentarExists(id))
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

        // POST: api/Komentari
        [ResponseType(typeof(Komentar))]
        public IHttpActionResult PostKomentar(Komentar komentar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Komentari.Add(komentar);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (KomentarExists(komentar.KometarID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = komentar.KometarID }, komentar);
        }

        // DELETE: api/Komentari/5
        [ResponseType(typeof(Komentar))]
        public IHttpActionResult DeleteKomentar(string id)
        {
            Komentar komentar = db.Komentari.Find(id);
            if (komentar == null)
            {
                return NotFound();
            }

            db.Komentari.Remove(komentar);
            db.SaveChanges();

            return Ok(komentar);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KomentarExists(string id)
        {
            return db.Komentari.Count(e => e.KometarID == id) > 0;
        }
    }
}