using BitirmeAPI.Data;
using BitirmeAPI.Dtos;
using BitirmeAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BitirmeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonDController : ControllerBase
    {
        private readonly BitirmeAPIContext _context;
        public LessonDController(BitirmeAPIContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Lesson>>> Get(int StudentID)
        {
            var lessons = await _context.Lesson
                .Where(c => c.studentID == StudentID)
                .Include(c => c.Note)
                .Include(c=>c.Semester)
                
                .ToListAsync();
            return lessons;


        }
        [HttpGet("Semester")]
        public async Task<ActionResult<List<Semester>>> Get()
        {
            var semesters=await _context.Semester.ToListAsync();
                return semesters;
        }
        //[HttpGet("student")]
        //public async Task<ActionResult<List<Lesson>>> GetStudent(int studentID)
        //{
        //    var lessons = await _context.Lesson
        //        .Where(c => c.studentID == studentID)
        //        .Include(c=>c.Note)
        //        .Include(c=>c.Teacher)

        //        .ToListAsync();
        //    return lessons;


        //}
        [HttpGet("teacherFromLeaderID")]
        public async Task<ActionResult<List<Teacher>>>GetTeacherForLeader(int schoolLeaderID)
        {
            var teachers = await _context.Teacher
                .Where(c => c.schoolLeaderID == schoolLeaderID)
                .Include(c => c.Lesson)
                .ToListAsync();
            return teachers;
        }



        [HttpGet("leaderID")]
        public async Task<ActionResult<List<Student>>> GetStudentForLeader(int schoolLeaderID)
        {
            var students = await _context.Student
                .Where(c => c.schoolLeaderID == schoolLeaderID)
                .Include(c => c.Lesson)
                    .ThenInclude(l => l.Note)
                .Include(c => c.Parent)
                .ToListAsync();

            foreach (var student in students)
            {
                student.Lesson.ForEach(l =>
                {
                    l.Student = null;
                    l.Teacher = null;
                });
            }

            return students;
        }
        





        //[HttpGet("leaderID")]
        //public async Task<ActionResult<List<Student>>> GetStudentForLeader(int schoolLeaderID)
        //{
        //    var students = await _context.Student
        //        .Where(c => c.schoolLeaderID == schoolLeaderID)
        //        .Include(c => c.Lesson)
        //        //.Include(c => c.Parent)
        //        .ThenInclude(c=> c.Note)
        //        .Include(c => c.Parent)
        //        //.Include(c=>c.SchoolLeader)

        //        .ToListAsync();

        //    return students;
        //}
        //[HttpGet("parentID")]
        //public async Task<ActionResult<List<Student>>> GetStudentForParent(int parentID)
        //{
        //    var students = await _context.Student
        //        .Where(c => c.parentID == parentID)
        //        .Include(c => c.Lesson)
        //        .ThenInclude(c => c.Note)                
        //        .Include(c => c.SchoolLeader)


        //        .ToListAsync();

        //    return students;
        //}
        [HttpGet("parentID")]
        public async Task<ActionResult<List<Student>>> GetStudentForParent(int parentID)
        {
            var students = await _context.Student
                .Where(c => c.parentID == parentID)
                .Include(c => c.Lesson)
                    .ThenInclude(l => l.Note)
                .Include(c => c.Lesson)
                    .ThenInclude(l => l.Semester) // Yarıyıl bilgisi eklendi
                .Include(c => c.SchoolLeader)
                .ToListAsync();

            foreach (var student in students)
            {
                student.Lesson.ForEach(l =>
                {
                    l.Student = null;
                    l.Teacher = null;
                });
            }

            return students;
        }




        //[HttpGet("teacherID")]
        //public async Task<ActionResult<List<Lesson>>> GetStudentForTeacher(int teacherID)
        //{
        //    var lessons = await _context.Lesson
        //        .Where(c => c.teacherID == teacherID)                         
        //        .Include(c=>c.Student)
        //      .ToListAsync();
        //    return lessons;
        //}

      


        [HttpGet("teacherID")]
        public async Task<ActionResult<List<Lesson>>> GetStudentForTeacher(int teacherID)
        {
            var lessons = await _context.Lesson
                .Where(c => c.teacherID == teacherID)
                .Include(c => c.Student)
                    .ThenInclude(s => s.Parent)
                .Include(c => c.Note)
                .Include(c=>c.Semester)
                .ToListAsync();

            foreach (var lesson in lessons)
            {
                lesson.Student.Lesson = null;
                lesson.Student.SchoolLeader = null;
               
            }

            return lessons;
        }


        //[HttpPost]
        //public async Task<ActionResult<List<Lesson>>> Create(CreateLessonDto request)
        //{
        //    var newLesson = new Lesson
        //    {
        //        teacherID = request.teacherID,
        //        lessonName = request.lessonName,
        //        semesterID = request.semesterID,
        //        studentID = request.studentID
        //    };

        //    _context.Lesson.Add(newLesson);
        //    await _context.SaveChangesAsync();
        //    return await Get(newLesson.studentID);
        //}
        //[HttpPost]
        //public async Task<ActionResult<List<Lesson>>> Create(CreateLessonDto request)
        //{
        //    var defaultSemesterId = 4; // Otomatik olarak atanacak semesterID değeri

        //    // Öğrencinin mevcut dönemlerini alın
        //    var currentSemesters = await _context.Semester.ToListAsync();

        //    // Eğer öğrencinin mevcut dönemleri arasında defaultSemesterId varsa,
        //    // newLesson'ın semesterID değerini defaultSemesterId olarak ayarlayın;
        //    // aksi takdirde, öğrenciye yeni bir dönem ekleyin ve newLesson'ın semesterID
        //    // değerini bu yeni dönemin ID'si olarak ayarlayın.
        //    var newLesson = new Lesson
        //    {
        //        teacherID = request.teacherID,
        //        lessonName = request.lessonName,
        //        semesterID = currentSemesters.Any(s => s.semesterID == defaultSemesterId)
        //            ? defaultSemesterId
        //            : await CreateNewSemester(defaultSemesterId),
        //        studentID = request.studentID
        //    };

        //    _context.Lesson.Add(newLesson);
        //    await _context.SaveChangesAsync();
        //    return await Get(newLesson.studentID);
        //}

        //// Yeni bir dönem oluşturur ve ID'sini döndürür
        //private async Task<int> CreateNewSemester(int defaultSemesterId)
        //{
        //    var newSemester = new Semester
        //    {
        //        semesterID = defaultSemesterId,
        //        // Diğer semester özelliklerini ayarlayın
        //    };

        //    _context.Semester.Add(newSemester);
        //    await _context.SaveChangesAsync();

        //    return newSemester.semesterID;
        //}
        [HttpPost]
        public async Task<ActionResult<List<Lesson>>> Create(CreateLessonDto request)
        {
            var defaultSemesterId = 4; // Otomatik olarak atanacak semesterID değeri

            // En büyük semesterID değerini alın
            var maxSemesterId = await _context.Semester.MaxAsync(s => s.semesterID);

            // Eğer en büyük semesterID değeri 4'ten büyükse, newLesson'ın semesterID değerini
            // en büyük semesterID'ye ayarlayın; aksi takdirde, defaultSemesterId değerini kullanın.
            var newLesson = new Lesson
            {
                teacherID = request.teacherID,
                lessonName = request.lessonName,
                semesterID = maxSemesterId > defaultSemesterId ? maxSemesterId : defaultSemesterId,
                studentID = request.studentID
            };

            _context.Lesson.Add(newLesson);
            await _context.SaveChangesAsync();
            return await Get(newLesson.studentID);
        }

        //BURDA 2 POST METOTUYLA YAPTIĞIM İŞİ TEK BİR POST METOTUNA DÖNÜŞTÜRDÜM HEMEN ALTINDA!!!!!


        //[HttpPost("semester")]
        //public async Task<ActionResult<Semester>> CreateSemester(Semester semester)
        //{
        //    _context.Semester.Add(semester);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetSemester), new { id = semester.semesterID }, semester);
        //}

        //[HttpPost("increaseClassLevels")]
        //public async Task<IActionResult> IncreaseClassLevels()
        //{
        //    var students = await _context.Student.ToListAsync();

        //    foreach (var student in students)
        //    {
        //        // Öğrencinin sınıf bilgisini kontrol ediyoruz
        //        if (!string.IsNullOrEmpty(student.studentClass))
        //        {
        //            // Sınıf bilgisini parçalayarak sınıf seviyesini ve şube bilgisini ayırıyoruz
        //            var classParts = student.studentClass.Split('/');
        //            if (classParts.Length == 2)
        //            {
        //                var classLevel = int.Parse(classParts[0]);
        //                var classSection = classParts[1];

        //                // Sınıf seviyesini 1 artırıyoruz
        //                classLevel++;

        //                // Güncellenmiş sınıf bilgisini oluşturuyoruz
        //                var updatedClass = $"{classLevel}/{classSection}";

        //                // Öğrencinin sınıf bilgisini güncelliyoruz
        //                student.studentClass = updatedClass;
        //            }
        //        }
        //    }

        //    // Değişiklikleri veritabanına kaydediyoruz
        //    await _context.SaveChangesAsync();

        //    return Ok();
        //}
        [HttpPost("createSemesterAndIncreaseClassLevels")]
        public async Task<IActionResult> CreateSemesterAndIncreaseClassLevels(Semester request)
        {
            // Yeni semester oluşturma işlemi
            var semester = new Semester
            {
                semesterName = request.semesterName,
                // Diğer semester özelliklerini doldurun
            };

            _context.Semester.Add(semester);

            // Öğrencilerin sınıf seviyelerini artırma işlemi
            var students = await _context.Student.ToListAsync();

            foreach (var student in students)
            {
                if (!string.IsNullOrEmpty(student.studentClass))
                {
                    var classParts = student.studentClass.Split('/');
                    if (classParts.Length == 2)
                    {
                        var classLevel = int.Parse(classParts[0]);
                        var classSection = classParts[1];
                        classLevel++;
                        var updatedClass = $"{classLevel}/{classSection}";
                        student.studentClass = updatedClass;
                    }
                }
            }

            await _context.SaveChangesAsync();

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSemester), new { id = semester.semesterID }, semester);
        }



        [HttpGet("semester/{id}")]
        public async Task<ActionResult<Semester>> GetSemester(int id)
        {
            var semester = await _context.Semester.FindAsync(id);
            if (semester == null)
                return NotFound();

            return semester;
        }




        [HttpPost("note")]
        public async Task<ActionResult<Note>> AddOrUpdateNote(CreateNotDto request)
        {
            var lesson = await _context.Lesson.FindAsync(request.lessonID);
            if (lesson == null)
                return NotFound();

            var existingNote = await _context.Note.FirstOrDefaultAsync(n => n.lessonID == request.lessonID);
            if (existingNote != null)
            {
                existingNote.note1 = request.note1;
                existingNote.note2 = request.note2;
                existingNote.note3 = request.note3;
                existingNote.note4 = request.note4;
            }
            else
            {
                var newNote = new Note
                {
                    note1 = request.note1,
                    note2 = request.note2,
                    note3 = request.note3,
                    note4 = request.note4,
                    Lesson = lesson
                };

                _context.Note.Add(newNote);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }



    }
}
