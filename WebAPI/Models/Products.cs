using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Products
    {
        public static List<Product> ProductsList { get; set; } = new List<Product>()
        {
            new Product() { Id = 1, Name = "Joovan" },
            new Product() { Id = 2, Name = "Solja" },
            new Product() { Id = 3, Name = "Marker" }
        };
    }
}