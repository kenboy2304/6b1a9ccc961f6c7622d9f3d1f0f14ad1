using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CDNVN.ParallaxPage.Models
{
    public class ParallaxContext: DbContext
    {
        public ParallaxContext() : base("ParallaxContext") { }
        public DbSet<Presentation> Presentations { get; set; }
    }
}