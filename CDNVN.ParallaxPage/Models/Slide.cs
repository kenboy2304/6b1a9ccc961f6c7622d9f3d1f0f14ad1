using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CDNVN.ParallaxPage.Models
{
    public class Slide
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual Presentation Presentation { get; set; }
        public virtual List<Item> Items { get; set; }

    }
}