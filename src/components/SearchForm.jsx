import InputWithLabel from './InputWithLabel.jsx';

export default function Search({ searchTerm, onInputChange, onSearchSubmit }) {
  const handleChange = (e) => {
    onInputChange(e);
  };

  return (
    <form onSubmit={onSearchSubmit}>
      <InputWithLabel
        label='Search:'
        name='search'
        type='search'
        isFocused
        value={searchTerm}
        onInputChange={handleChange}
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <button type='submit' disabled={!searchTerm}>
        Search
      </button>
    </form>
  );
}
