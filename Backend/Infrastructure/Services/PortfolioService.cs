using ApplicationCore.DTO;
using ApplicationCore.Entities;
using ApplicationCore.Interfaces;
using AutoMapper;
using Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Infrastructure.Services
{
    public class PortfolioService : ServiceBase<ApplicationCore.Entities.Profile>, IPortfolioService
    {
        private readonly IMapper _mapper;
        private const string PORTFOLIO_CACHE_KEY = "Portfolio_Complete";
        private static readonly TimeSpan CacheExpiration = TimeSpan.FromHours(1);

        public PortfolioService(
            AppDbContext context,
            IDistributedCache cache,
            IOptions<AppConfig> config,
            IMapper mapper) : base(context, cache, config)
        {
            _mapper = mapper;
        }

        public async Task<PortfolioDTO?> GetPortfolioAsync(CancellationToken token = default)
        {
            // Try cache first
            if (_config.UseCache)
            {
                var cachedData = await _cache.GetStringAsync(PORTFOLIO_CACHE_KEY, token);
                if (!string.IsNullOrEmpty(cachedData))
                {
                    return JsonConvert.DeserializeObject<PortfolioDTO>(cachedData);
                }
            }

            // Fetch profile with contacts using eager loading
            var profile = await _context.Profiles
                .AsSplitQuery()
                .FirstOrDefaultAsync(p => p.DeletedDate == null, token);

            if (profile == null)
                return null;

            // Fetch related data separately for better control over ordering
            var projects = await _context.Projects
                .Where(p => p.ProfileId == profile.Id && p.DeletedDate == null)
                .OrderByDescending(p => p.StartDate)
                .ThenByDescending(p => p.EndDate)
                .ToListAsync(token);

            var contacts = await _context.ContactPersons
                .Where(e => e.ProfileId == profile.Id && e.DeletedDate == null)
                .ToListAsync(token);

            var experiences = await _context.Experiences
                .Where(e => e.ProfileId == profile.Id && e.DeletedDate == null)
                .OrderByDescending(e => e.EndDate == null) // Current positions first
                .ThenByDescending(e => e.EndDate)
                .ThenByDescending(e => e.StartDate)
                .ToListAsync(token);

            var educations = await _context.Educations
                .Where(e => e.ProfileId == profile.Id && e.DeletedDate == null)
                .OrderByDescending(e => e.EndDate)
                .ThenByDescending(e => e.StartDate)
                .ToListAsync(token);

            var skills = await _context.Skills
                .Include(s => s.Category)
                .Where(s => s.ProfileId == profile.Id && s.DeletedDate == null)
                .OrderBy(s => s.Category!.Name)
                .ThenByDescending(s => s.Proficiency)
                .ToListAsync(token);

            // Build the DTO
            var portfolioDto = new PortfolioDTO
            {
                Profile = _mapper.Map<ProfileDTO>(profile),
                Contacts = _mapper.Map<List<ContactPersonDTO>>(contacts),
                Projects = _mapper.Map<List<ProjectDTO>>(projects),
                Experience = _mapper.Map<List<ExperienceDTO>>(experiences),
                Education = _mapper.Map<List<EducationDTO>>(educations),
                Skills = GroupSkillsByCategory(skills)
            };

            // Cache the result
            if (_config.UseCache)
            {
                var cacheOptions = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = CacheExpiration
                };
                await _cache.SetStringAsync(
                    PORTFOLIO_CACHE_KEY,
                    JsonConvert.SerializeObject(portfolioDto),
                    cacheOptions,
                    token);
            }

            return portfolioDto;
        }

        private List<SkillCategoryGroupDTO> GroupSkillsByCategory(List<Skill> skills)
        {
            return skills
                .GroupBy(s => new { s.CategoryId, s.Category?.Name, s.Category?.Code })
                .Select(g => new SkillCategoryGroupDTO
                {
                    CategoryId = g.Key.CategoryId ?? 0,
                    CategoryName = g.Key.Name,
                    CategoryCode = g.Key.Code,
                    Skills = g.Select(s => new SkillDTO
                    {
                        Id = s.Id,
                        Name = s.Name,
                        Proficiency = s.Proficiency
                    }).ToList()
                })
                .OrderBy(g => g.CategoryName)
                .ToList();
        }
    }
}
