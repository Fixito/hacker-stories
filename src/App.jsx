import { useState } from 'react';

export default function App() {
  console.log('Rendu de <App />');

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

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search />

      <hr />

      {/* Une prop React est utilisée pour passer des données de parent à enfant. */}
      <List list={stories} />
    </div>
  );
}

export function Search1() {
  let searchTerm = '';

  const handleChange = (e) => {
    searchTerm = e.target.value;
  };

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input type='search' name='search' id='search' onChange={handleChange} />

      {/* Si l'on teste ceci dans le navigateur on ne verra pas la sortie apparaître */}
      {/* Il faut dire à React que searchTerm est un état (state) */}
      <p>Searching for {searchTerm}</p>
    </div>
  );
}

function Search() {
  console.log('Rendu de <Search />');

  // Un état React est une structure de données mutable qui est utilisée pour stocker des données qui vont changer au cours du temps.
  // Lorsqu'un state change, cela déclenche un nouveau rendu (re-render) du composant.

  // l'argument de useState est la valeur initiale de l'état
  // useState retourne un tableau avec deux éléments :
  // le premier élément est la valeur actuelle de l'état
  // le deuxième élément est une fonction qui permet de mettre à jour l'état
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    // console.log(e);
    // console.log(e.target.value);

    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input type='search' name='search' id='search' onChange={handleChange} />

      <p>Searching for {searchTerm}</p>
    </div>
  );
}

function List(props) {
  console.log('Rendu de <List />');

  return (
    <ul>
      {props.list.map((item) => {
        return <Item key={item.id} item={item} />;
      })}
    </ul>
  );
}

function Item(props) {
  console.log('Rendu de <Item />');

  const { id, title, author, num_comments, points, url } = props.item;

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
