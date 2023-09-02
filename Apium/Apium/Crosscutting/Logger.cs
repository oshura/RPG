using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Apium
{
    public class Logger
    {
        public static string FILE = "C:\\temp\\Detector.txt";
        
        public static void Log(string Text)
        {
            if (System.IO.File.Exists(FILE))
            {
                int attemtsLeft = 3;
                while(attemtsLeft-- > 0)
                {
                    if (SaveLog(Text)) break;
                }

            }
        }

        private static bool SaveLog(string Text)
        {
            try
            {
                System.IO.File.AppendAllText(FILE, DateTime.Now.ToString() + ": " + Text + "\r\n");
                return true;
            }
            catch 
            {
                System.Threading.Thread.Sleep(100);
            }
            return false;
        }
    }
}
