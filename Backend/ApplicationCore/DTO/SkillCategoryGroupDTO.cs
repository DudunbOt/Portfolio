namespace ApplicationCore.DTO
{
    public class SkillCategoryGroupDTO
    {
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? CategoryCode { get; set; }
        public List<SkillDTO> Skills { get; set; } = new();
    }
}
