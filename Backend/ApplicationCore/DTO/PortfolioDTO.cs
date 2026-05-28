namespace ApplicationCore.DTO
{
    public class PortfolioDTO
    {
        public ProfileDTO Profile { get; set; } = null!;
        public List<ContactPersonDTO> Contacts { get; set; } = new();
        public List<ProjectDTO> Projects { get; set; } = new();
        public List<ExperienceDTO> Experience { get; set; } = new();
        public List<EducationDTO> Education { get; set; } = new();
        public List<SkillCategoryGroupDTO> Skills { get; set; } = new();
    }
}
