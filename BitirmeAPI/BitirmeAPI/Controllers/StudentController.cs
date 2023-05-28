using BitirmeAPI.Data;
using BitirmeAPI.Dtos;
using BitirmeAPI.Helpers;
using BitirmeAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace BitirmeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly BitirmeAPIContext _authContext;
        public StudentController(BitirmeAPIContext bitirmeAPIContext)
        {
            _authContext = bitirmeAPIContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Student studentObj)
        {
            if (studentObj == null)
                return BadRequest();

            var student = await _authContext.Student.FirstOrDefaultAsync(x =>
            x.studentNo == studentObj.studentNo);
            if (student == null)
                return NotFound(new { Message = "Öğrenci bulunamadı !!!" });

            if (!PasswordHasher.VerifyPassword(studentObj.studentPassword, student.studentPassword))
            {
                return BadRequest(new { Message = "Şifre Yanlış" });
            }
            student.token = CreateJwt(student);

            return Ok(new
            {
                token = student.token,
                student.studentID,
                student.studentName,
                student.studentSurname,
                student.studentPassword,
                student.Lesson,
                Message = "Login Success"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterStudent([FromBody] Student studentObj)
        {
            if (studentObj == null)
                return BadRequest();

            ////Check username
            if (await CheckUserNameExistAsync(studentObj.studentNo))
                return BadRequest(new { Message = "Username already exist" });

            //Check Password Strength
            var password = CheckPasswordStrength(studentObj.studentPassword);
            if (!string.IsNullOrEmpty(password))
                return BadRequest(new { Message = password.ToString() });           
            studentObj.studentPassword = PasswordHasher.HashPassword(studentObj.studentPassword);
            studentObj.role = "Student";
            studentObj.token = "";
            await _authContext.Student.AddAsync(studentObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "Öğrenci Kaydı başarılı"
            });
        }
    


        private Task<bool> CheckUserNameExistAsync(string username)
            => _authContext.Student.AnyAsync(x => x.studentName == username);

        //private string CheckPasswordStrength(string password)
        //{
        //    StringBuilder sb = new StringBuilder();
        //    if (password.Length < 8)
        //        sb.Append("Minimum password length should be 8" + Environment.NewLine);
        //    if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
        //        && Regex.IsMatch(password, "[0-9]")))
        //        sb.Append("Password should be Alphanumeric" + Environment.NewLine);
        //    if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,#,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,´,-,=]"))
        //        sb.Append("Password shopud be contain special chars" + Environment.NewLine);
        //    return sb.ToString();

        //}
        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 11)
                sb.Append("Minimum password length should be 11" + Environment.NewLine);
            if (!Regex.IsMatch(password, "^[0-9]+$"))
                sb.Append("Password should consist of numeric values only" + Environment.NewLine);
            return sb.ToString();
        }

        private string CreateJwt(Student student)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,student.role),
                new Claim(ClaimTypes.Name,$"{student.studentName} {student.studentSurname}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(100),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<Student>> GetAllStudent()
        {
            return Ok(await _authContext.Student.ToListAsync());
        }
     



    }
}
