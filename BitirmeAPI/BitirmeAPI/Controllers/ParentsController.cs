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
    public class ParentsController : ControllerBase
    {
        private readonly IParentRepo _parentRepo;
        public ParentsController(IParentRepo parentRepo)
        {
            this._parentRepo = parentRepo;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Parent>>> GetParent()
        {
            var parent = await _parentRepo.GetAll();
            return Ok(parent);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Parent>> GetParent(int id)
        {
            var parent = await _parentRepo.Get(id);
            if (parent == null)
            {
                return NotFound();
            }
            return Ok(parent);
        }
        [HttpPost]
        public async Task<ActionResult> CreateParent(CreateParentDto createParentDto)
        {
            Parent parent = new Parent();
            parent.parentName = createParentDto.parentName;
            parent.parentSurname = createParentDto.parentSurname;
            parent.parentMail = createParentDto.parentMail;
            parent.parentPassword = createParentDto.parentPassword;
            await _parentRepo.Add(parent);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParent(int id)
        {

            return NoContent();
        }
    }
}
