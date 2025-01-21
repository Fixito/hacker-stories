import { useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import List from './components/List.jsx';
import Search from './components/Search.jsx';

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

function storiesReducer(state, action) {
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
      throw new Error(`Unsupported action type: ${action.type}`);
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
  const [stories, dispatchStories] = useReducer(storiesReducer, initialState);
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveStory = (id) => {
    dispatchStories({ type: REMOVE_STORY, payload: id });
  };

  useEffect(() => {
    if (!searchTerm) return;

    dispatchStories({ type: STORIES_FETCH_INIT });

    axios(`${API_ENDPOINT}${searchTerm}`)
      .then((result) => {
        dispatchStories({
          type: STORIES_FETCH_SUCCESS,
          payload: result.data.hits,
        });
      })
      .catch(() => {
        dispatchStories({ type: STORIES_FETCH_FAILURE });
      });
  }, [searchTerm]);

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      {stories.isError && <h2>Something went wrong. Try again later.</h2>}

      {stories.isLoading ? (
        <div>Loading...</div>
      ) : !stories.isError ? (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      ) : null}
    </div>
  );
}
