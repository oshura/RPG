using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apium
{
    public class BaseManager
    {
        protected MySQLConn Connection;

        public BaseManager()
        {
            Connection = new MySQLConn();
        }

        ~BaseManager()
        {
            Logger.Log("Destroying manager");
        }
    }
}
