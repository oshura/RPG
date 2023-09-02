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
    public class NotesManager : BaseManager
    { 

        public string GetNotes(string uuid)
        {
            MySqlParameter Parameter;

            MySqlCommand Command = Connection.GetCommand("SELECT USR.notas FROM sessions SES INNER JOIN users_partida USR ON (SES.userid = USR.userid) WHERE SES.session = @uuid");
            Parameter = new MySqlParameter("uuid", MySqlDbType.VarChar);
            Parameter.Value = uuid;
            Command.Parameters.Add(Parameter);

            MySqlDataReader reader = Command.ExecuteReader();
            try
            {
                if (reader.Read())
                {
                    byte[] byteArray = new byte[5000];
                    int readed = (int)reader.GetBytes(0, 0, byteArray, 0, 5000);
                    return System.Text.Encoding.UTF8.GetString(byteArray, 0, readed);
                }
            }
            finally
            {
                reader.Close();
            }

            return "";
        }

        public void SetNotes(string uuid, string notas)
        {
            MySqlParameter Parameter;

            MySqlCommand Command = Connection.GetCommand("UPDATE users_partida USR INNER JOIN sessions SES ON (SES.userid = USR.userid) SET USR.notas = @notas WHERE SES.session = @uuid");
            Parameter = new MySqlParameter("notas", MySqlDbType.Blob);
            Parameter.Value = notas;
            Command.Parameters.Add(Parameter);
            Parameter = new MySqlParameter("uuid", MySqlDbType.VarChar);
            Parameter.Value = uuid;
            Command.Parameters.Add(Parameter);

            int affectedRows = Command.ExecuteNonQuery();

            Logger.Log("SetNotes affected Row: " + affectedRows.ToString());
        }
    }
}
