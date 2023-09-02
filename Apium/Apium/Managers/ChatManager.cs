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
    public class ChatManager: BaseManager
    {
        public void SendLine(LineModel line)
        {
            MySqlParameter Parameter;

            MySqlCommand Command = Connection.GetCommand("INSERT INTO chat (date, username, text) VALUES(@date, @username, @text)");
            Parameter = new MySqlParameter("date", MySqlDbType.DateTime);
            Parameter.Value = line.Date;
            Command.Parameters.Add(Parameter);
            Parameter = new MySqlParameter("username", MySqlDbType.VarChar);
            Parameter.Value = line.PlayerName;
            Command.Parameters.Add(Parameter);
            Parameter = new MySqlParameter("text", MySqlDbType.VarChar);
            Parameter.Value = line.Text;
            Command.Parameters.Add(Parameter);
            
            Command.ExecuteNonQuery();
        }

        public IEnumerable<LineModel> GetLastLines()
        {
            List<LineModel> Result = new List<LineModel>();

            MySqlCommand Command = Connection.GetCommand("SELECT * FROM (SELECT CH.lineid, CH.date, CH.username, CH.text FROM chat CH ORDER BY CH.lineid DESC LIMIT 100) PEPE ORDER BY PEPE.lineid ASC");
            
            MySqlDataReader reader = Command.ExecuteReader();
            try
            {
                LineModel line;
                while (reader.Read())
                {
                    line = new LineModel();
                    line.LineId = (int)reader[0];
                    line.Date = (DateTime)reader[1];
                    line.PlayerName = (string)reader[2];
                    line.Text = (string)reader[3];
                    Result.Add(line);
                }
                return Result;
            }
            finally
            {
                reader.Close();
            }
        }

        public IEnumerable<LineModel> GetLaterLines(int lastid)
        {
            List<LineModel> Result = new List<LineModel>();
            MySqlParameter Parameter;

            MySqlCommand Command = Connection.GetCommand("SELECT CH.lineid, CH.date, CH.username, CH.text FROM chat CH WHERE CH.lineid > @lastid ORDER BY CH.lineid ASC");
            Parameter = new MySqlParameter("lastid", MySqlDbType.Int32);
            Parameter.Value = lastid;
            Command.Parameters.Add(Parameter);

            MySqlDataReader reader = Command.ExecuteReader();
            try
            {
                LineModel line;
                while (reader.Read())
                {
                    line = new LineModel();
                    line.LineId = (int)reader[0];
                    line.Date = (DateTime)reader[1];
                    line.PlayerName = (string)reader[2];
                    line.Text = (string)reader[3];
                    Result.Add(line);
                }
                return Result;
            }
            finally
            {
                reader.Close();
            }
        }

    }
}
