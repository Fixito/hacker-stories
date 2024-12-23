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

export function App1() {
  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* TODO: Extraire le label et l'input dans un composant <Search :> */}
      <label htmlFor='search'>Search: </label>
      <input type='search' name='search' id='search' />

      <hr />

      {/* On peut diviser une app React en plusieurs composants que l'on peut réutiliser */}
      <List1 />
    </div>
  );
}

function List1() {
  return (
    <ul>
      {list.map((item) => {
        const { id, title, author, num_comments, points, url } = item;

        return (
          <li key={id}>
            <a href={url} target='_blank'>
              {title}
            </a>
            <p>{author}</p>
            <span>Comments: {num_comments}</span> <span>Points: {points}</span>
          </li>
        );
      })}
    </ul>
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

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search />

      <hr />

      {/* Pour passe notre tableau dans le composant <List /> via une prop React */}
      <List list={stories} />
    </div>
  );
}

function Search() {
  //* Gérer les fonctions en JSX
  const handleChange = (e) => {
    // événement synthétique
    console.log(e);
    // valeur de la cible de l'événement (ici l'input HTML)
    console.log(e.target.value);
  };

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      {/*! Il faut passer la référence de la fonction et nom l'appeler */}
      <input type='search' name='search' id='search' onChange={handleChange} />
    </div>
  );
}

function List(props) {
  return (
    <ul>
      {props.list.map((item) => {
        // const { id, url, title, author, num_comments, points } = item;

        // TODO: Extraire les données dans un comoposant <Item />
        // return (
        //   <li key={id}>
        //     <a href={url} target='_blank'>
        //       {title}
        //     </a>
        //     <p>{author}</p>
        //     <span>Comments: {num_comments}</span> <span>Points: {points}</span>
        //   </li>
        // );
        return <Item key={item.id} item={item} />;
      })}
    </ul>
  );
}

function Item(props) {
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
