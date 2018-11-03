using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vindicate.Models
{
    public class User
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public bool Active { get; set; }
    }
}
