using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vindicate.Models;

namespace Vindicate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrioritiesController : ControllerBase
    {
        private readonly VindicateContext _context;

        public PrioritiesController(VindicateContext context)
        {
            _context = context;
        }

        // GET: api/Priorities
        [HttpGet]
        public IEnumerable<Priority> GetPriority()
        {
            return _context.Priority;
        }

        // GET: api/Priorities/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPriority([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var priority = await _context.Priority.FindAsync(id);

            if (priority == null)
            {
                return NotFound();
            }

            return Ok(priority);
        }

        // PUT: api/Priorities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPriority([FromRoute] int id, [FromBody] Priority priority)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != priority.Id)
            {
                return BadRequest();
            }

            _context.Entry(priority).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriorityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Priorities
        [HttpPost]
        public async Task<IActionResult> PostPriority([FromBody] Priority priority)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Priority.Add(priority);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPriority", new { id = priority.Id }, priority);
        }

        // DELETE: api/Priorities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePriority([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var priority = await _context.Priority.FindAsync(id);
            if (priority == null)
            {
                return NotFound();
            }

            _context.Priority.Remove(priority);
            await _context.SaveChangesAsync();

            return Ok(priority);
        }

        private bool PriorityExists(int id)
        {
            return _context.Priority.Any(e => e.Id == id);
        }
    }
}