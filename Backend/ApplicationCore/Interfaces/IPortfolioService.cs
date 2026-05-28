using ApplicationCore.DTO;
using ApplicationCore.Entities;

namespace ApplicationCore.Interfaces
{
    public interface IPortfolioService : IServiceBase<Profile>
    {
        Task<PortfolioDTO?> GetPortfolioAsync(CancellationToken token = default);
    }
}
