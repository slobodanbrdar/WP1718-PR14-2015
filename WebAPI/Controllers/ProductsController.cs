using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ProductsController : ApiController
    {
        public List<Product> Get()
        {
            return Products.ProductsList;
        }

        public void Post([FromBody]Product product)
        {
            product.Id = Products.ProductsList.Count + 1;
            Products.ProductsList.Add(product);
        }
    }
}
