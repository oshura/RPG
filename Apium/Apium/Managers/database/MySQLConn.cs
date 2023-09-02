using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using MySql.Data.MySqlClient;


namespace Apium
{
    
    public class MySQLConn : IDisposable
    {

        public static string ConnectionString;

        private bool closed = true;
        /// <summary>  
        /// OdbcConnection : This is the connection  
        /// </summary>  
        MySqlConnection Connection;
        /// <summary>  
        /// OdbcCommand : This is the command  
        /// </summary>  
        MySqlCommand Command;
        /// <summary>  
        /// Constructor: This is the constructor  
        /// </summary>  
        /// <param name="DataSourceName">string: This is the data source name</param>  
        public MySQLConn()
        {
            Logger.Log("Connection try with[ " + ConnectionString + " ]");
            Console.WriteLine("Connection try with[ " + ConnectionString + " ]");
            //Instantiate the connection  
            Connection = new MySqlConnection(ConnectionString);
            

            try
            {
                //Open the connection  
                Connection.Open();
                closed = false;
            }
            catch (Exception caught)
            {
                Console.WriteLine(caught.Message);
                Console.Read();
            }
        }
        /// <summary>  
        /// void: It is used to close the connection if you work within disconnected  
        /// mode  
        /// </summary  
        public void CloseConnection()
        {
            closed = true;
            Connection.Close();
        }
        /// <summary>  
        /// OdbcCommand: This function returns a valid odbc connection  
        /// </summary>  
        /// <param name="Query">string: This is the SQL query</param>  
        /// <returns></returns>  
        public MySqlCommand GetCommand(string Query)
        {
            Command = new MySqlCommand();
            Command.Connection = Connection;
            Command.CommandText = Query;
            return Command;
        }
        /// <summary>  
        /// void: This method close the actual connection  
        /// </summary>  
        public void Dispose()
        {
            Logger.Log("Closing connection");
            Connection.Close();
            
        }
    }
    
}
