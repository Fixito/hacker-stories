import { useEffect, useState } from 'react';

// Ce serait bien que notre app se souvienne de notre dernière recherche (pour l'UX)

export function App1() {
  const stories = [
    {
      id: 1,
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
    },
    {
      id: 2,
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
    },
  ];

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') || 'React'
  );

  const searchedStories = stories.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //! La fonctionnalité fonctionne mais on a un souci. Il y a un side-effect dans notre handler. Si on utilise setSearchTerm ailleurs, on ne pourra pas garantir que le localStorage sera mis à jour.
  // On peut utiliser un useEffect pour ça.

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    localStorage.setItem('search', e.target.value);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      {searchedStories.length > 0 ? (
        <List list={searchedStories} />
      ) : (
        <h2>No story matched your search</h2>
      )}
    </div>
  );
}

export default function App() {
  const stories = [
    {
      id: 1,
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
    },
    {
      id: 2,
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
    },
  ];

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search') ?? 'React'
  );

  const searchedStories = stories.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      {searchedStories.length > 0 ? (
        <List list={searchedStories} />
      ) : (
        <h2>No story matched your search</h2>
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
      <label htmlFor='search'>Search: </label>
      <input
        type='search'
        name='search'
        id='search'
        value={search}
        onChange={handleChange}
      />

      <p>Searching for {search}</p>
    </div>
  );
}

function List({ list }) {
  return (
    <ul>
      {list.map((item) => {
        return <Item key={item.id} {...item} />;
      })}
    </ul>
  );
}

function Item({ id, title, author, num_comments, points, url }) {
  return (
    <li key={id}>
      <a href={url} target='_blank'>
        {title}
      </a>
      <p>{author}</p>
      <span>Comments: {num_comments}</span> <span>Points: {points}</span>
    </li>
  );
}
