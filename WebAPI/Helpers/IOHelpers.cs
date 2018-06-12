using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace WebAPI.Helpers
{
    public class IOHelpers
    {
        public StreamReader GetStreamReader(String filename)
        {

            var dataFile = HttpContext.Current.Server.MapPath("~/App_Data/" + filename);
            FileStream reader = new FileStream(dataFile, FileMode.Open);
            return new StreamReader(reader);
        }

        public StreamWriter GetAppendStreamWriter(String filename)
        {
            var dataFile = HttpContext.Current.Server.MapPath("~/App_Data/" + filename);
            FileStream writer = new FileStream(dataFile, FileMode.Append, FileAccess.Write);
            return new StreamWriter(writer);
        }

    }
}