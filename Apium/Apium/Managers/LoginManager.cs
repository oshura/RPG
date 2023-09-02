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
    public class LoginManager : BaseManager
    { 
        public bool DoLogin(LoginModel loginModel)
        {
            MySqlParameter Parameter;

            MySqlCommand Command = Connection.GetCommand("INSERT INTO `sessions` (`sessions`.`userid`, `sessions`.`session`) SELECT `users_partida`.`userid`, @uuid FROM `users_partida` WHERE `users_partida`.`partida`=@partida AND `users_partida`.`userlogin`=@user");
            Parameter = new MySqlParameter("uuid", MySqlDbType.VarChar);
            Parameter.Value = loginModel.uuid;
            Command.Parameters.Add(Parameter);
            Parameter = new MySqlParameter("partida", MySqlDbType.VarChar);
            Parameter.Value = loginModel.Partida;
            Command.Parameters.Add(Parameter);
            Parameter = new MySqlParameter("user", MySqlDbType.VarChar);
            Parameter.Value = loginModel.User;
            Command.Parameters.Add(Parameter);
            
            int rows = Command.ExecuteNonQuery();
            return (rows == 1);
        }


        public string CheckSession(string uuid)
        {
            MySqlParameter Parameter;

            MySqlCommand Command = Connection.GetCommand("SELECT USR.user FROM sessions SES INNER JOIN users_partida USR ON (SES.userid = USR.userid) WHERE SES.session = @uuid");
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
