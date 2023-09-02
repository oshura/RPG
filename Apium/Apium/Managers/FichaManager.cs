using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using MySql.Data.MySqlClient;
using System.Data.Common;


namespace Apium
{
    public class FichaManager : BaseManager
    { 
        public string GetData(string uuid)
        {
            MySqlParameter Parameter;

            MySqlCommand Command = Connection.GetCommand("SELECT USR.ficha FROM sessions SES INNER JOIN users_partida USR ON (SES.userid = USR.userid) WHERE SES.session = @uuid");
            Parameter = new MySqlParameter("uuid", MySqlDbType.VarChar);
            Parameter.Value = uuid;
            Command.Parameters.Add(Parameter);

            MySqlDataReader reader = Command.ExecuteReader();

            if (reader.Read())
            {
                string result = reader[0].ToString();
                reader.Close();
                return result;
            }

            return "";
        }
    }
}
