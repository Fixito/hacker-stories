import { memo, useState } from 'react';

import { sortBy } from 'lodash';

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, 'title'),
  AUTHOR: (list) => sortBy(list, 'author'),
  COMMENT: (list) => sortBy(list, 'num_comments').reverse(),
  POINT: (list) => sortBy(list, 'points').reverse(),
};

function List({ list, onRemoveItem }) {
  const [sort, setSort] = useState('NONE');

  const handleSort = (sortKey) => {
    setSort(sortKey);
  };

  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(list);

  if (!list.length) {
    return <h2>No result founds</h2>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('TITLE')}>Title</th>
          <th onClick={() => handleSort('AUTHOR')}>Author</th>
          <th onClick={() => handleSort('COMMENT')}>Comments</th>
          <th onClick={() => handleSort('POINT')}>Points</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedList.map((item) => {
          return (
            <Item key={item.objectID} {...item} onRemoveItem={onRemoveItem} />
          );
        })}
      </tbody>
    </table>
  );
}

export default memo(List);

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
    <tr key={objectID}>
      <td>
        <a href={url} target='_blank'>
          {title}
        </a>
      </td>
      <td>{author}</td>
      <td>{num_comments}</td>
      <td>{points}</td>
      <td>
        <button onClick={() => onRemoveItem(objectID)}>Delete</button>
      </td>
    </tr>
  );
}
