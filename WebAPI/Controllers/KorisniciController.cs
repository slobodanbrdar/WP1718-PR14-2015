using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaxiSluzba.Models;
using WebAPI.Helpers;

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
                String[] spllieter = line.Split(';');
                Korisnik k = new Korisnik();
                if (spllieter.Count() < 9)
                    continue;
                k.KorisnickoIme = spllieter[0];
                k.Ime = spllieter[2];
                k.Prezime = spllieter[3];
                k.EMail = spllieter[4];
                k.JMBG = spllieter[5];
                k.Telefon = spllieter[6];
                k.Pol = spllieter[7];
                k.Uloga = spllieter[8];
                
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
