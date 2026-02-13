////using AdminRole.Services;
////using Microsoft.AspNetCore.Authorization;
////using Microsoft.AspNetCore.Mvc;

////namespace AdminRole.Controllers
////{
////    [ApiController]
////    [Route("api/admin/stations")]
////    [Authorize]
////    public class AdminStationsController : ControllerBase
////    {
////        private readonly SpringApiService _spring;

////        public AdminStationsController(SpringApiService spring)
////        {
////            _spring = spring;
////        }

////        [HttpGet("pending")]
////        public async Task<IActionResult> GetPendingStations()
////        {
////            var result = await _spring.GetPendingStations();
////            return Ok(result);
////        }

////        [HttpPut("{id}/approve")]
////        public async Task<IActionResult> Approve(int id)
////        {
////            await _spring.ApproveStation(id);
////            return Ok();
////        }

////        [HttpPut("{id}/reject")]
////        public async Task<IActionResult> Reject(int id)
////        {
////            await _spring.RejectStation(id);
////            return Ok();
////        }
////    }
////}


//using AdminRole.Services;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Authorization;

//namespace AdminRole.Controllers
//{
//    [ApiController]
//    [Route("api/admin/stations")]
//    [Authorize]
//    public class AdminStationsController : ControllerBase
//    {
//        private readonly SpringApiService _spring;

//        public AdminStationsController(SpringApiService spring)
//        {
//            _spring = spring;
//        }

//        [HttpGet("pending")]
//        public async Task<IActionResult> Pending()
//        {
//            var data = await _spring.GetPendingStations();
//            return Ok(data);
//        }

//        [HttpPut("{id}/approve")]
//        public async Task<IActionResult> Approve(int id)
//        {
//            await _spring.ApproveStation(id);
//            return Ok();
//        }

//        [HttpPut("{id}/reject")]
//        public async Task<IActionResult> Reject(int id)
//        {
//            await _spring.RejectStation(id);
//            return Ok();
//        }
//    }
//}

using AdminRole.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace AdminRole.Controllers
{
    [ApiController]
    [Route("api/admin/stations")]
    [Authorize]
    public class AdminStationsController : ControllerBase
    {
        private readonly SpringApiService _spring;

        public AdminStationsController(SpringApiService spring)
        {
            _spring = spring;
        }

        // GET: api/admin/stations/pending
        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingStations()
        {
            var data = await _spring.GetPendingStations();
            return Ok(data);
        }

        // GET: api/admin/stations/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllStations()
        {
            var data = await _spring.GetAllStations();
            return Ok(data);
        }

        // PUT: api/admin/stations/{id}/approve
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> Approve(int id)
        {
            await _spring.ApproveStation(id);
            return Ok();        
        }

        // PUT: api/admin/stations/{id}/reject
        [HttpPut("{id}/reject")]
        public async Task<IActionResult> Reject(int id)
        {
            await _spring.RejectStation(id);
            return Ok();
        }
    }
}

