using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Apium.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Docs : ControllerBase
    {
        // GET api/<Chat>
        [HttpGet()]
        public IEnumerable<DocuModel> Get()
        {
            Logger.Log("Call to GET /Docs");

            LoginManager loginManager = new LoginManager();
            string session = GetCallUserHeader(Request.Headers);
            string userName = loginManager.CheckSession(session);
            Logger.Log("Username: " + userName);
            if (userName =="") return new List<DocuModel>();

            //Devolver el chat ordenado de las últimas 500 lineas
            DocsManager docsManager = new DocsManager();
            return docsManager.GetData(session);
        }       

        private string GetCallUserHeader(IHeaderDictionary headers)
        {
            foreach (KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues> pair in headers)
            {
                Logger.Log("Header " + pair.Key);
                if (pair.Key.ToUpper() == "USUARIO")
                    foreach (string singleValue in pair.Value)
                    {
                        Logger.Log("Header Usuario: " + singleValue);
                        return singleValue;
                    }
            }
            return "";
        }
    }
}
