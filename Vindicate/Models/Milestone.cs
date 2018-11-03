using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vindicate.Models
{
    public class Milestone
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public int StatusId { get; set; }
        public int PriorityId { get; set; }
        public DateTime? DueDate { get; set; }
        public DbSet<Deed> Deeds { get; set; }
        public Project Project { get; set; }
    }
}
