using HighwayMonitoring_BAL.Service;
using HighwayMonitoring_DAL.Data;
using HighwayMonitoring_DAL.Interface;
using HighwayMonitoring_DAL.Models;
using HighwayMonitoring_DAL.Modelss;
using HighwayMonitoring_DAL.Repository;
using HighwayMonitoringCosmosDB.Services;
using HighwayMonitoringWebAPI.middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighwayMonitoringWebAPI
{
    public class Startup
    {
        private readonly IConfiguration _configuration;


        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        private readonly string _policyName = "CorsPolicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(opt =>
            {
                opt.AddPolicy(name: _policyName, builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));

            
            services.AddSingleton<ICosmosDbService>(InitializeCosmosClientInstanceAsync(_configuration.GetSection("CosmosDb"), "VehicleTrending").GetAwaiter().GetResult());
            services.AddSingleton<ICosmosDbServiceAccident>(InitializeCosmosClientInstanceAsync2(_configuration.GetSection("CosmosDb"), "VehicleMonitering").GetAwaiter().GetResult());
            services.AddSingleton<ICosmosDbServiceLive>(InitializeCosmosICosmosDbServiceLive(_configuration.GetSection("CosmosDb"), "VehicleTrendingLive").GetAwaiter().GetResult());
            
            services.AddSingleton<ICosmosDbServiceLiveAccidennt>(InitializeICosmosDbServiceLiveAccidennt(_configuration.GetSection("CosmosDb"), "VehicleAccidentLive").GetAwaiter().GetResult());




            services.AddControllers();
            services.AddHttpClient();
            services.AddTransient<IRepository<Person>, RepositoryPerson>();
            services.AddTransient<PersonService, PersonService>();

            services.AddTransient<IRepository<CameraDetails>, RepositoryCameraDetail>();
            services.AddTransient<CameraService, CameraService>();


            services.AddTransient<IRepository<VideoDetails>, RepositoryVideoDetail>();
            services.AddTransient<VideoService, VideoService>();


            services.AddTransient<IRepository<GROUP_AUTHORIZATION>, RepositoryGroupAuthorization>();
            services.AddTransient<GroupAuthorizationervice, GroupAuthorizationervice>();


            services.AddTransient<IRepository<USERS>, RepositoryUser>();
            services.AddTransient<UserService, UserService>();

            services.AddTransient<IRepository<USCity>, RepositoryUSCity>();
            services.AddTransient<USCityervice, USCityervice>();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "HighwayMonitoringWebAPI", Version = "v1" });
            });



        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //  if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "HighwayMonitoringWebAPI v1"));
            }

            app.UseHttpsRedirection();
            app.UseDeveloperExceptionPage();
            app.UseRouting();
            app.UseCors(_policyName);
            app.UseAuthorization();
            //app.UseMiddleware<AuthenticationMiddleware>();
            //app.UseWhen(x => (x.Request.Path.StartsWithSegments("/api", StringComparison.OrdinalIgnoreCase)),
            //builder =>
            //{
            //    builder.UseMiddleware<AuthenticationMiddleware>();
            //});
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
        /// <summary>
        /// Creates a Cosmos DB database and a container with the specified partition key. 
        /// </summary>
        /// <returns></returns>
        private static async Task<CosmosDbService> InitializeCosmosClientInstanceAsync(IConfigurationSection configurationSection, string containerName)
        {
            var databaseName = configurationSection["DatabaseName"];
            //var containerName = configurationSection["ContainerName"];
            var account = configurationSection["Account"];
            var key = configurationSection["Key"];
            var client = new Microsoft.Azure.Cosmos.CosmosClient(account, key);
            var database = await client.CreateDatabaseIfNotExistsAsync(databaseName);
            await database.Database.CreateContainerIfNotExistsAsync(containerName, "/id");
            var cosmosDbService = new CosmosDbService(client, databaseName, containerName);
            return cosmosDbService;
        }

        private static async Task<CosmosDbServiceLive> InitializeCosmosICosmosDbServiceLive(IConfigurationSection configurationSection, string containerName)
        {
            var databaseName = configurationSection["DatabaseName"];
            //var containerName = configurationSection["ContainerName"];
            var account = configurationSection["Account"];
            var key = configurationSection["Key"];
            var client = new Microsoft.Azure.Cosmos.CosmosClient(account, key);
            var database = await client.CreateDatabaseIfNotExistsAsync(databaseName);
            await database.Database.CreateContainerIfNotExistsAsync(containerName, "/id");
            var cosmosDbService = new CosmosDbServiceLive(client, databaseName, containerName);
            return cosmosDbService;
        }


        private static async Task<ICosmosDbServiceLiveAccidennt> InitializeICosmosDbServiceLiveAccidennt(IConfigurationSection configurationSection, string containerName)
        {
            var databaseName = configurationSection["DatabaseName"];
            //var containerName = configurationSection["ContainerName"];
            var account = configurationSection["Account"];
            var key = configurationSection["Key"];
            var client = new Microsoft.Azure.Cosmos.CosmosClient(account, key);
            var database = await client.CreateDatabaseIfNotExistsAsync(databaseName);
            await database.Database.CreateContainerIfNotExistsAsync(containerName, "/id");
            var cosmosDbService = new CosmosDbServiceLiveAccidennt(client, databaseName, containerName);
            return cosmosDbService;
        }

       


        private static async Task<CosmosDbServiceAccident> InitializeCosmosClientInstanceAsync2(IConfigurationSection configurationSection, string containerName)
        {
            var databaseName = configurationSection["DatabaseName"];
            // var containerName = configurationSection["ContainerName"];
            var account = configurationSection["Account"];
            var key = configurationSection["Key"];
            var client = new Microsoft.Azure.Cosmos.CosmosClient(account, key);
            var database = await client.CreateDatabaseIfNotExistsAsync(databaseName);
            await database.Database.CreateContainerIfNotExistsAsync(containerName, "/id");
            var cosmosDbService = new CosmosDbServiceAccident(client, databaseName, containerName);
            return cosmosDbService;
        }


    }
}
