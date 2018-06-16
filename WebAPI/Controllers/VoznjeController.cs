﻿using System;
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
    public class VoznjeController : ApiController
    {
        private VoznjaEntity db = new VoznjaEntity();

        // GET: api/Voznje
        public IQueryable<Voznja> GetVoznjas()
        {
            return db.Voznje;
        }

        // GET: api/Voznje/5
        [ResponseType(typeof(Voznja))]
        public IHttpActionResult GetVoznja(string id)
        {
            Voznja voznja = db.Voznje.Find(id);
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

            db.Voznje.Add(voznja);

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
            Voznja voznja = db.Voznje.Find(id);
            if (voznja == null)
            {
                return NotFound();
            }

            db.Voznje.Remove(voznja);
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
            return db.Voznje.Count(e => e.VoznjaID == id) > 0;
        }
    }
}