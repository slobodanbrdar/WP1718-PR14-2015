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
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class KorisniciController : ApiController
    {
        private List<String> GetLoggedUsers
        {
            get
            {
                return (List<String>)HttpContext.Current.Application["Ulogovani"];
            }
        }
        private KorisnikEntity db = new KorisnikEntity();
        private VoznjaEntity voznje = new VoznjaEntity();

        // GET: api/Korisnici
        public IQueryable<Korisnik> GetKorisnici()
        {
            return db.Korisnici;
        }
        


        // GET: api/Korisnici/5
        [ResponseType(typeof(Korisnik))]
        [HttpGet, Route("api/Korisnici")]
        public IHttpActionResult GetKorisnik([FromUri]string id)
        {
            if (!GetLoggedUsers.Contains(id))
                return Content(HttpStatusCode.Unauthorized, "Niste ulogovani");

            Korisnik korisnik = db.Korisnici.Include(e => e.LokacijaVozaca).ToList().Find(kor => kor.KorisnikID == id);
            if (korisnik == null)
            {
                return NotFound();
            }

            return Ok(korisnik);
        }

        [HttpGet]
        [Route("api/Korisnici/GetPage")]
        public IHttpActionResult GetPage([FromUri]string id)
        {
            if (!GetLoggedUsers.Contains(id))
                return Content(HttpStatusCode.Unauthorized, "Niste prijvaljeni");

            Korisnik korisnik = db.Korisnici.Include(e => e.LokacijaVozaca).ToList().Find(kor => kor.KorisnikID == id);
            if (korisnik == null)
            {
                return NotFound();
            }

            if (korisnik.Uloga == EUloga.MUSTERIJA)
                return Ok("./Content/partials/profileKorisnik.html");
            else if (korisnik.Uloga == EUloga.DISPECER)
                return Ok("./Content/partials/profileDispecer.html");
            else
                return Ok("./Content/partials/profileVozac.html");
        }

        [HttpPost]
        [Route("api/Korisnici/Logout")]
        public IHttpActionResult Logout ([FromBody]string id)
        {

            if (!GetLoggedUsers.Contains(id))
            {
                return Unauthorized();
            }

            GetLoggedUsers.Remove(id);
            return Ok();
        }

        [HttpGet]
        [Route("api/Korisnici/DispecerskeVoznje")]
        public IHttpActionResult GetDispecerDrives([FromUri]String id)
        {
            if (!GetLoggedUsers.Contains(id))
                return Unauthorized();

            Korisnik k = db.Korisnici.Find(id);
            if (k == null)
            {
                return NotFound();
            }

            if (k.Uloga != EUloga.DISPECER)
                return Unauthorized();

            List<Voznja> retVoznje = voznje.Voznjas.Include(kom => kom.KomentarVoznje).Where(i => i.DispecerID == id).ToList();
            return Ok(retVoznje);
        }

        [HttpGet]
        [Route ("api/Korisnici/KorisnickeVoznje")]
        public IHttpActionResult GetUserDrives([FromUri]String id)
        {
            Korisnik kor = db.Korisnici.Include(korisnik => korisnik.Voznje).ToList().Find(k => k.KorisnikID == id);

            if (kor == null)
                return NotFound();

            if (!GetLoggedUsers.Contains(id))
                return Unauthorized();

            if (kor.Uloga == EUloga.VOZAC)
            {
                return Unauthorized();
            }
            List<Voznja> retVoznje = voznje.Voznjas.Include(kom => kom.KomentarVoznje).Where(i => i.MusterijaID == id).ToList();

            return Ok(retVoznje);
        }

        [HttpGet]
        [Route("api/Korisnici/GetKreiraneVoznje")]
        public IHttpActionResult GetKreiraneVoznje([FromUri]String id)
        {
            Korisnik kor = db.Korisnici.Include(korisnik => korisnik.Voznje).ToList().Find(k => k.KorisnikID == id);
            if (kor == null)
                return NotFound();

            if (!GetLoggedUsers.Contains(id))
                return Unauthorized();

            if (kor.Uloga == EUloga.MUSTERIJA)
                return Unauthorized();

            List<Voznja> retVoznje = voznje.Voznjas.Include(kom => kom.KomentarVoznje).Where(i => i.StatusVoznje == EStatus.KREIRANA).ToList();
            return Ok(retVoznje);
        }

        [HttpGet]
        [Route("api/Korisnici/VozaceveVoznje")]
        public IHttpActionResult GetDriversDrives([FromUri]String id)
        {
            Korisnik kor = db.Korisnici.Include(korisnik => korisnik.Voznje).ToList().Find(k => k.KorisnikID == id);
            if (kor == null)
                return NotFound();

            if (!GetLoggedUsers.Contains(id))
                return Unauthorized();

            if (kor.Uloga == EUloga.MUSTERIJA)
                return Unauthorized();

            List<Voznja> retVoznje = voznje.Voznjas.Include(kom => kom.KomentarVoznje).Where(i => i.VozacID == id).ToList();

            return Ok(retVoznje);
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

            if(!GetLoggedUsers.Contains(id))
            {
                return Content(HttpStatusCode.Unauthorized, "Morate biti ulogovani da biste izvrsili ovu operaciju");
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

            if (!GetLoggedUsers.Contains(k.KorisnikID))
                GetLoggedUsers.Add(k.KorisnikID);

            return Ok(k);
        }

        [HttpPost]
        [Route ("api/Korisnici/DodajVozaca")]
        public IHttpActionResult PostVozac(VozacRegistrationModel vozac)
        {
            String sender = vozac.IdSender;

            if (!GetLoggedUsers.Contains(sender))
            {
                return Unauthorized();
            }

            Korisnik korisnik = db.Korisnici.Include(e => e.LokacijaVozaca).ToList().Find(kor => kor.KorisnikID == vozac.IdSender);
            if (korisnik == null)
            {
                return NotFound();
            }

            if (korisnik.Uloga != EUloga.DISPECER)
            {
                return Unauthorized();
            }

            Korisnik korVozac = new Korisnik()
            {
                KorisnikID = vozac.KorisnikID,
                EMail = vozac.EMail,
                Ime = vozac.Ime,
                Prezime = vozac.Prezime,
                JMBG = vozac.JMBG,
                Lozinka = vozac.Lozinka,
                Pol = vozac.Pol,
                Telefon = vozac.Telefon,
                Uloga = EUloga.VOZAC,
                ZeljeniTip = vozac.ZeljeniTip,
                AutomobilID = vozac.AutomobilID
            };


            db.Korisnici.Add(korVozac);


            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (KorisnikExists(korVozac.KorisnikID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
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

            if (korisnik.Uloga == EUloga.DISPECER || korisnik.Uloga == EUloga.VOZAC)
                return Content(HttpStatusCode.Unauthorized, "Ne mozete registrovati vozaca ili dispecera");

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

        [HttpGet]
        [Route("api/Korisnici/GetFreeDrivers")]
        public IHttpActionResult GetFreeDriver([FromUri]string id)
        {
            if (!GetLoggedUsers.Contains(id))
                return Unauthorized();

            Korisnik k = db.Korisnici.Find(id);
            if (k == null)
                return NotFound();

            if (k.Uloga != EUloga.DISPECER)
                return Unauthorized();

            List<Korisnik> vozaci = db.Korisnici.Include(kor => kor.Voznje).ToList().Where(a => a.Uloga == EUloga.VOZAC).ToList();

            List<Korisnik> slobodniVozaci = vozaci.Where(kor => {
                List<Voznja> voznjas = voznje.Voznjas.Where(v => v.VozacID == kor.KorisnikID).ToList();
                if (voznjas.Any(vz => vz.StatusVoznje == EStatus.UTOKU))
                    return false;
                else
                    return true;
            }).ToList();

            return Ok(slobodniVozaci);
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