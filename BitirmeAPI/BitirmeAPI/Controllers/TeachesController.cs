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
using BitirmeAPI.Helpers;
using System.Text;
using System.Text.RegularExpressions;

namespace BitirmeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachesController : ControllerBase
    {
        private readonly ITeacheRepo _teacheRepo;
        public TeachesController(ITeacheRepo teacheRepo)
        {
            this._teacheRepo = teacheRepo;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teache>>> GetParent()
        {
            var teache = await _teacheRepo.GetAll();
            return Ok(teache);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Teache>> GetTeache(int id)
        {
            var teache = await _teacheRepo.Get(id);
            if(teache==null)
            {
                return NotFound();
            }
            return Ok(teache);
        }
        [HttpPost]
        public async Task<ActionResult>CreateTeache(CreateTeacheDto createTeacheDto)
        {
            Teache teache = new Teache();
            teache.teacheName=createTeacheDto.teacheName;
            teache.teacheSurname = createTeacheDto.teacheSurname;
            teache.teacheMail = createTeacheDto.teacheMail;
            teache.teachePassword = createTeacheDto.teachePassword;
            await _teacheRepo.Add(teache);
            return Ok();
        }        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeache(int id)
        {

            return NoContent();
        }
      
    }
}
