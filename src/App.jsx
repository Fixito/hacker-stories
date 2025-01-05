//* Composant React
// - PascalCase
// - Doit retourner un élément JSX

export function App1() {
  // On peut faire du JavaScript ici

  return (
    <div>
      <h1>Hello React!</h1>
    </div>
  );
}

// On définit la variable en dehors de la fonction pour éviter de la redéfinir à chaque rendu
const title = 'React';

export function App2() {
  return (
    <div>
      {/* Affiche une variable dans le JSX */}
      <h1>Hello {title}!</h1>

      {/* TODO: Faire un label et un input pour un champs de recherche */}
      {/* Certains attributs sont différents en JSX car les noms sont réservés au JS */}
      <label htmlFor='search'>Search: </label>
      <input type='search' name='search' id='search' />
    </div>
  );
}

const welcome = {
  gretting: 'Hey',
  title: 'React',
};

// TODO: Afficher le message de bienvenue dans le composant <App />

export function App3() {
  return (
    <div>
      {/* Tout ce qui se trouve entre les accolades est interpolé en JS */}
      <h1>
        {welcome.gretting} {welcome.title}!
      </h1>

      <label htmlFor='search'>Search: </label>
      <input type='search' name='search' id='search' />
    </div>
  );
}

// Lorsque l'on travaille avec des données en JavaScript, celles-ci se présentent le plus souvent sous la forme d'un tableau d'objets.

// En React, on utilise la méthode map() pour transformer les éléments d'un tableau en JSX en retournant du JSX pour chaque élément.

const list = [
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

// TODO: Afficher le titre des articles dans le composant <App />

export default function App() {
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor='search'>Search: </label>
      <input type='search' name='search' id='search' />

      <hr />

      <ul>
        {list.map((item) => {
          const { id, title, author, num_comments, points, url } = item;

          //! On a un warning dans la console du dev tools
          // Chaque élément doit avoir une prop `key` unique
          return (
            <li key={id}>
              <a href={url} target='_blank'>
                {title}
              </a>
              <p>{author}</p>
              <span>Comments: {num_comments}</span>{' '}
              <span>Points: {points}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
