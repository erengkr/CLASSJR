using BitirmeAPI.Dtos;
using BitirmeAPI.Model;
using BitirmeAPI.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BitirmeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolLeadersController : ControllerBase
    {
        private readonly ILeaderRepo _leaderRepo;
        public SchoolLeadersController(ILeaderRepo leaderRepo)
        {
            this._leaderRepo = leaderRepo;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SchoolLeader>>> GetLesson()
        {
            var schoolLeader = await _leaderRepo.GetAll();
            return Ok(schoolLeader);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<SchoolLeader>> GetLesson(int id)
        {
            var schoolLeader = await _leaderRepo.Get(id);
            if (schoolLeader == null)
            {
                return NotFound();
            }
            return Ok(schoolLeader);
        }
        [HttpPost]
        public async Task<ActionResult> CreateSchoolLeader(CreateSchoolLeaderDto createSchoolLeaderDto)
        {
            SchoolLeader schoolLeader = new SchoolLeader();
            schoolLeader.schoolName = createSchoolLeaderDto.schoolName;
            schoolLeader.schoolLeaderName = createSchoolLeaderDto.schoolLeaderName;
            schoolLeader.schoolLeaderSurname = createSchoolLeaderDto.schoolLeaderSurname;
            schoolLeader.schoolLeaderMail = createSchoolLeaderDto.schoolLeaderMail;
            schoolLeader.schoolLeaderPassword = createSchoolLeaderDto.schoolLeaderPassword;
            
            await _leaderRepo.Add(schoolLeader);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSchoolLeader(int id)
        {

            return NoContent();
        }
    }
}
