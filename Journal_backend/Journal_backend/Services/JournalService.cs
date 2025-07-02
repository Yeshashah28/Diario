using Journal_backend.Dto;
using Journal_backend.Interface;

namespace Journal_backend.Services
{
    public class JournalService:IJournalService
    {
        private readonly IJournalRepository _repo;
        public JournalService(IJournalRepository repo)
        {
            _repo =repo;
        }

        public async Task<object> GetAllJournals(UserDto user)
        {
            return await _repo.GetAllJournals(user);
        }

        public async Task<JournalDto> GetJournalById(int journal_id)
        {
            return await _repo.GetJournalById(journal_id);
        }

        public async Task<bool> AddJournal(JournalDto journal)
        {
            return await _repo.AddJournal(journal);
        }

        public async Task<bool> UpdateJournal(JournalDto journal)
        {
            return await _repo.UpdateJournal(journal);
        }

        public async Task<bool> DeleteJournal(int journal_id)
        {
            return await _repo.DeleteJournal(journal_id);
        }
    }
}
