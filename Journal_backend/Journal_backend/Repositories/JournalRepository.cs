using Journal_backend.Data;
using Journal_backend.Dto;
using Journal_backend.Interface;
using Journal_backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Journal_backend.Repositories
{
    public class JournalRepository: IJournalRepository
    {
        private readonly AppDbContext _context;
        public JournalRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<object> GetAllJournals(UserDto user)
        {
            var skip = (user.Page - 1) * user.Offset;
            var totalcount = await _context.JournalData.Where(x => x.Author == user.Name).CountAsync();
            var journal_entries= await _context.JournalData.Where(x=>x.Author==user.Name).OrderBy(y=>y.CreatedAt).Skip(skip).Take(user.Offset).Select(x=>new JournalDto
            {
                Id=x.Id,
                Title=x.Title,
                Author=x.Author,
                Description=x.Description,
                Image=x.Image,
                CreatedAt=x.CreatedAt,
            }).ToListAsync();

            return new { Data=journal_entries, CurrentPage=user.Page,TotalPages=(int)Math.Ceiling((double)totalcount/user.Offset) };
        }

        public async Task<JournalDto> GetJournalById(int journal_id)
        {
            var journal_entry = await _context.JournalData.FirstOrDefaultAsync(x=>x.Id==journal_id);
            if (journal_entry == null)
            {
                return null;
            }
            var entry = new JournalDto()
            {
                Id = journal_entry.Id,
                Title = journal_entry.Title,
                Author = journal_entry.Author,
                Description = journal_entry.Description,
            };
            return entry;
        }

        public async Task<bool> AddJournal(JournalDto journal)
        {
            var today = DateTime.UtcNow.Date;
            var journalexists =await _context.JournalData.FirstOrDefaultAsync(x =>x.Author==journal.Author && x.CreatedAt.Date == today);
            if (journalexists != null)
            {
                return false;
            }

            var newentry = new JournalEntries()
            {
                Id = journal.Id,
                Title = journal.Title,
                Author = journal.Author,
                Description = journal.Description,
                Image = journal.Image,
                CreatedAt = DateTime.UtcNow,
            };
            _context.JournalData.Add(newentry);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateJournal(JournalDto newjournal)
        {
            var journalexists=await _context.JournalData.FirstOrDefaultAsync(x=>x.Id==newjournal.Id);
            if(journalexists == null)
            {
                return false;
            }
            journalexists.Title = newjournal.Title;
            journalexists.Description = newjournal.Description;
            journalexists.Image = newjournal.Image;
            journalexists.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteJournal(int journal_id)
        {
            var journalexists = await _context.JournalData.FirstOrDefaultAsync(x => x.Id == journal_id);
            if (journalexists == null)
            {
                return false;
            }
            _context.JournalData.Remove(journalexists);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
