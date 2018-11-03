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
    public class DeedsController : ControllerBase
    {
        private readonly VindicateContext _context;

        public DeedsController(VindicateContext context)
        {
            _context = context;
        }

        // GET: api/Deeds
        [HttpGet]
        public IEnumerable<Deed> GetDeed()
        {
            return _context.Deed;
        }

        // GET: api/Deeds/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDeed([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var deed = await _context.Deed.FindAsync(id);

            if (deed == null)
            {
                return NotFound();
            }

            return Ok(deed);
        }

        // PUT: api/Deeds/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeed([FromRoute] int id, [FromBody] Deed deed)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != deed.Id)
            {
                return BadRequest();
            }

            _context.Entry(deed).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeedExists(id))
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

        // POST: api/Deeds
        [HttpPost]
        public async Task<IActionResult> PostDeed([FromBody] Deed deed)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Deed.Add(deed);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeed", new { id = deed.Id }, deed);
        }

        // DELETE: api/Deeds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeed([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var deed = await _context.Deed.FindAsync(id);
            if (deed == null)
            {
                return NotFound();
            }

            _context.Deed.Remove(deed);
            await _context.SaveChangesAsync();

            return Ok(deed);
        }

        private bool DeedExists(int id)
        {
            return _context.Deed.Any(e => e.Id == id);
        }
    }
}