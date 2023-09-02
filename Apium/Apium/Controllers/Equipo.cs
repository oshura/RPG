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
    public class Equipo : ControllerBase
    {
        // GET api/<Chat>
        [HttpGet()]
        public EquipoModel Get()
        {
            Logger.Log("Call to GET /Equipo");
            EquipoModel Result = new EquipoModel();

            LoginManager loginManager = new LoginManager();
            string session = GetCallUserHeader(Request.Headers);
            string userName = loginManager.CheckSession(session);
            Logger.Log("Username: " + userName);
            if (userName =="") return Result;

            //Devolver el chat ordenado de las últimas 500 lineas
            EquipoManager equipoManager = new EquipoManager();            
            Result.ImagePath = equipoManager.GetData(session);

            return Result;
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
