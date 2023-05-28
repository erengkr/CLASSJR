using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BitirmeAPI.Data;
using BitirmeAPI.Model;
using BitirmeAPI.Repos;
using BitirmeAPI.Dtos;

namespace BitirmeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonsController : ControllerBase
    {
        private readonly ILessonRepo _lessonRepo;
        public LessonsController(ILessonRepo lessonRepo)
        {
         this._lessonRepo = lessonRepo;
        }        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lesson>>>GetLesson()
        {
            var lesson = await _lessonRepo.GetAll();
            return Ok(lesson);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Lesson>>GetLesson(int id)
        {
            var lesson=await _lessonRepo.Get(id);
            if(lesson==null)
            {
                return NotFound();
            }
            return Ok(lesson);
        }    
        [HttpPost]
        public async Task<ActionResult> CreateLesson(CreateLessonDto createLessonDto)
        {
            Lesson lesson = new Lesson();
            lesson.lessonName = createLessonDto.lessonName;
            await _lessonRepo.Add(lesson);
            return Ok();
        }       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLesson(int id)
        {

            return NoContent();
        }
    }
}
