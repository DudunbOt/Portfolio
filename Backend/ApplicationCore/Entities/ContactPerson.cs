using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Entities
{
    public class ContactPerson : EntityBase
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Value { get; set; }
        public string? Icon { get; set; }
        public int? ProfileId { get; set; }
        public virtual Profile? Profile { get; set; }
    }
}
