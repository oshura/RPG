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
    public class Story : ControllerBase
    {
        // GET api/<Chat>
        [HttpGet()]
        public IEnumerable<LineModel> Get()
        {
            Logger.Log("Call to GET /Story");
            LoginManager loginManager = new LoginManager();
            string userName = loginManager.CheckSession(GetCallUserHeader(Request.Headers));
            Logger.Log("Username: " + userName);
            if (userName =="") return new List<LineModel>();

            //Devolver el chat ordenado de las últimas 500 lineas
            StoryManager storyManager = new StoryManager();
            GC.Collect();
            return storyManager.GetLastLines();
        }       

        // GET api/<Chat>/5
        [HttpGet("{id}")]
        public IEnumerable<LineModel> Get(int id)
        {
            Logger.Log("Call to GET /Story/id");
            LoginManager loginManager = new LoginManager();
            string userName = loginManager.CheckSession(GetCallUserHeader(Request.Headers));
            Logger.Log("Username: " + userName);
            if (userName == "") return new List<LineModel>();

            //Devolver el chat ordenado de las lineas cuyo id sea superior al parametro
            StoryManager storyManager = new StoryManager();
            GC.Collect();
            return storyManager.GetLaterLines(id);
        }

        // POST api/<Chat>
        [HttpPost]
        public void Post([FromBody] LineModel value)
        {
            Logger.Log("Call to POST /Story");
            LoginManager loginManager = new LoginManager();
            string session = GetCallUserHeader(Request.Headers);
            string userName = loginManager.CheckSession(session);
            Logger.Log("Username: " + userName);
            if (userName == "") return;

            //Grabar una linea en el chat
            value.PlayerName = userName;
            value.Date = DateTime.Now;

            StoryManager storyManager = new StoryManager();
            if (!storyManager.IsLocked(session))
                storyManager.SendLine(value);
        }


        private string GetCallUserHeader(IHeaderDictionary headers)
        {
            foreach (KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues> pair in headers)
                if (pair.Key.ToUpper() == "USUARIO")
                    foreach (string singleValue in pair.Value)
                    {
                        Logger.Log("Header Usuario: " + singleValue);
                        return singleValue;
                    }
            return "";
        }
    }
}
