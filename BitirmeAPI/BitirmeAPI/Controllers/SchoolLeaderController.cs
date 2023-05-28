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
    public class SchoolLeaderController : ControllerBase
    {
        private readonly BitirmeAPIContext _authContext;
        public SchoolLeaderController(BitirmeAPIContext bitirmeAPIContext)
        {
            _authContext = bitirmeAPIContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] SchoolLeader leaderObj)
        {
            if (leaderObj == null)
                return BadRequest();

            var schoolLeader = await _authContext.SchoolLeader.FirstOrDefaultAsync(x =>
            x.schoolLeaderMail == leaderObj.schoolLeaderMail );

            if (schoolLeader == null)
                return NotFound(new { Message = "Okul Lideri bulunamadı !!!" });

            if (!PasswordHasher.VerifyPassword(leaderObj.schoolLeaderPassword, schoolLeader.schoolLeaderPassword))
            {
                return BadRequest(new { Message = "Şifre Yanlış" });
            }
            schoolLeader.token = CreateJwt(schoolLeader);

            return Ok(new
            {
                schoolLeader.schoolLeaderID,
                schoolLeader.schoolLeaderName,
                schoolLeader.schoolLeaderSurname,
                schoolLeader.schoolLeaderMail,
                schoolLeader.schoolName,
                token = schoolLeader.token,
                Message = "Login Success"
            });
        } 

        [HttpPost("register")]
        public async Task<IActionResult> RegisterLeader([FromBody] SchoolLeader leaderObj)
        {
            if (leaderObj == null)
                return BadRequest();
            //Check Email
            if (await CheckUserNameExistAsync(leaderObj.schoolLeaderMail))
                return BadRequest(new { Message = "Bu Mail Adresi Zaten kullanılmaktadır!!!" });
            //Check Password Strength
            var password = CheckPasswordStrength(leaderObj.schoolLeaderPassword);
            if (!string.IsNullOrEmpty(password))
                return BadRequest(new { Message = password.ToString() });
            leaderObj.schoolLeaderPassword = PasswordHasher.HashPassword(leaderObj.schoolLeaderPassword);
            leaderObj.role = "SchoolLeader";
            leaderObj.token = "";
            await _authContext.SchoolLeader.AddAsync(leaderObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = " Kayıt Başarılı"
            });
        }
        private Task<bool> CheckUserNameExistAsync(string username)
            => _authContext.SchoolLeader.AnyAsync(x => x.schoolLeaderMail == username);

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

        private string CreateJwt(SchoolLeader schoolLeader)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,schoolLeader.role),
                new Claim(ClaimTypes.Name,$"{schoolLeader.schoolLeaderName} {schoolLeader.schoolLeaderSurname}")
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
        public async Task<ActionResult<SchoolLeader>> GetAllLeaders()
        {
            return Ok(await _authContext.SchoolLeader.ToListAsync());
        }


    }
}

