using BitirmeAPI.Model;

namespace BitirmeAPI.Repos
{
    public interface ICommentRepo
    {
        Task<Comment> Get(int id);
        Task<IEnumerable<Comment>> GetAll();
        Task Add(Comment comment);
        Task Delete(int id);
        Task Update(Comment comment);
    }
}
