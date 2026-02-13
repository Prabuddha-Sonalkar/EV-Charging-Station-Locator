////using System.Text.Json;

////namespace AdminRole.Services
////{
////    public class SpringApiService
////    {
////        private readonly HttpClient _http;
////        private readonly IConfiguration _config;

////        public SpringApiService(HttpClient http, IConfiguration config)
////        {
////            _http = http;
////            _config = config;
////            _http.BaseAddress = new Uri(_config["SpringApi:BaseUrl"]);
////        }

////        public async Task<object> GetPendingStations()
////        {
////            var response = await _http.GetAsync("/api/stations");
////            var json = await response.Content.ReadAsStringAsync();

////            // Filter only PENDING in .NET side
////            var stations = JsonSerializer.Deserialize<List<dynamic>>(json);
////            return stations.Where(s => s.approval_status == "PENDING");
////        }

////        public async Task ApproveStation(int id)
////        {
////            await _http.PutAsync($"/api/admin-actions/approve?stationId={id}", null);
////        }

////        public async Task RejectStation(int id)
////        {
////            await _http.PutAsync($"/api/admin-actions/reject?stationId={id}", null);
////        }
////    }
////}
//using System.Net.Http.Json;

//namespace AdminRole.Services
//{
//    public class SpringApiService
//    {
//        private readonly HttpClient _http;
//        private readonly IConfiguration _config;

//        public SpringApiService(HttpClient http, IConfiguration config)
//        {
//            _http = http;
//            _config = config;

//            // ✅ Base URL of Spring Boot backend
//            _http.BaseAddress = new Uri(_config["SpringApi:BaseUrl"]);
//        }

//        // ✅ Get all PENDING stations from Spring
//        public async Task<IEnumerable<dynamic>> GetPendingStations()
//        {
//            return await _http.GetFromJsonAsync<IEnumerable<dynamic>>("/api/stations/pending");
//        }

//        // ✅ Approve station in Spring
//        public async Task ApproveStation(int id)
//        {
//            await _http.PutAsync($"/api/stations/{id}/approve", null);
//        }

//        // ✅ Reject station in Spring
//        public async Task RejectStation(int id)
//        {
//            await _http.PutAsync($"/api/stations/{id}/reject", null);
//        }
//    }
//}

using System.Net.Http.Json;

namespace AdminRole.Services
{
    public class SpringApiService
    {
        private readonly HttpClient _http;
        private readonly IConfiguration _config;

        public SpringApiService(HttpClient http, IConfiguration config)
        {
            _http = http;
            _config = config;

            // Base URL of Spring Boot backend
            _http.BaseAddress = new Uri(_config["SpringApi:BaseUrl"]);
        }

        // Get all PENDING stations
        public async Task<IEnumerable<dynamic>> GetPendingStations()
        {
            return await _http.GetFromJsonAsync<IEnumerable<dynamic>>("/api/stations/pending");
        }

        // Get ALL stations (PENDING, APPROVED, REJECTED)
        public async Task<IEnumerable<dynamic>> GetAllStations()
        {
            return await _http.GetFromJsonAsync<IEnumerable<dynamic>>("/api/stations/all");
        }

        // Approve station
        public async Task ApproveStation(int id)
        {
            await _http.PutAsync($"/api/stations/{id}/approve", null);
        }

        // Reject station
        public async Task RejectStation(int id)
        {
            await _http.PutAsync($"/api/stations/{id}/reject", null);
        }
    }
}
