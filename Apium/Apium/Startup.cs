using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Apium
{
    public class Startup
    {
        private const string CORS_POLICY_NAME = "PepelisoCORS";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
#if DEBUG
            services.AddCors(options =>
            {
                options.AddPolicy(name: CORS_POLICY_NAME,
                                  builder =>
                                  {
                                      builder.WithOrigins("*",
                                                          "http://localhost:4200");
                                      builder.AllowAnyHeader();
                                  });
            });
#endif

            services.AddControllers();

            MySQLConn.ConnectionString = Configuration["Data:DefaultConnection:ConnectionString"];
            Logger.FILE = Configuration["Data:LogFile"];
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
#if DEBUG
            app.UseCors(CORS_POLICY_NAME);
#endif

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
