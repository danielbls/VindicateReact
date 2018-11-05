using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public List<Deed> Deeds { get; set; }
        public Project Project { get; set; }

        public Milestone()
        {
            Guid = Guid.NewGuid();
        }
    }
}
