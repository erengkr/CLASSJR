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
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepo _studentRepo;
        public StudentsController(IStudentRepo studentRepo)
        {
            this._studentRepo = studentRepo;
        }       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>>GetStudent()
        {
            var student = await _studentRepo.GetAll();
            return Ok(student);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>>GetStudent(int id)
            {
            var student = await _studentRepo.Get(id);
            if(student==null)
            {
                return NotFound();
            }
            return Ok(student);
        }
        

        [HttpPost]
        public async Task<ActionResult>CreateStudent(CreateStudentDto createStudentDto)
        {
            Student student = new Student();
            student.studentName = createStudentDto.studentName;
            student.studentSurname = createStudentDto.studentSurname;
            student.studentPassword=createStudentDto.studentPassword;
            student.studentClass = createStudentDto.studentClass;
            await _studentRepo.Add(student);
            return Ok();
        }        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            await _studentRepo.Delete(id);
            return NoContent();
        }
        [HttpPut("id")]
        public async Task<ActionResult>UpdateStudent(int studentID,UpdateStudentDto updateStudentDto)
        {
            Student student = new Student();
            student.studentID = studentID;
            student.studentName = updateStudentDto.studentName;
            student.studentSurname = updateStudentDto.studentSurname;
            student.studentPassword = updateStudentDto.studentPassword;
            student.studentClass = updateStudentDto.studentClass;
            await _studentRepo.Update(student);
            return Ok();
        }
    }
}
