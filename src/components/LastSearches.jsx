export default function LastSearches({ lastSearches, onLastSearch }) {
  return (
    <div>
      {lastSearches.map((searchTerm, index) => (
        <button
          key={searchTerm + index}
          type='button'
          onClick={() => onLastSearch(searchTerm)}
        >
          {searchTerm}
        </button>
      ))}
    </div>
  );
}
