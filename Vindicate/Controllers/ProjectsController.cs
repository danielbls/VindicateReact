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
    public class ProjectsController : ControllerBase
    {
        private readonly VindicateContext _context;

        public ProjectsController(VindicateContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public IEnumerable<Project> GetProject()
        {
            return _context.Project;
        }

        // GET: api/Projects/5
        [HttpGet("{guid}")]
        public async Task<IActionResult> GetProject([FromRoute] Guid guid)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var project = await _context.Project.FirstOrDefaultAsync(x => x.Guid == guid);

            if (project == null)
            {
                return NotFound();
            }

            project.Milestones = _context.Milestone.Where(x => x.Project.Guid == guid).ToList();

            return Ok(project);
        }

        // PUT: api/Projects/5
        [HttpPut("{guid}")]
        public async Task<IActionResult> PutProject([FromRoute] Guid guid, [FromBody] Project project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (guid != project.Guid)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(guid))
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

        // POST: api/Projects
        [HttpPost]
        public async Task<IActionResult> PostProject([FromBody] Project project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Project.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{guid}")]
        public async Task<IActionResult> DeleteProject([FromRoute] Guid guid)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var project = await _context.Project.FirstOrDefaultAsync(x => x.Guid == guid);
            if (project == null)
            {
                return NotFound();
            }

            _context.Project.Remove(project);
            await _context.SaveChangesAsync();

            return Ok(project);
        }

        private bool ProjectExists(Guid guid)
        {
            return _context.Project.Any(e => e.Guid == guid);
        }
    }
}