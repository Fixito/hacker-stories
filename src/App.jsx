import { useCallback, useEffect, useId, useState } from 'react';

import axios from 'axios';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default function App() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const searchedStories = stories.filter((s) =>
    s.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchStories = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await axios(API_ENDPOINT + searchTerm);
      setStories(data.hits);
      setIsError(false);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveStory = (id) => {
    setStories(stories.filter((s) => s.id !== id));
  };

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      {isError && <p>Something went wrong ...</p>}

      <hr />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
}

function Search({ search, onSearch }) {
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

function InputWithLabel({
  children,
  isFocused,
  name,
  onInputChange,
  type = 'text',
  value,
}) {
  const id = useId();

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onInputChange}
        autoFocus={isFocused}
      />
    </>
  );
}

function List({ list, onRemoveItem }) {
  return (
    <ul>
      {list.map((item) => {
        return (
          <Item key={item.objectID} {...item} onRemoveItem={onRemoveItem} />
        );
      })}
    </ul>
  );
}

function Item({
  objectID,
  title,
  author,
  num_comments,
  points,
  url,
  onRemoveItem,
}) {
  return (
    <li key={objectID}>
      <a href={url} target='_blank'>
        {title}
      </a>
      <p>{author}</p>
      <span>Comments: {num_comments}</span> <span>Points: {points}</span>
      <div>
        <button onClick={() => onRemoveItem(objectID)}>Delete</button>
      </div>
    </li>
  );
}
