using System.Data.Entity;
using CDNVN.ParallaxPage.Models;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CDNVN.ParallaxPage.Startup))]
namespace CDNVN.ParallaxPage
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
