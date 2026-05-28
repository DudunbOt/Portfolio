using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Entities
{
    public class Skill : EntityBase
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal? Proficiency { get; set; }
        public int? CategoryId {  get; set; }
        public virtual SkillCategory? Category { get; set; }
        public int? ProfileId { get; set; }
        public virtual Profile? Profile { get; set; }
    }
}
