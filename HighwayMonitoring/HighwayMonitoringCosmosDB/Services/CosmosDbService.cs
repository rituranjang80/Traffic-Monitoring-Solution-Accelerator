using HighwayMonitoringCosmosDB.Models;
using Microsoft.Azure.Cosmos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HighwayMonitoringCosmosDB.Services
{
    public class CosmosDbService : ICosmosDbService
    {
        private Container _container;

        public CosmosDbService(
            CosmosClient cosmosDbClient,
            string databaseName,
            string containerName)
        {
            _container = cosmosDbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddAsync(Vehicletrend item)
        {
            await _container.CreateItemAsync(item, new PartitionKey(item.Id));
        }

        public async Task DeleteAsync(string id)
        {
            await _container.DeleteItemAsync<Vehicletrend>(id, new PartitionKey(id));
        }

        public async Task<Vehicletrend> GetAsync(string id)
        {
            try
            {
                var response = await _container.ReadItemAsync<Vehicletrend>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException) //For handling item not found and other exceptions
            {
                return null;
            }
        }

        public async Task<IEnumerable<Vehicletrend>> GetMultipleAsync(string queryString)
        {
            var query = _container.GetItemQueryIterator<Vehicletrend>(new QueryDefinition(queryString));

            var results = new List<Vehicletrend>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task UpdateAsync(string id, Vehicletrend item)
        {
            await _container.UpsertItemAsync(item, new PartitionKey(id));
        }
    }

    public class CosmosDbServiceLive : ICosmosDbServiceLive
    {
        private Container _container;

        public CosmosDbServiceLive(
            CosmosClient cosmosDbClient,
            string databaseName,
            string containerName)
        {
            _container = cosmosDbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddAsync(Vehicletrend item)
        {
            await _container.CreateItemAsync(item, new PartitionKey(item.Id));
        }

        public async Task DeleteAsync(string id)
        {
            await _container.DeleteItemAsync<Vehicletrend>(id, new PartitionKey(id));
        }

        public async Task<Vehicletrend> GetAsync(string id)
        {
            try
            {
                var response = await _container.ReadItemAsync<Vehicletrend>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException) //For handling item not found and other exceptions
            {
                return null;
            }
        }

        public async Task<IEnumerable<VehicleTrendingLive>> GetMultipleAsync(string queryString)
        {
            var query = _container.GetItemQueryIterator<VehicleTrendingLive>(new QueryDefinition(queryString));

            var results = new List<VehicleTrendingLive>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task UpdateAsync(string id, Vehicletrend item)
        {
            await _container.UpsertItemAsync(item, new PartitionKey(id));
        }
    }


    public class CosmosDbServiceLiveAccidennt : ICosmosDbServiceLiveAccidennt
    {
        private Container _container;

        public CosmosDbServiceLiveAccidennt(
            CosmosClient cosmosDbClient,
            string databaseName,
            string containerName)
        {
            _container = cosmosDbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddAsync(VehicleAccidentLive item)
        {
            await _container.CreateItemAsync(item, new PartitionKey(item.Id));
        }

        public async Task DeleteAsync(string id)
        {
            await _container.DeleteItemAsync<VehicleAccidentLive>(id, new PartitionKey(id));
        }

        public async Task<VehicleAccidentLive> GetAsync(string id)
        {
            try
            {
                var response = await _container.ReadItemAsync<VehicleAccidentLive>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException) //For handling item not found and other exceptions
            {
                return null;
            }
        }

        public async Task<IEnumerable<VehicleAccidentLive>> GetMultipleAsync(string queryString)
        {
            var query = _container.GetItemQueryIterator<VehicleAccidentLive>(new QueryDefinition(queryString));

            var results = new List<VehicleAccidentLive>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task UpdateAsync(string id, Vehicletrend item)
        {
            await _container.UpsertItemAsync(item, new PartitionKey(id));
        }
    }
}
