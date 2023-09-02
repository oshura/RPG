using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apium
{
    public class LoginModel
    {
        public string? uuid { get; set; }
        public string Partida{ get; set; }
        public string User { get; set; }
    }

    public class LoginResultModel
    {
        public string Token { get; set; }
    }
}
