using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CDNVN.ParallaxPage.Models;

namespace CDNVN.ParallaxPage.Controllers
{
    public class HomeController : Controller
    {
        ParallaxContext db = new ParallaxContext();
        public ActionResult Index(int id=0)
        {
            if (id != 0) ViewBag.DataJson = db.Presentations.Find(id).JsonSlide;
            return View();
        }
        public ActionResult LayerEditor()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        public ActionResult ParallaxSlideEditor(int id)
        {
            if (id != 0) ViewBag.DataJson = db.Presentations.Find(id).JsonSlide;
            return View();
        }
        public ActionResult ParallaxProperties()
        {

            return View();
        }
        public ActionResult ParallaxAnimation()
        {

            return View();
        }
        
        public ActionResult Properties()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        
    }
}