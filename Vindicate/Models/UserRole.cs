﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vindicate.Models
{
    public class UserRole
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public int RoleId { get; set; }
        public int ProjectId { get; set; }
        public int UserId { get; set; }
    }
}
