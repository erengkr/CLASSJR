using BitirmeAPI.Data;
using BitirmeAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace BitirmeAPI.Repos
{
    public class CommentRepo : ICommentRepo
    {
        private readonly BitirmeAPIContext _context;
        public CommentRepo(BitirmeAPIContext context)
        {
            _context = context;
        }
        public async Task Add(Comment comment)
        {
            _context.Comment.Add(comment);
            await _context.SaveChangesAsync();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Comment> Get(int id)
        {
            return await _context.Comment.FindAsync(id);
        }

        public async Task<IEnumerable<Comment>> GetAll()
        {
            return await _context.Comment.ToListAsync();
        }

        public Task Update(Comment comment)
        {
            throw new NotImplementedException();
        }
    }
}
