using ApplicationCore.DTO;
using ApplicationCore.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configurations
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            //Create Mapper for Object <-> DTO here
            CreateMap<UserInfo, UserInfoDTO>()
                .ForMember(dest => dest.Password, opt => opt.Ignore());
            CreateMap<UserInfoDTO, UserInfo>()
                .ForMember(dest => dest.Password, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Password)));

            // Portfolio mappings
            CreateMap<ApplicationCore.Entities.Profile, ProfileDTO>();
            CreateMap<ContactPerson, ContactPersonDTO>();
            CreateMap<Project, ProjectDTO>()
                .ForMember(dest => dest.TechStacks, opt => opt.MapFrom(src =>
                    string.IsNullOrEmpty(src.TechStacks)
                        ? new List<string>()
                        : src.TechStacks.Split(',', StringSplitOptions.RemoveEmptyEntries)
                            .Select(s => s.Trim())
                            .ToList()));
            CreateMap<Experience, ExperienceDTO>();
            CreateMap<Education, EducationDTO>();
            CreateMap<Skill, SkillDTO>();
        }
    }
}
