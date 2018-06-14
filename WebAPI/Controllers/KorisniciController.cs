using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiSluzba.Models;
using WebAPI.Helpers;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class KorisniciController : ApiController
    {
        // GET: api/Korisnici
        public IHttpActionResult Get()
        {
            List<Korisnik> korisnici = new List<Korisnik>();
            StreamReader sr = new IOHelpers().GetStreamReader("korisnici.txt");


            String line;
            while ((line = sr.ReadLine()) != null)
            {
                String[] splitter = line.Split(';');
                Korisnik k = new Korisnik();
                if (splitter.Count() < 9)
                    continue;
                k.KorisnickoIme = splitter[0];
                k.Ime = splitter[2];
                k.Prezime = splitter[3];
                k.EMail = splitter[4];
                k.JMBG = splitter[5];
                k.Telefon = splitter[6];
                k.Pol = splitter[7];
                k.Uloga = splitter[8];
                
                korisnici.Add(k);

            }

            sr.Close();
            return Ok(korisnici);
        }

        // GET: api/Korisnici/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Korisnici
        [HttpPost]
        [Route("api/korisnici/Registracija")]
        public IHttpActionResult Registracija(Korisnik value)
        {
            StreamReader sr = new IOHelpers().GetStreamReader("korisnici.txt");
            String line;
            while ((line = sr.ReadLine()) != null)
            {
                String[] splliter = line.Split(';');
                if (splliter[0] == value.KorisnickoIme)
                {
                    sr.Close();
                    return BadRequest("Korisnik vec postoji");
                    //return Content(HttpStatusCode.BadRequest, "Korisnik vec postoji");
                }
            }

            sr.Close();
            StreamWriter sw = new IOHelpers().GetAppendStreamWriter("korisnici.txt");
            sw.WriteLine();
            sw.Write(value.KorisnickoIme + ";" + value.Lozinka + ";" + value.Ime + ";" + value.Prezime + ";" + value.EMail + ";" + value.JMBG + ";" + value.Telefon + ";" + value.Pol + ";" + value.Uloga);
            sw.Close();
            return Ok();
        }


        [HttpPost]
        [Route("api/korisnici/prijava")]
        public IHttpActionResult Prijava(PrijavaModel p)
        {
            StreamReader sr = new IOHelpers().GetStreamReader("korisnici.txt");
            String line;
            while ((line = sr.ReadLine()) != null)
            {
                String[] splliter = line.Split(';');
                if (splliter[0] == p.Username)
                {
                    if (splliter[1] == p.Password)
                    {
                        Korisnik k = new Korisnik();
                        k.KorisnickoIme = splliter[0];
                        k.Lozinka = splliter[1];
                        k.Ime = splliter[2];
                        k.Prezime = splliter[3];
                        k.EMail = splliter[4];
                        k.JMBG = splliter[5];
                        k.Telefon = splliter[6];
                        k.Pol = splliter[7];
                        k.Uloga = splliter[8];
                        sr.Close();
                        return Ok(k);
                    }
                    else
                    {
                        break;
                    }
                        
                }
                else
                {
                    continue;
                }
            }
            sr.Close();
            return BadRequest("Pogresan username ili passowrd");
        }

        // PUT: api/Korisnici/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Korisnici/5
        public void Delete(int id)
        {
        }
    }
}
