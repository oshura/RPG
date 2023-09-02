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
    public class DocsManager : BaseManager
    { 
        public IEnumerable<DocuModel> GetData(string uuid)
        {
            MySqlParameter Parameter;
            List<DocuModel> docList = new List<DocuModel>();
            DocuModel docu;

            MySqlCommand Command = Connection.GetCommand("SELECT USR.name, USR.image FROM sessions SES INNER JOIN user_docs USR ON (SES.userid = USR.userid)  WHERE SES.session = @uuid ORDER BY USR.name");
            Parameter = new MySqlParameter("uuid", MySqlDbType.VarChar);
            Parameter.Value = uuid;
            Command.Parameters.Add(Parameter);

            MySqlDataReader reader = Command.ExecuteReader();

            while (reader.Read())
            {
                docu = new DocuModel();
                docu.Name = reader[0].ToString();
                docu.ImagePath = reader[1].ToString();
                docList.Add(docu);
            }
            reader.Close();

            return docList;
        }
    }
}
