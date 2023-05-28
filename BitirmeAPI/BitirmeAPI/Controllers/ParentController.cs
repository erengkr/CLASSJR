using BitirmeAPI.Data;
using BitirmeAPI.Helpers;
using BitirmeAPI.Model;
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
    public class ParentController : ControllerBase
    {
        private readonly BitirmeAPIContext _authContext;
        public ParentController( BitirmeAPIContext bitirmeAPIContext)
        {
            _authContext = bitirmeAPIContext;
        }
        [HttpPost("authenticate")]
            public async Task<IActionResult> Authenticate([FromBody] Parent parentObj)
            {
            if (parentObj == null)
                return BadRequest();
            var parent = await _authContext.Parent.FirstOrDefaultAsync(x =>
            x.parentMail == parentObj.parentMail);
            if (parent == null)
                return NotFound(new { Message = "Veli Bulunamadı" });
            if(!PasswordHasher.VerifyPassword(parentObj.parentPassword,parent.parentPassword))
            {
                return BadRequest(new { Message = "Şifre Yanlış" });
            }
            parent.token = CreateJwt(parent);
            return Ok(new
            {
                token=parent.token,
                parent.parentID,
                parent.parentName,
                parent.parentSurname,
                parent.parentMail,
                Message = "Login Success"
            });
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterStudent([FromBody] Parent parentObj)
        {
            if (parentObj == null)
                return BadRequest();

            //Check username
            if (await CheckUserNameExistAsync(parentObj.parentMail))
                return BadRequest(new { Message = "Username already exist" });

            //Check Password Strength
            var password = CheckPasswordStrength(parentObj.parentPassword);
            if (!string.IsNullOrEmpty(password))
                return BadRequest(new { Message = password.ToString() });

            parentObj.parentPassword = PasswordHasher.HashPassword(parentObj.parentPassword);
            parentObj.role = "Parent";
            parentObj.token = "";
            await _authContext.Parent.AddAsync(parentObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "Veli Kaydı başarılı"
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
        private string CreateJwt(Parent parent)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,parent.role),
                new Claim(ClaimTypes.Name,$"{parent.parentName} {parent.parentSurname}")
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

    }
}
