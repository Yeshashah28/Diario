using Journal_backend.Dto;
using Journal_backend.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Journal_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JournalController : ControllerBase
    {

        private readonly IJournalService _service;
        public JournalController(IJournalService service)
        {
            _service =service;
        }

        [Authorize]
        [HttpPost("getAllJournals")]
        public async Task<IActionResult> GetAllJournals(UserDto user)
        {
            var entryexists = await _service.GetAllJournals(user);
            if (entryexists == null)
            {
                return NotFound(new Response() { Result = 0, Data = null, Message = "No Entries Exist" });
            }
            return Ok(new Response() { Result = 1, Data = entryexists, Message = "Entries Exist" });
        }

        [HttpGet("getJournalById/{journal_id}")]
        public async Task<IActionResult> GetJournalById(int journal_id)
        {
            var entryexists = await _service.GetJournalById(journal_id);
            if (entryexists == null)
            {
                return NotFound(new Response() { Result = 0, Data = null, Message = "No Entries Exist" });
            }
            return Ok(new Response() { Result = 1, Data = entryexists, Message = "Entries Exist" });

        }

        [Authorize]
        [HttpPost("addJournal")]
        public async Task<IActionResult> AddJournal(JournalDto journal)
        {
            var entryexists= await _service.AddJournal(journal);
            if (entryexists == false)
            {
                return BadRequest(new Response() { Result = 0, Data = null, Message = "Entry Already Exists" });
            }
            return Ok(new Response() { Result = 1, Data = null, Message = "Entry Added" });
        }

        [Authorize]
        [HttpPut("updateJournal")]

        public async Task<IActionResult> UpdateJournal(JournalDto journal)
        {
            var result = await _service.UpdateJournal(journal);
            if (result == false)
            {
                return BadRequest(new Response() { Result = 0, Data = null, Message = "Entry doesn't exist" });
            }
            return Ok(new Response() { Result = 1, Data = null, Message = "Entry updated" });
        }

        [Authorize]
        [HttpDelete("deleteJournal/{journal_id}")]
        public async Task<IActionResult> DeleteJournal(int journal_id)
        {
            var result = await _service.DeleteJournal(journal_id);
            if (result == false)
            {
                return BadRequest(new Response() { Result = 0, Data = null, Message = "Entry doesn't exist" });
            }
            return Ok(new Response() { Result = 1, Data = null, Message = "Entry deleted" });
        }

        [HttpPost("uploadPhoto")]

        public async Task<IActionResult> UploadPhoto()
        {
            var file= Request.Form.Files.FirstOrDefault();
            try
            {
                if (file != null)
                {
                        string filerootpath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "UploadedImage", "Journal");
                        if (!Directory.Exists(filerootpath))
                        {
                            Directory.CreateDirectory(filerootpath);
                        }
                        string fname = file.FileName;
                        string filename = Path.GetFileNameWithoutExtension(fname);
                        string extension = Path.GetExtension(fname);
                        string fullfile = filename + "_" + DateTime.Now.ToString("yyyyMMddHHmmss") + extension;
                        string fullrootpath = Path.Combine(filerootpath, fullfile);

                        using (var stream = new FileStream(fullrootpath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                    string image = $"/UploadedImage/Journal/{fullfile}";
                    return Ok(new Response { Result = 1, Message = "success", Data = new List<string> { image } });
                }
                return BadRequest(new Response { Result = 0, Message = "No file received", Data = null });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Result = 0, Message = "failure", Data = null });
            }

        }


    }
}
