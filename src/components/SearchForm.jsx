import InputWithLabel from './InputWithLabel.jsx';

import styles from '../App.module.css';

export default function Search({ searchTerm, onInputChange, onSearchSubmit }) {
  const handleChange = (e) => {
    onInputChange(e);
  };

  return (
    <form onSubmit={onSearchSubmit} className={styles.searchForm}>
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
      <button type='submit' className={styles.button} disabled={!searchTerm}>
        Search
      </button>
    </form>
  );
}
