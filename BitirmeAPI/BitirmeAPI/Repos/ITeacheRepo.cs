using BitirmeAPI.Model;

namespace BitirmeAPI.Repos
{
    public interface ITeacheRepo
    {
        Task<Teache> Get(int id);
        Task<IEnumerable<Teache>> GetAll();
        Task Delete(int id);
        Task Add(Teache teache);
        Task Update(Teache teache);
    }
}
