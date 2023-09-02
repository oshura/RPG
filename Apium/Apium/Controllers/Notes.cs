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
    public class Notes : ControllerBase
    {
        // GET api/<notes>
        [HttpGet()]
        public NotesModel Get()
        {
            NotesModel result = new NotesModel();
            Logger.Log("Call to GET /Notes");
            LoginManager loginManager = new LoginManager();
            string session = GetCallUserHeader(Request.Headers);
            string userName = loginManager.CheckSession(GetCallUserHeader(Request.Headers));
            Logger.Log("Username: " + userName);
            if (userName == "") return result;

            //Devolver el chat ordenado de las últimas 500 lineas
            NotesManager notesManager = new NotesManager();
            result.Text = notesManager.GetNotes(session);
            return result;
        }       

        // POST api/<notes>
        [HttpPost]
        public void Post([FromBody] NotesModel value)
        {
            Logger.Log("Call to GET /Notes");
            LoginManager loginManager = new LoginManager();
            string session = GetCallUserHeader(Request.Headers);
            string userName = loginManager.CheckSession(GetCallUserHeader(Request.Headers));
            Logger.Log("Username: " + userName);
            if (userName == "") return;

            //Devolver el chat ordenado de las últimas 500 lineas
            NotesManager notesManager = new NotesManager();
            notesManager.SetNotes(session, value.Text);
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
