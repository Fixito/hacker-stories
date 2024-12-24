import axios from 'axios';
import { useCallback, useEffect, useId, useReducer, useState } from 'react';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const STORIES_FETCH_INIT = 'STORIES_FETCH_INIT';
const STORIES_FETCH_SUCCESS = 'STORIES_FETCH_SUCCESS';
const STORIES_FETCH_FAILURE = 'STORIES_FETCH_FAILURE';
const REMOVE_STORY = 'REMOVE_STORY';

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
};

function reducer(state, action) {
  switch (action.type) {
    case STORIES_FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case STORIES_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case STORIES_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REMOVE_STORY:
      return {
        ...state,
        data: state.stories.filter((s) => s.id !== action.payload),
      };
    default:
      throw new Error();
  }
}

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default function App() {
  const [stories, dispatchStories] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: STORIES_FETCH_INIT });

    try {
      const { data } = await axios(url);
      dispatchStories({
        type: STORIES_FETCH_SUCCESS,
        payload: data.hits,
      });
    } catch {
      dispatchStories({ type: STORIES_FETCH_FAILURE });
    }
  }, [url]);

  const handleRemoveStory = (id) => {
    dispatchStories({ type: REMOVE_STORY, payload: id });
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        searchTerm={searchTerm}
      />

      {stories.isError && <p>Something went wrong ...</p>}

      <hr />

      {stories.isLoading ? (
        <div>Loading...</div>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
}

function SearchForm({ searchTerm, onSearchInput, onSearchSubmit }) {
  return (
    <form onSubmit={onSearchSubmit}>
      <InputWithLabel
        label='Search:'
        name='search'
        type='search'
        isFocused
        value={searchTerm}
        onInputChange={onSearchInput}
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <button type='submit' disabled={!searchTerm}>
        Search
      </button>
    </form>
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
