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
import LastSearches from './components/LastSearches.jsx';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

function extractSearchTerm(url) {
  return url.replace(API_ENDPOINT, '');
}

function getLastSearches(urls) {
  return urls
    .reduce((result, url, index) => {
      const searchTerm = extractSearchTerm(url);

      if (index === 0) {
        return [...result, searchTerm];
      }

      const previousSearchTerm = result.at(-1);

      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return [...result, searchTerm];
      }
    }, [])

    .slice(-6)
    .slice(0, -1)
    .map((url) => extractSearchTerm(url));
}

function getUrl(searchTerm) {
  return `${API_ENDPOINT}${searchTerm}`;
}

export default function App() {
  const [stories, dispatchStories] = useReducer(storiesReducer, initialState);
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [urls, setUrls] = useState([getUrl(searchTerm)]);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: STORIES_FETCH_INIT });

    try {
      const lastUrl = urls.at(-1);
      const { data } = await axios(lastUrl);
      dispatchStories({
        type: STORIES_FETCH_SUCCESS,
        payload: data.hits,
      });
    } catch {
      dispatchStories({ type: STORIES_FETCH_FAILURE });
    }
  }, [urls]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (searchTerm) => {
    const url = getUrl(searchTerm);
    setUrls([...urls, url]);
  };

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
  };

  const lastSearches = getLastSearches(urls);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    handleSearch(searchTerm);
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

      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
      />

      {stories.isError && <p>Something went wrong ...</p>}

      <hr />

      {stories.isLoading ? (
        <div>Loading...</div>
      ) : stories.data.length > 0 ? (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      ) : (
        <h2>No story matched your search</h2>
      )}
    </div>
  );
}
