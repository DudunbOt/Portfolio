using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Entities
{
    public class Profile : EntityBase
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Title { get; set; }
        public string? Summary { get; set; }
        public string? ImageUrl { get; set; }
        public string? ResumeUrl { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Location { get; set; }
        public virtual List<ContactPerson>? ContactPersons { get; set; }
        public virtual List<Project>? Projects { get; set; }
        public virtual List<Experience>? Experiences { get; set; }
        public virtual List<Education>? Educations { get; set; }
        public virtual List<Skill>? Skills { get; set; }
    }
}
