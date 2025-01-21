import { useCallback, useEffect, useReducer } from 'react';

import axios from 'axios';

import Search from './components/Search.jsx';
import List from './components/List.jsx';

import { useStorageState } from './hooks/useStorageState.js';

import {
  REMOVE_STORY,
  STORIES_FETCH_FAILURE,
  STORIES_FETCH_INIT,
  STORIES_FETCH_SUCCESS,
  storiesReducer,
} from './storiesReducer.js';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
};

export default function App() {
  const [stories, dispatchStories] = useReducer(storiesReducer, initialState);
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: STORIES_FETCH_INIT });

    try {
      const { data } = await axios(`${API_ENDPOINT}${searchTerm}`);
      dispatchStories({
        type: STORIES_FETCH_SUCCESS,
        payload: data.hits,
      });
    } catch {
      dispatchStories({ type: STORIES_FETCH_FAILURE });
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveStory = (id) => {
    dispatchStories({ type: REMOVE_STORY, payload: id });
  };

  useEffect(() => {
    if (!searchTerm) return;
    handleFetchStories();
  }, [handleFetchStories, searchTerm]);

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
