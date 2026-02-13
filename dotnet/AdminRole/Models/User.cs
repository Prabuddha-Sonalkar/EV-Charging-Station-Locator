using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminRole.Models
{
    [Table("user")]   // 👈 EXACT table name in MySQL
    public class User
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("password")]
        public string Password { get; set; }

        [Column("role_id")]
        public int RoleId { get; set; }

        [Column("status")]
        public string Status { get; set; }
    }
}
