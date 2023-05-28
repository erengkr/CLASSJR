using BitirmeAPI.Data;
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
    public class TeacherController : ControllerBase
    {
        private readonly BitirmeAPIContext _authContext;
        public TeacherController(BitirmeAPIContext bitirmeAPIContext)
        {
            _authContext = bitirmeAPIContext;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Teacher teacherObj)
        {
            if (teacherObj == null)
                return BadRequest();
            var teacher = await _authContext.Teacher.FirstOrDefaultAsync(x =>
            x.teacherMail == teacherObj.teacherMail);
            if (teacher == null)
                return NotFound(new { Message = "Öğretmen Bulunamadı" });
            if (!PasswordHasher.VerifyPassword(teacherObj.teacherPassword, teacher.teacherPassword))
            {
                return BadRequest(new { Message = "Şifre Yanlış" });
            }
            teacher.token = CreateJwt(teacher);
            return Ok(new
            {
                token=teacher.token,
                teacher.teacherID,
                teacher.teacherSurname,
                teacher.teacherName,
                teacher.teacherPassword,
                teacher.teacherMail,
                Message = "Login Success"
            });
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterTeacher ([FromBody] Teacher teacherObj)
        {
            if (teacherObj == null)
                return BadRequest();

            //Check username
            if (await CheckUserNameExistAsync(teacherObj.teacherMail))
                return BadRequest(new { Message = "Username already exist" });

            //Check Password Strength
            var password = CheckPasswordStrength(teacherObj.teacherPassword);
            if (!string.IsNullOrEmpty(password))
                return BadRequest(new { Message = password.ToString() });

            teacherObj.teacherPassword = PasswordHasher.HashPassword(teacherObj.teacherPassword);
            teacherObj.role = "Teacher";
            teacherObj.token = "";
            await _authContext.Teacher.AddAsync(teacherObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "Öğretmen Kaydı başarılı"
            });
        }
        private Task<bool> CheckUserNameExistAsync(string username)
            => _authContext.Parent.AnyAsync(x => x.parentMail == username);

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
                && Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be Alphanumeric" + Environment.NewLine);
            if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,#,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,´,-,=]"))
                sb.Append("Password shopud be contain special chars" + Environment.NewLine);
            return sb.ToString();

        }
        private string CreateJwt(Teacher teacher)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,teacher.role),
                new Claim(ClaimTypes.Name,$"{teacher.teacherName} {teacher.teacherSurname}")
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
        public async Task<ActionResult<Teacher>> GetAllTeachers()
        {
            return Ok(await _authContext.Teacher.ToListAsync());
        }

    }
}

