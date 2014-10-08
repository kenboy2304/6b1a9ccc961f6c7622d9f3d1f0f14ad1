using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CDNVN.ParallaxPage.Models
{
    public class Presentation
    {
        public int Id { get; set; }
        public string SeoKeyWord { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public virtual List<Slide> Slides { get; set; }
    }
}