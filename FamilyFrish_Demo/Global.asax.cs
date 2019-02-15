using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using FamilyFrish_Demo.Resources;

namespace FamilyFrish_Demo
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            CreateResourceJson("hu");
        }

        /// <summary>
        /// Megadott nyelvű resource js létrehozása.
        /// </summary>
        /// <param name="lang">Nyelv.</param>
        protected void CreateResourceJson(string lang)
        {
            // resourceObject-be gyűjtjük a resX fájlokból az adatokat.
            var resourceObject = new JObject();

            // ResourceSet-ek létrehozása a resX fájlokból.
            var resourceSetLoginForm = Resources.LoginForm.ResourceManager.GetResourceSet(new System.Globalization.CultureInfo(lang), true, true);
            var resourceSetAlapadatok = Resources.Alapadatok.ResourceManager.GetResourceSet(new System.Globalization.CultureInfo(lang), true, true);

            // Dictionary készítés
            IDictionaryEnumerator enumeratorLoginForm = resourceSetLoginForm.GetEnumerator();
            IDictionaryEnumerator enumeratorAlapadatok = resourceSetAlapadatok.GetEnumerator();

            // Kulcs-érték párok hozzáadása a resourceObjecthez
            while (enumeratorLoginForm.MoveNext())
            {
                resourceObject.Add(enumeratorLoginForm.Key.ToString(), enumeratorLoginForm.Value.ToString());
            }
            while (enumeratorAlapadatok.MoveNext())
            {
                resourceObject.Add(enumeratorAlapadatok.Key.ToString(), enumeratorAlapadatok.Value.ToString());
            }
            // az összefűzött js fájl helye lesz
            string path = HostingEnvironment.MapPath(@"~/Scripts/i18n/");

            // js fájl létrehozás a path-ra.
            File.WriteAllText(string.Format("{0}angular-locale_FamilyFriss_{1}.js", path, lang), string.Format("var translation{0} = {1}", lang, resourceObject.ToString()));
        }
    }
}
