using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Taskflow.api.Data;
using Taskflow.api.Models;

namespace Taskflow.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivityController : ControllerBase
{
    private readonly TaskDbContext _context;

    public ActivityController(TaskDbContext context)
    {
        _context = context;
    }

    // GET: api/activity
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ActivityLog>>> GetActivities()
    {
        return await _context.Activities
            .OrderByDescending(activity => activity.CreatedAt)
            .Take(30)
            .ToListAsync();
    }

    // POST: api/activity
    [HttpPost]
    public async Task<ActionResult<ActivityLog>> CreateActivity(
        ActivityLog activity
    )
    {
        activity.Id = 0;
        activity.CreatedAt = DateTime.UtcNow;

        _context.Activities.Add(activity);

        await _context.SaveChangesAsync();

        return Ok(activity);
    }
}