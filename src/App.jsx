import { useCallback, useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import List from './components/List.jsx';
import SearchForm from './components/SearchForm.jsx';

import { useStorageState } from './hooks/useStorageState.js';

import {
  initialState,
  REMOVE_STORY,
  STORIES_FETCH_FAILURE,
  STORIES_FETCH_INIT,
  STORIES_FETCH_SUCCESS,
  storiesReducer,
} from './storiesReducer.js';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

export default function App() {
  const [stories, dispatchStories] = useReducer(storiesReducer, initialState);
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

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleRemoveStory = useCallback((id) => {
    dispatchStories({ type: REMOVE_STORY, payload: id });
  }, []);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onInputChange={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

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
