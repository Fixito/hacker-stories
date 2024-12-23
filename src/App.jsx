import { useState } from 'react';

// On souhaite récupérer la valeur de l'input Search pour filtrer la liste des stories
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
  // On va remonter l'état de l'input Search dans le composant parent <App />
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search searchTerm={searchTerm} onSearch={handleSearch} />

      <hr />

      {/* TODO: Essayer de filtrer la liste avec le state `searchTerm` en utlisant la méthode filter() */}
      <List list={stories} />
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
  // Si on initialise la valeur, on constate que l'input de l'affiche pas
  // Il faut que la valeur de l'input soit contrôlée par le state `searchTerm`
  const [searchTerm, setSearchTerm] = useState('react');

  const searchedStories = stories.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />
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
        return <Item key={item.id} item={item} />;
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
