import InputWithLabel from './InputWithLabel.jsx';

export default function Search({ search, onSearch }) {
  const handleChange = (e) => {
    onSearch(e);
  };

  return (
    <div>
      <InputWithLabel
        label='Search:'
        name='search'
        type='search'
        isFocused
        value={search}
        onInputChange={handleChange}
      >
        <strong>Search: </strong>
      </InputWithLabel>

      <p>Searching for {search}</p>
    </div>
  );
}
