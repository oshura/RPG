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
    public class Chat : ControllerBase
    {
        // GET api/<Chat>
        [HttpGet()]
        public IEnumerable<LineModel> Get()
        {
            Logger.Log("Call to GET /Chat");
            LoginManager loginManager = new LoginManager();
            string userName = loginManager.CheckSession(GetCallUserHeader(Request.Headers));
            Logger.Log("Username: " + userName);
            if (userName =="") return new List<LineModel>();

            //Devolver el chat ordenado de las últimas 500 lineas
            ChatManager chatManager = new ChatManager();
            IEnumerable<LineModel> result = chatManager.GetLastLines();
            GC.Collect();
            return result;
        }       

        // GET api/<Chat>/5
        [HttpGet("{id}")]
        public IEnumerable<LineModel> Get(int id)
        {
            Logger.Log("Call to GET /Chat/id");
            LoginManager loginManager = new LoginManager();
            string userName = loginManager.CheckSession(GetCallUserHeader(Request.Headers));
            Logger.Log("Username: " + userName);
            if (userName == "") return new List<LineModel>();

            //Devolver el chat ordenado de las lineas cuyo id sea superior al parametro
            ChatManager chatManager = new ChatManager();
            IEnumerable<LineModel> result = chatManager.GetLaterLines(id);
            GC.Collect();
            return result;
        }

        // POST api/<Chat>
        [HttpPost]
        public void Post([FromBody] LineModel value)
        {
            Logger.Log("Call to POST /Chat");
            LoginManager loginManager = new LoginManager();
            string userName = loginManager.CheckSession(GetCallUserHeader(Request.Headers));
            Logger.Log("Username: " + userName);
            if (userName == "") return;

            //Grabar una linea en el chat
            value.PlayerName = userName;
            value.Date = DateTime.Now;

            ChatManager chatManager = new ChatManager();            
            chatManager.SendLine(value);
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
