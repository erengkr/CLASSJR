using BitirmeAPI.Model;

namespace BitirmeAPI.Repos
{
    public interface IParentRepo
    {
        Task<Parent> Get(int id);
        Task<IEnumerable<Parent>> GetAll();
        Task Delete(int id);
        Task Add(Parent parent);
        Task Update(Parent parent);
    }
}
