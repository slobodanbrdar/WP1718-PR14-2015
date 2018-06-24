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
using System.Web;

namespace WebAPI.Controllers
{
    public class VoznjeController : ApiController
    {
        private VoznjaEntity db = new VoznjaEntity();
        private KorisnikEntity kor = new KorisnikEntity();
        private List<String> GetLoggedUsers
        {
            get
            {
                return (List<String>)HttpContext.Current.Application["Ulogovani"];
            }
        }

        // GET: api/Voznje
        public IQueryable<Voznja> GetVoznjas()
        {
            return db.Voznjas;
        }

        // GET: api/Voznje/5
        [ResponseType(typeof(Voznja))]
        public IHttpActionResult GetVoznja(string id)
        {
            Voznja voznja = db.Voznjas.Find(id);
            if (voznja == null)
            {
                return NotFound();
            }

            return Ok(voznja);
        }

        // PUT: api/Voznje/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVoznja(string id, Voznja voznja)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != voznja.VoznjaID)
            {
                return BadRequest();
            }

            db.Entry(voznja).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoznjaExists(id))
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

        

        // POST: api/Voznje
        [ResponseType(typeof(Voznja))]
        public IHttpActionResult PostVoznja(Voznja voznja)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (voznja.DispecerID == null && voznja.MusterijaID == null)
            {
                return Unauthorized();
            }
            else if (voznja.DispecerID != null && !GetLoggedUsers.Contains(voznja.DispecerID))
            {
                return Unauthorized();
            }
            else if (voznja.MusterijaID != null && !GetLoggedUsers.Contains(voznja.MusterijaID))
            {
                return Unauthorized();
            }

            Korisnik k = new Korisnik();
            if (voznja.DispecerID != null)
            {
                k = kor.Korisnici.Find(voznja.DispecerID);
                if (k.Uloga != EUloga.DISPECER)
                    return Unauthorized();

                Korisnik vozac = kor.Korisnici.Find(voznja.VozacID);
                if (vozac.ZeljeniTip != voznja.ZeljeniTip)
                {
                    return Content(HttpStatusCode.NotAcceptable, "Vozac ne poseduje ovaj tip automobila");
                }
            }
            else if (voznja.MusterijaID != null)
            {
                k = kor.Korisnici.Find(voznja.MusterijaID);
                if (k.Uloga != EUloga.MUSTERIJA)
                    return Unauthorized();

                if (voznja.VozacID != null)
                    return Unauthorized();
            }
            

            if (voznja.DispecerID != null)
            {
                voznja.StatusVoznje = EStatus.FORMIRANA;
            }
            else
            {
                voznja.StatusVoznje = EStatus.KREIRANA;
            }

            db.Voznjas.Add(voznja);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (VoznjaExists(voznja.VoznjaID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = voznja.VoznjaID }, voznja);
        }

        // DELETE: api/Voznje/5
        [ResponseType(typeof(Voznja))]
        public IHttpActionResult DeleteVoznja(string id)
        {
            Voznja voznja = db.Voznjas.Find(id);
            if (voznja == null)
            {
                return NotFound();
            }

            db.Voznjas.Remove(voznja);
            db.SaveChanges();

            return Ok(voznja);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VoznjaExists(string id)
        {
            return db.Voznjas.Count(e => e.VoznjaID == id) > 0;
        }
    }
}