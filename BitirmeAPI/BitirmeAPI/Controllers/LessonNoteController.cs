//using BitirmeAPI.Dtos;
//using BitirmeAPI.Model;
//using BitirmeAPI.Repos;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace BitirmeAPI.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class LessonNoteController : ControllerBase
//    {
//        private readonly IlessonNoteRepo _lessonNoteRepo;
//        public LessonNoteController(IlessonNoteRepo lessonNoteRepo)
//        {
//            _lessonNoteRepo=lessonNoteRepo;
//        }
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<LessonNote>>> GetDersProgrami()
//        {
//            var lessonNote = await _lessonNoteRepo.GetAll();
//            return Ok(lessonNote);
//        }
//        [HttpPost]
//        public async Task<ActionResult> CreateParent(CreateLessonNoteDto createLessonNoteDto)
//        {
//            LessonNote lessonNote = new LessonNote();
//            lessonNote.matematik1 = createLessonNoteDto.matematik1;
//            lessonNote.matematik2 = createLessonNoteDto.matematik2;

//            lessonNote.turkce1 = createLessonNoteDto.turkce1;
//            lessonNote.turkce2 = createLessonNoteDto.turkce2;

//            lessonNote.fen1 = createLessonNoteDto.fen1;
//            lessonNote.fen2 = createLessonNoteDto.fen2;

//            lessonNote.sosyal1 = createLessonNoteDto.sosyal1;
//            lessonNote.sosyal2 = createLessonNoteDto.sosyal2;

//            lessonNote.beden1 = createLessonNoteDto.beden1;
//            lessonNote.beden2 = createLessonNoteDto.beden2;          

//            lessonNote.resim1 = createLessonNoteDto.resim1;
//            lessonNote.resim2 = createLessonNoteDto.resim2;

//            lessonNote.matematikOdev = createLessonNoteDto.matematikOdev;
//            lessonNote.turkceOdev = createLessonNoteDto.turkceOdev;
//            lessonNote.fenOdev = createLessonNoteDto.fenOdev;
//            lessonNote.resimOdev = createLessonNoteDto.resimOdev;
//            lessonNote.bedenOdev = createLessonNoteDto.bedenOdev;
//            lessonNote.sosyalOdev = createLessonNoteDto.sosyalOdev;

//            lessonNote.matematikDers = createLessonNoteDto.matematikDers;
//            lessonNote.turkceDers = createLessonNoteDto.turkceDers;
//            lessonNote.fenDers = createLessonNoteDto.fenDers;
//            lessonNote.resimDers = createLessonNoteDto.resimDers;
//            lessonNote.bedenDers = createLessonNoteDto.bedenDers;
//            lessonNote.sosyalDers = createLessonNoteDto.sosyalDers;






//            await _lessonNoteRepo.Add(lessonNote);
//            return Ok();
//        }
//    }
//}
