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
using System.Windows;

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
        private List<String> GetBlockedUsers
        {
            get
            {
                return (List<String>)HttpContext.Current.Application["Blokirani"];
            }
        }
        private KorisnikEntity db = new KorisnikEntity();
        private VoznjaEntity voznje = new VoznjaEntity();

        // GET: api/Korisnici
        public IQueryable<Korisnik> GetKorisnici()
        {
            return db.Korisnici;
        }


        [HttpGet]
        [Route("api/Korisnici/GetMusterijeIVozace")]
        public IHttpActionResult GetNonDispecer([FromUri]string id)
        {
            if (!GetLoggedUsers.Contains(id))
            {
                return Unauthorized();
            }

            Korisnik k = db.Korisnici.Find(id);
            if (k.Uloga != EUloga.DISPECER)
            {
                return Unauthorized();
            }

            List<List<Korisnik>> ret = new List<List<Korisnik>>(); // prvi el su blokirani, drugi ostali
            List<Korisnik> blokirani = new List<Korisnik>();
            
            List<Korisnik> neblokirani = new List<Korisnik>();
            

            List<Korisnik> sviKorisnici = db.Korisnici.Where(koris => koris.Uloga != EUloga.DISPECER).ToList();

            foreach(Korisnik kor in sviKorisnici)
            {
                if (GetBlockedUsers.Contains(kor.KorisnikID))
                {
                    blokirani.Add(kor);
                }
                else
                {
                    neblokirani.Add(kor);
                }
            }
            ret.Add(blokirani);
            ret.Add(neblokirani);

            return Ok(ret);
        }

        [HttpPost, Route("api/Korisnici/Blokiraj")]
        public IHttpActionResult Blokiraj(BlockUnblockModel model)
        {
            if (!GetLoggedUsers.Contains(model.SenderID))
            {
                return Unauthorized();
            }

            Korisnik disp = db.Korisnici.Find(model.SenderID);
            if (disp == null)
            {
                return NotFound();
            }

            if (disp.Uloga != EUloga.DISPECER)
            {
                return Unauthorized();
            }

            if (GetBlockedUsers.Contains(model.KorisnikID))
            {
                return Content(HttpStatusCode.NotAcceptable, "Korisnik je vec blokiran");
            }

            GetBlockedUsers.Add(model.KorisnikID);

            return Ok();
        }

        [HttpPost, Route("api/Korisnici/Odblokiraj")]
        public IHttpActionResult Odblokiraj (BlockUnblockModel model)
        {
            if (!GetLoggedUsers.Contains(model.SenderID))
            {
                return Unauthorized();
            }

            Korisnik disp = db.Korisnici.Find(model.SenderID);
            if (disp == null)
            {
                return NotFound();
            }

            if (disp.Uloga != EUloga.DISPECER)
            {
                return Unauthorized();
            }

            if (!GetBlockedUsers.Contains(model.KorisnikID))
            {
                return Content(HttpStatusCode.NotAcceptable, "Korisnik je vec odblokiran");
            }

            GetBlockedUsers.Remove(model.KorisnikID);
            return Ok();
        }

        // GET: api/Korisnici/5
        [ResponseType(typeof(Korisnik))]
        [HttpGet, Route("api/Korisnici")]
        public IHttpActionResult GetKorisnik([FromUri]string id)
        {
            if (GetBlockedUsers.Contains(id))
                return Content(HttpStatusCode.Forbidden, "Blokirani ste!");


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
            if (GetBlockedUsers.Contains(id))
                return Content(HttpStatusCode.Forbidden, "Blokirani ste!");


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

            List<Voznja> retVoznje = voznje.Voznjas.Include(kom => kom.KomentarVoznje).Include(v => v.Vozac).Include(koris => koris.Musterija).Where(i => i.DispecerID == id).ToList();
            return Ok(retVoznje);
        }

        [HttpGet]
        [Route ("api/Korisnici/KorisnickeVoznje")]
        public IHttpActionResult GetUserDrives([FromUri]String id)
        {
            if (GetBlockedUsers.Contains(id))
                return Content(HttpStatusCode.Forbidden, "Blokirani ste!");

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

            if (GetBlockedUsers.Contains(id))
                return Content(HttpStatusCode.Forbidden, "Blokirani ste!");

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
            if (GetBlockedUsers.Contains(id))
                return Content(HttpStatusCode.Forbidden, "Blokirani ste!");

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

        [HttpPut]
        [Route("api/Korisnici/PromenaLokacije")]
        public IHttpActionResult PromenaLokacije (PromenaLokacijeModel promena)
        {
            if (GetBlockedUsers.Contains(promena.SenderID))
                return Content(HttpStatusCode.Forbidden, "Blokirani ste!");

            if (!GetLoggedUsers.Contains(promena.SenderID))
                return Unauthorized();

            Korisnik vozac = db.Korisnici.Find(promena.KorisnikID);
            Korisnik sender = db.Korisnici.Find(promena.SenderID);

            if (vozac.Uloga != EUloga.VOZAC)
                return Content(HttpStatusCode.NotAcceptable, "Lokacija se dodeljuje samo vozacu");

            if (sender.Uloga == EUloga.MUSTERIJA)
                return Unauthorized();

            vozac.XKoordinata = promena.LokacijaX;
            vozac.YKoordinata = promena.LokacijaY;

            db.Entry(vozac).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KorisnikExists(vozac.KorisnikID))
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

        // PUT: api/Korisnici/5
        [ResponseType(typeof(void))]
        [HttpPut]
        public IHttpActionResult PutKorisnik(Korisnik korisnik)
        {
            if (GetBlockedUsers.Contains(korisnik.KorisnikID))
                return Content(HttpStatusCode.Forbidden, "Blokirani ste!");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           

            if(!GetLoggedUsers.Contains(korisnik.KorisnikID))
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
                if (!KorisnikExists(korisnik.KorisnikID))
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
            if (GetBlockedUsers.Contains(prijava.Username))
                return Content(HttpStatusCode.Forbidden, "Blokirani ste!");

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
        [HttpPost, Route("api/Korisnici/PostKorisnik")]
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

            return Ok(korisnik);
        }

        [HttpPost]
        [Route("api/Korisnici/GetFreeDrivers")]
        public IHttpActionResult GetFreeDriver(NearestFiveModel model)
        {
            if (!GetLoggedUsers.Contains(model.KorisnikID))
                return Unauthorized();

            Korisnik k = db.Korisnici.Find(model.KorisnikID);
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

             

            List<Korisnik> retVozaci = new List<Korisnik>();
            if (slobodniVozaci.Count > 5)
            {
                Double x, y;
                try
                {
                    x = Double.Parse(model.LokacijaX);
                    y = Double.Parse(model.LokacijaY);
                }
                catch (Exception)
                {
                    return InternalServerError();
                }

                Point lokacija = new Point(x, y);
                foreach(Korisnik koris in slobodniVozaci)
                {
                    if (retVozaci.Count < 5)
                    {
                        retVozaci.Add(koris);
                    }
                    else
                    {
                        Double korisLokX, korisLokY;
                        try
                        {
                            korisLokX = Double.Parse(koris.XKoordinata);
                            korisLokY = Double.Parse(koris.YKoordinata);
                        }
                        catch (Exception)
                        {
                            return InternalServerError();
                        }

                        Point korisLokacija = new Point(korisLokX, korisLokY);
                        Double korisRazdaljina = Math.Abs(Point.Subtract(lokacija, korisLokacija).Length);
                        Double najvecaRazdaljina = 0;
                        int index = -1;
                        for (int i = 0; i < retVozaci.Count; i++)
                        {
                            Double iLokX, iLokY;
                            try
                            {
                                iLokX = Double.Parse(retVozaci[i].XKoordinata);
                                iLokY = Double.Parse(retVozaci[i].YKoordinata);
                            }
                            catch (Exception)
                            {
                                return InternalServerError();
                            }

                            Point iLok = new Point(iLokX, iLokY);
                            Double iRazdaljina = Math.Abs(Point.Subtract(lokacija, iLok).Length);
                            if (iRazdaljina > najvecaRazdaljina)
                            {
                                najvecaRazdaljina = iRazdaljina;
                                index = i;
                            }
                        }

                        if(najvecaRazdaljina > korisRazdaljina)
                        {
                            retVozaci.RemoveAt(index);
                            retVozaci.Add(koris);
                        }
                    }
                }
                
            }
            else
            {
                retVozaci = slobodniVozaci;
            }

            return Ok(retVozaci);
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