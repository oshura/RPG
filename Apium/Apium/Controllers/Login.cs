using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Apium.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Login : ControllerBase
    {
        // GET: api/<login>
        [HttpGet]
        public string Get()
        {
            return "Works!";
        }

        // POST api/<login>
        [HttpPost]
        public LoginResultModel Post([FromBody] LoginModel value)
        {
            LoginResultModel result = new LoginResultModel();
            value.uuid = Guid.NewGuid().ToString();

            Logger.Log("Login try with[ " + value.uuid + " ]: " + value.Partida + "[]" + value.User);
            LoginManager loginManager = new LoginManager();
            result.Token = loginManager.DoLogin(value) ? value.uuid : "";
            Logger.Log("ResultToken[ " + result.Token + " ]");
            return result;
        }        
    }
}
