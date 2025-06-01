using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace CoreAPI.Models
{
    

    public class Usermodel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [ValidateNever]
        public string EmailAddress { get; set; }
        [ValidateNever]
        public string Role { get; set; }
        [ValidateNever]
        public string UserId { get; set; }
        [ValidateNever]
        public DateTime DateofJoining { get; set; }
        [ValidateNever]
        public string Status { get; set; }
    }
    



}
