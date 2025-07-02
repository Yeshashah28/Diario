using Journal_backend.Dto;
using Journal_backend.Models;

namespace Journal_backend.Interface
{
    public interface IJournalService
    {
        Task<object> GetAllJournals(UserDto user);

        Task<JournalDto> GetJournalById(int journal_id);

        Task<bool> AddJournal(JournalDto journal);

        Task<bool> UpdateJournal(JournalDto newjournal);

        Task<bool> DeleteJournal(int journal_id);
    }
}
