import { useCallback, useEffect, useReducer, useState } from 'react';

import axios from 'axios';

import LastSearches from './components/LastSearches.jsx';
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

const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

function extractSearchTerm(url) {
  return url
    .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
    .replace(PARAM_SEARCH, '');
}

function getLastSearches(urls) {
  return [
    ...new Set(
      urls
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
    ),
  ];
}

function getUrl(searchTerm, page) {
  return `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
}

export default function App() {
  const [stories, dispatchStories] = useReducer(storiesReducer, initialState);
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [urls, setUrls] = useState([getUrl(searchTerm, 0)]);

  const lastSearches = getLastSearches(urls);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: STORIES_FETCH_INIT });

    try {
      const lastUrl = urls.at(-1);
      const { data } = await axios(lastUrl);
      dispatchStories({
        type: STORIES_FETCH_SUCCESS,
        payload: {
          list: data.hits,
          page: data.page,
        },
      });
    } catch {
      dispatchStories({ type: STORIES_FETCH_FAILURE });
    }
  }, [urls]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (searchTerm, page) => {
    const url = getUrl(searchTerm, page);
    setUrls([...urls, url]);
  };

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm, 0);
  };

  const handleMore = () => {
    const lastUrl = urls.at(-1);
    const searchTerm = extractSearchTerm(lastUrl);
    handleSearch(searchTerm, stories.page + 1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    handleSearch(searchTerm, 0);
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

      {stories.data.length > 0 && (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}

      {stories.isLoading ? (
        <div>Loading...</div>
      ) : stories.data.length > 0 ? (
        <button onClick={handleMore}>More</button>
      ) : !stories.isError ? (
        <h2>No story matched your search</h2>
      ) : null}
    </div>
  );
}
