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
    public class CommentsController : ControllerBase
    {
        private readonly ICommentRepo _commentRepo;
        public CommentsController(ICommentRepo commentRepo)
        {
            this._commentRepo = commentRepo;
        }       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComment()
        {
            var comment = await _commentRepo.GetAll();
            return Ok(comment);

           
        }        
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>>GetComment(int id)
        {
            var comment = await _commentRepo.Get(id);
            if(comment==null)
            {
                return NotFound();
            }
            return Ok(comment);
        }       
        [HttpPost]
        public async Task<ActionResult> CreateComment(CreateCommentDto createCommentDto)
        {
            Comment comment = new Comment();
            comment.comment = createCommentDto.comment;
            comment.date = createCommentDto.date;
            await _commentRepo.Add(comment);
            return Ok();            
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {

            return NoContent();
        }
    }
}
