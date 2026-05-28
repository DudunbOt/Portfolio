using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.PortfolioController
{
    public class PortfolioController(IPortfolioService portfolioService, IMapper mapper)
        : ControllerBase<IPortfolioService>(portfolioService, mapper)
    {
        /// <summary>
        /// Gets the complete portfolio data including profile, contacts, projects,
        /// experience, education, and skills grouped by category.
        /// </summary>
        /// <returns>Complete portfolio data or 404 if no profile exists</returns>
        [HttpGet]
        [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any)]
        public async Task<IActionResult> GetPortfolio(CancellationToken token = default)
        {
            var portfolio = await _service.GetPortfolioAsync(token);

            if (portfolio == null)
                return NotFound(new { message = "Portfolio not found" });

            return Ok(portfolio);
        }
    }
}
