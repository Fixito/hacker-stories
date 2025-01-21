export default function List({ list, onRemoveItem }) {
  if (list.length <= 0) {
    return <h2>No results found</h2>;
  }

  return (
    <ul>
      {list.map((item) => {
        return (
          <Item key={item.objectID} {...item} onRemoveItem={onRemoveItem} />
        );
      })}
    </ul>
  );
}

function Item({
  objectID,
  title,
  author,
  num_comments,
  points,
  url,
  onRemoveItem,
}) {
  return (
    <li key={objectID}>
      <a href={url} target='_blank'>
        {title}
      </a>
      <p>{author}</p>
      <span>Comments: {num_comments}</span> <span>Points: {points}</span>
      <div>
        <button onClick={() => onRemoveItem(objectID)}>Delete</button>
      </div>
    </li>
  );
}
