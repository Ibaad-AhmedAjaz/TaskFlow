using Microsoft.EntityFrameworkCore;
using Taskflow.api.Models;

namespace Taskflow.api.Data;

public class TaskDbContext : DbContext
{
    public TaskDbContext(DbContextOptions<TaskDbContext> options)
        : base(options)
    {
    }

    public DbSet<TaskItem> Tasks { get; set; }

    public DbSet<ActivityLog> Activities { get; set; }
}